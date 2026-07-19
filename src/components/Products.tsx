import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS_DATA } from '../data';
import { Product } from '../types';
import { IMAGE_CONFIG } from '../imageConfig';
import { Search, Filter, Info, ShoppingBag, X, CheckCircle, HelpCircle, FileText, ChevronLeft, ArrowRight, Share2, Check, Linkedin, Phone, MapPin, Building2 } from 'lucide-react';
import { translations } from '../translations';

interface ProductsProps {
  categoryFilter: 'all' | 'keys' | 'sensors' | 'switches';
  setCategoryFilter: (category: 'all' | 'keys' | 'sensors' | 'switches') => void;
  lang: 'fa' | 'en';
  products?: Product[];
}

export default function Products({ categoryFilter, setCategoryFilter, lang, products = PRODUCTS_DATA }: ProductsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Deep-linking: load product from URL query param on mount/products update
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get('product');
    if (productId) {
      const prod = products.find(p => p.id === productId);
      if (prod) {
        setSelectedProduct(prod);
        // Scroll slightly down to make sure modal is clearly in focus or viewport is updated
        setTimeout(() => {
          const section = document.getElementById('products-section');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [products]);

  // Deep-linking: sync selected product back to URL query parameters
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedProduct) {
      url.searchParams.set('product', selectedProduct.id);
      url.searchParams.set('tab', 'products');
    } else {
      url.searchParams.delete('product');
    }
    window.history.replaceState(null, '', url.toString());
  }, [selectedProduct]);
  
  const handleShareClick = () => {
    setCopiedSuccess(true);
    navigator.clipboard?.writeText?.(window.location.href);
    setTimeout(() => setCopiedSuccess(false), 3000);
  };

  // Quotation Form states
  const [isQuotationSent, setIsQuotationSent] = useState(false);
  const [quotationQty, setQuotationQty] = useState('1000');
  const [clientCompany, setClientCompany] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const t = translations[lang];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const titleText = lang === 'fa' ? product.title : product.titleEn;
      const descText = lang === 'fa' ? product.description : product.descriptionEn;
      const catText = lang === 'fa' ? product.categoryFa : product.categoryEn;

      const matchesSearch =
        titleText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        descText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        catText.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchTerm, lang]);

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsQuotationSent(false);
    setQuotationQty('1000');
    setClientCompany('');
    setClientName('');
    setClientPhone('');
  };

  const handleQuotationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setIsQuotationSent(true);
  };

  return (
    <section id="products-catalog-section" className="py-20 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-red text-xs font-black tracking-widest uppercase block mb-2">{t.productsBadge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
            {t.productsTitle}
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto rounded-full mt-4 mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            {t.productsIntro}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className={`bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 p-6 rounded-2xl shadow-sm mb-10 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-6 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
          
          {/* Category Filter Tabs */}
          <div className={`flex flex-wrap gap-2 ${lang === 'fa' ? 'justify-start' : 'justify-start'}`}>
            {[
              { id: 'all' as const, label: t.productsCatAll },
              { id: 'keys' as const, label: t.productsCatKeys },
              { id: 'sensors' as const, label: t.productsCatSensors },
              { id: 'switches' as const, label: t.productsCatSwitches },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  categoryFilter === tab.id
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/15'
                    : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className={`absolute inset-y-0 flex items-center text-zinc-400 ${lang === 'fa' ? 'right-3 pr-2' : 'left-3 pl-2'}`}>
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder={t.productsSearchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all ${lang === 'fa' ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'}`}
            />
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredProducts.map((product) => {
              const isHighlight = product.id.startsWith('AB32');
              const displayImage = IMAGE_CONFIG.products[product.id] || product.image;
              return (
                <div
                  key={product.id}
                  id={`product-${product.id}`}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-6">
                    {/* Badge & Model */}
                    <div className={`flex items-center justify-between mb-4 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[10px] sm:text-xs font-bold text-zinc-600 dark:text-zinc-300">
                        {lang === 'fa' ? product.categoryFa : product.categoryEn}
                      </span>
                      {isHighlight && (
                        <span className="px-2 py-0.5 rounded bg-brand-red/10 text-brand-red text-[10px] font-black">
                          {t.productsSpecialRera}
                        </span>
                      )}
                    </div>

                    {/* Mockup Image Slot */}
                    <div className="w-full h-44 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900/50 flex items-center justify-center mb-6 relative overflow-hidden group">
                      <img 
                        src={displayImage} 
                        alt={lang === 'fa' ? product.title : product.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Info */}
                    <h3 className={`text-base sm:text-lg font-bold text-zinc-950 dark:text-white line-clamp-2 mb-2 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                      {lang === 'fa' ? product.title : product.titleEn}
                    </h3>
                    <p className={`text-zinc-500 dark:text-zinc-400 text-xs line-clamp-3 leading-relaxed mb-4 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                      {lang === 'fa' ? product.description : product.descriptionEn}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className={`p-6 pt-0 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between gap-4 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500">
                      {t.productsCode} {product.model}
                    </span>
                    <button
                      onClick={() => handleOpenDetails(product)}
                      className={`px-4 py-2 rounded-xl bg-brand-red text-white hover:bg-brand-red-hover text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      <span>{t.productsBtnDetails}</span>
                      {lang === 'fa' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <HelpCircle className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
              {lang === 'fa' ? 'قطعه‌ای یافت نشد' : 'No components found'}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              {lang === 'fa' ? 'لطفاً عبارت دیگری را جستجو فرمایید یا دسته‌بندی را تغییر دهید.' : 'Please try another search or change the category filter.'}
            </p>
          </div>
        )}

      </div>

      {/* Product Specification & Quotation Drawer Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-black/70 dark:bg-black/85 transition-opacity"
              />

              {/* Center elements */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={`relative z-10 inline-block align-bottom bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-zinc-200 dark:border-zinc-800 ${lang === 'fa' ? 'text-right' : 'text-left'}`}
              >
                {/* Header block with visual identity */}
                <div className="bg-brand-red p-6 text-white relative">
                  {/* Top bar: Left side has the tag, Right side has the Close button */}
                  <div className="flex items-center justify-between mb-4 [direction:ltr]">
                    <div>
                      <span className="text-[11px] font-bold tracking-widest bg-white/10 px-2.5 py-1 rounded-lg">
                        {lang === 'fa' ? 'بخش فنی مهندسی' : 'Engineering Department'}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                      title={lang === 'fa' ? 'بستن' : 'Close'}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Title: full width */}
                  <div className="w-full mb-5">
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug w-full">
                      {lang === 'fa' ? selectedProduct.title : selectedProduct.titleEn}
                    </h3>
                  </div>

                  {/* Bottom bar: Social sharing group */}
                  <div className={`flex flex-wrap items-center gap-3 pt-4 border-t border-white/15 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span className="text-xs font-bold opacity-80">
                      {lang === 'fa' ? 'اشتراک‌گذاری این قطعه:' : 'Share this component:'}
                    </span>
                    
                    {/* Share Group */}
                    <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
                      {/* Copy Link Button */}
                      <button
                        onClick={handleShareClick}
                        className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer relative"
                        title={lang === 'fa' ? 'کپی لینک صفحه' : 'Copy Page Link'}
                      >
                        {copiedSuccess ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Share2 className="w-3.5 h-3.5" />}
                        {copiedSuccess && (
                          <span className={`absolute bottom-full mb-2 text-[9px] bg-green-600 text-white px-2 py-0.5 rounded shadow ${lang === 'fa' ? 'right-0' : 'left-0'} whitespace-nowrap z-50`}>
                            {lang === 'fa' ? 'کپی شد' : 'Copied'}
                          </span>
                        )}
                      </button>

                      {/* Telegram Button */}
                      <a
                        href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(lang === 'fa' ? selectedProduct.title : selectedProduct.titleEn)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
                        title={lang === 'fa' ? 'اشتراک در تلگرام' : 'Share on Telegram'}
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.88 7.99-3.44 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.16-.03.22z"/>
                        </svg>
                      </a>

                      {/* WhatsApp Button */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent((lang === 'fa' ? selectedProduct.title : selectedProduct.titleEn) + ' ' + window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
                        title={lang === 'fa' ? 'اشتراک در واتساپ' : 'Share on WhatsApp'}
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.05 4.91A11.86 11.86 0 0 0 12 2c-6.6 0-12 5.4-12 12 0 2.1.54 4.14 1.59 5.94L0 24l4.16-1.09c1.74.95 3.7 1.45 5.7 1.45h.01c6.6 0 12-5.4 12-12 0-3.2-1.24-6.21-3.52-8.5C18.35 4.9 18.35 4.9 19.05 4.91zm-7.05 17.02c-1.78 0-3.53-.48-5.05-1.38l-.36-.21-2.49.65.66-2.43-.23-.37a9.92 9.92 0 0 1-1.52-5.26c0-5.48 4.47-9.95 9.96-9.95 2.66 0 5.16 1.04 7.03 2.92a9.85 9.85 0 0 1 2.92 7.03c0 5.48-4.47 9.95-9.96 9.95zm5.46-7.46c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.21 8.21 0 0 1-2.43-1.5 9.1 9.1 0 0 1-1.68-2.09c-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.57-.49-.49-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.5.7.3 1.26.48 1.69.62.72.23 1.37.2 1.89.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/>
                        </svg>
                      </a>

                      {/* LinkedIn Button */}
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
                        title={lang === 'fa' ? 'اشتراک در لینکدین' : 'Share on LinkedIn'}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[70vh] overflow-y-auto">
                  
                  {/* Left Column: Specs & Features */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Description */}
                    <div>
                      <h4 className="text-sm font-black text-brand-red mb-2">
                        {lang === 'fa' ? 'توضیحات و کاربرد' : 'Description & Application'}
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                        {lang === 'fa' ? selectedProduct.description : selectedProduct.descriptionEn}
                      </p>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-black text-brand-red mb-2">
                        {t.productsModalFeatures}
                      </h4>
                      <ul className="space-y-2">
                        {(lang === 'fa' ? selectedProduct.features : selectedProduct.featuresEn).map((feature, idx) => (
                          <li key={idx} className={`flex items-start gap-2 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Specifications */}
                    <div>
                      <h4 className="text-sm font-black text-brand-red mb-2 flex items-center gap-1.5 justify-start">
                        <FileText className="w-4 h-4" />
                        <span>{t.productsModalSpecs}</span>
                      </h4>
                      <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden text-xs">
                        {Object.entries(lang === 'fa' ? selectedProduct.specs : selectedProduct.specsEn).map(([key, value], idx) => (
                          <div
                            key={idx}
                            className={`flex justify-between p-3 ${
                              idx % 2 === 0 ? 'bg-zinc-50 dark:bg-zinc-950' : 'bg-white dark:bg-zinc-900'
                            } border-b border-zinc-100 dark:border-zinc-800 last:border-none ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}
                          >
                            <span className="font-bold text-zinc-500 dark:text-zinc-400">{key}</span>
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Direct Price Inquiry & Contact Info */}
                  <div className={`lg:col-span-5 border-t lg:border-t-0 border-zinc-150 dark:border-zinc-800 pt-6 lg:pt-0 ${lang === 'fa' ? 'lg:border-r lg:pr-8' : 'lg:border-l lg:pl-8'}`}>
                    <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-150 dark:border-zinc-800/50 space-y-6">
                      
                      <div className="text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red mx-auto">
                          <Phone className="w-6 h-6 animate-pulse" />
                        </div>
                        
                        <h4 className="text-base font-black text-zinc-900 dark:text-white">
                          {lang === 'fa' ? 'استعلام قیمت و سفارش قطعه' : 'Price Inquiry & Ordering'}
                        </h4>
                        
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                          {lang === 'fa' 
                            ? 'جهت استعلام قیمت و سفارش با شماره تماس‌ زیر ارتباط برقرار کنید:' 
                            : 'To inquire about prices or place an order, please contact our wholesale outlet:'}
                        </p>
                      </div>

                      {/* Clickable Phone Number */}
                      <div className="space-y-3">
                        <a 
                          href="tel:02133118674"
                          className="flex flex-col items-center justify-center p-4 bg-brand-red hover:bg-brand-red-hover text-white rounded-2xl transition-all shadow-md shadow-brand-red/10 group cursor-pointer"
                        >
                          <span className="text-[10px] uppercase tracking-widest font-bold opacity-80 mb-1">
                            {lang === 'fa' ? 'تلفن مستقیم فروشگاه' : 'Direct Shop Line'}
                          </span>
                          <span className="text-xl font-extrabold font-mono tracking-wider group-hover:scale-105 transition-transform">
                            {lang === 'fa' ? '۰۲۱-۳۳۱۱۸۶۷۴' : '021-33118674'}
                          </span>
                        </a>

                        {/* Extra Call-to-action details */}
                        <div className="text-center text-[10px] text-zinc-400 dark:text-zinc-500 font-bold">
                          {lang === 'fa' ? 'ساعات پاسخگویی: ۹ صبح الی ۶ عصر' : 'Business Hours: 9:00 AM - 6:00 PM'}
                        </div>
                      </div>

                      {/* Small line divider */}
                      <div className="border-t border-zinc-200 dark:border-zinc-800 my-4" />

                      {/* Small Shop Address below it */}
                      <div className={`flex gap-2.5 items-start ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                        <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                            {lang === 'fa' ? 'آدرس فروشگاه قطعات یدکی' : 'Spare Parts Outlet'}
                          </span>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                            {lang === 'fa' 
                              ? 'تهران، خیابان امیرکبیر، مجتمع تجاری قطعات خودرو (بازار ملت)' 
                              : 'Mellat Auto Parts Market, Amir Kabir St, Tehran, Iran'}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
