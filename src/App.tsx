import React, { useState, useEffect } from 'react';
import { AppTab, Product, Article } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Products from './components/Products';
import NewsArticles from './components/NewsArticles';
import Cooperation from './components/Cooperation';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import { translations } from './translations';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ArrowLeft, ArrowRight, Star, Clock } from 'lucide-react';
import { getProducts, getArticles } from './utils/storage';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [products, setProducts] = useState<Product[]>(() => getProducts());
  const [articles, setArticles] = useState<Article[]>(() => getArticles());
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // By default, must be light mode (isDarkMode = false)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('imantak-theme');
    return savedTheme === 'dark';
  });

  const [lang, setLang] = useState<'fa' | 'en'>(() => {
    return (localStorage.getItem('imantak-lang') as 'fa' | 'en') || 'fa';
  });

  const [productCategoryFilter, setProductCategoryFilter] = useState<'all' | 'keys' | 'sensors' | 'switches'>('all');

  // Synchronize Dark Mode Class and Browser Theme Color on mount and change
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('imantak-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('imantak-theme', 'light');
    }

    // Dynamic browser address bar color update
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', isDarkMode ? '#09090b' : '#e53e3e');
  }, [isDarkMode]);

  // Synchronize Language Attributes on mount and change
  useEffect(() => {
    localStorage.setItem('imantak-lang', lang);
    if (lang === 'en') {
      document.documentElement.classList.add('en');
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    } else {
      document.documentElement.classList.remove('en');
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'fa';
    }
  }, [lang]);

  // Synchronize Tab and Selection to URL on initial mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get('product');
    const articleId = searchParams.get('article');
    const tabParam = searchParams.get('tab') as AppTab | null;

    if (productId) {
      setCurrentTab('products');
    } else if (articleId) {
      setCurrentTab('articles');
    } else if (tabParam) {
      setCurrentTab(tabParam);
    }
  }, []);

  // Sync current tab to URL query parameters
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', currentTab);
    
    // Clean up query parameters of other tabs to keep the URL elegant
    if (currentTab !== 'products') {
      url.searchParams.delete('product');
    }
    if (currentTab !== 'articles') {
      url.searchParams.delete('article');
    }
    window.history.replaceState(null, '', url.toString());
  }, [currentTab]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const t = translations[lang];

  // Filter newest products for Home "جدیدترین ها" showcase (showing 4 latest products)
  const homeNewestProducts = products.slice(0, 4);

  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <div className="space-y-1">
            
            {/* Hero Carousel + 3 Category Cards */}
            <Hero 
              setCurrentTab={setCurrentTab} 
              setProductCategoryFilter={setProductCategoryFilter} 
              lang={lang}
            />

            {/* Premium Newest Products Highlight (جدیدترین ها) */}
            <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                  <div className="space-y-1">
                    <span className="text-xs font-black tracking-widest text-brand-red uppercase block">
                      {t.homeBentoBadge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                      {t.homeBentoTitle}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setProductCategoryFilter('all');
                      setCurrentTab('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-red hover:text-brand-red-hover transition-colors cursor-pointer ${lang === 'fa' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <span>{t.homeBentoBtn}</span>
                    {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>

                {/* Grid layout for newest products (2-by-2 on mobile, 4 on desktop) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                  {homeNewestProducts.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-800/60 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Header metadata */}
                        <div className={`flex justify-between items-center mb-3 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                          <span className="text-[9px] sm:text-[10px] font-bold text-brand-red bg-brand-red/5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded">
                            {lang === 'fa' ? product.categoryFa : product.categoryEn}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 font-bold">
                            {product.model}
                          </span>
                        </div>

                        {/* Visual mockup slot */}
                        <div className="w-full h-28 sm:h-44 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900/50 flex items-center justify-center mb-4 relative overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={lang === 'fa' ? product.title : product.titleEn}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Info */}
                        <h3 className={`text-xs sm:text-base font-extrabold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-red transition-colors mb-2 line-clamp-1 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                          {lang === 'fa' ? product.title : product.titleEn}
                        </h3>
                        <p className={`text-zinc-500 dark:text-zinc-400 text-[10px] sm:text-xs line-clamp-2 leading-relaxed mb-4 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                          {lang === 'fa' ? product.description : product.descriptionEn}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setProductCategoryFilter('all');
                          setCurrentTab('products');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full py-2 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 group-hover:border-brand-red dark:group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}
                      >
                        <span>{t.homeCatalogRequest}</span>
                        {lang === 'fa' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Centered view other products button */}
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => {
                      setProductCategoryFilter('all');
                      setCurrentTab('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-8 py-3.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-brand-red/10 transition-all duration-300 flex items-center gap-2 cursor-pointer ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <span>{t.homeBentoBtn}</span>
                    {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </section>

            {/* Quick About Company Section */}
            <section className="py-20 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Text Column */}
                  <div className={`lg:col-span-7 space-y-6 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                    <span className="text-xs font-black tracking-widest text-brand-red uppercase block">{t.homeAboutBadge}</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                      {t.homeAboutTitle}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                      {t.homeAboutPara1}
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                      {t.homeAboutPara2}
                    </p>
                    
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setCurrentTab('about');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`px-6 py-3 bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-brand-red/10 transition-all flex items-center gap-2 cursor-pointer ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}
                      >
                        <span>{t.homeAboutBtn}</span>
                        {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Graphics Column */}
                  <div className="lg:col-span-5 relative">
                    <div className="absolute inset-0 bg-brand-red/10 rounded-3xl -rotate-2 blur-sm" />
                    <div className={`relative p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-sm font-black text-brand-red uppercase">{t.homeAboutQualityTitle}</h3>
                      
                      <div className="space-y-4">
                        <div className={`flex items-start gap-3 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                          <Star className="w-5 h-5 text-brand-red shrink-0" />
                          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
                            {t.homeAboutStar1}
                          </p>
                        </div>
                        <div className={`flex items-start gap-3 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                          <Star className="w-5 h-5 text-brand-red shrink-0" />
                          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
                            {t.homeAboutStar2}
                          </p>
                        </div>
                        <div className={`flex items-start gap-3 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                          <Star className="w-5 h-5 text-brand-red shrink-0" />
                          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
                            {t.homeAboutStar3}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Quick Articles Highlight */}
            <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                  <div className="space-y-1">
                    <span className="text-xs font-black tracking-widest text-brand-red uppercase block">{t.homeArtBadge}</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                      {t.homeArtTitle}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentTab('articles');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-red hover:text-brand-red-hover cursor-pointer ${lang === 'fa' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <span>{t.homeArtArchiveBtn}</span>
                    {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {articles.slice(0, 2).map((art) => (
                    <div
                      key={art.id}
                      className={`p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-850 hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${lang === 'fa' ? 'text-right' : 'text-left'}`}
                    >
                      <div className="space-y-3">
                        <div className={`flex items-center gap-3 text-[10px] sm:text-xs font-bold text-zinc-400 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-red" /> {lang === 'fa' ? art.date : art.dateEn}</span>
                          <span>•</span>
                          <span>{lang === 'fa' ? art.readTime : art.readTimeEn}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white">
                          {lang === 'fa' ? art.title : art.titleEn}
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                          {lang === 'fa' ? art.excerpt : art.excerptEn}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentTab('articles');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`inline-flex items-center gap-1 text-xs font-black text-brand-red hover:underline mt-4 cursor-pointer ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}
                      >
                        <span>{t.homeArtReadMore}</span>
                        {lang === 'fa' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            </section>

          </div>
        );
      case 'about':
        return <AboutUs lang={lang} />;
      case 'products':
        return (
          <Products 
            categoryFilter={productCategoryFilter} 
            setCategoryFilter={setProductCategoryFilter} 
            lang={lang}
            products={products}
          />
        );
      case 'articles':
        return <NewsArticles lang={lang} articles={articles} />;
      case 'cooperation':
        return <Cooperation lang={lang} />;
      case 'contact':
        return <ContactUs lang={lang} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-300 select-none">
      
      {/* Dynamic Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Routed Content Area */}
      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Corporate footer links */}
      <Footer setCurrentTab={setCurrentTab} lang={lang} onAdminClick={() => setIsAdminOpen(true)} />

      {/* Admin Panel Portal Modal Overlay */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
        products={products}
        setProducts={setProducts}
        articles={articles}
        setArticles={setArticles}
      />

    </div>
  );
}
