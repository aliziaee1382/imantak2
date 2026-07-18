import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_SLIDES_FA, HERO_SLIDES_EN, COMPANY_STATS_FA, COMPANY_STATS_EN, PRODUCT_CATEGORIES_FA, PRODUCT_CATEGORIES_EN } from '../data';
import { AppTab } from '../types';
import { ArrowLeft, ArrowRight, ToggleRight, Cpu, Power, Calendar, Shield, Award, ChevronRight, ChevronLeft } from 'lucide-react';
import { translations } from '../translations';

interface HeroProps {
  setCurrentTab: (tab: AppTab) => void;
  setProductCategoryFilter: (category: 'all' | 'keys' | 'sensors' | 'switches') => void;
  lang: 'fa' | 'en';
}

export default function Hero({ setCurrentTab, setProductCategoryFilter, lang }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = lang === 'fa' ? HERO_SLIDES_FA : HERO_SLIDES_EN;
  const stats = lang === 'fa' ? COMPANY_STATS_FA : COMPANY_STATS_EN;
  const categories = lang === 'fa' ? PRODUCT_CATEGORIES_FA : PRODUCT_CATEGORIES_EN;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleCategoryClick = (categoryId: 'keys' | 'sensors' | 'switches') => {
    setProductCategoryFilter(categoryId);
    setCurrentTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ToggleRight':
        return <ToggleRight className="w-8 h-8 text-brand-red" />;
      case 'Cpu':
        return <Cpu className="w-8 h-8 text-brand-red" />;
      case 'Power':
        return <Power className="w-8 h-8 text-brand-red" />;
      default:
        return <Cpu className="w-8 h-8 text-brand-red" />;
    }
  };

  const t = translations[lang];

  return (
    <section id="hero-section" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-red/10 dark:bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-zinc-200/50 dark:bg-zinc-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Carousel Slider */}
        <div className="min-h-[380px] lg:min-h-[440px] flex items-center mb-16">
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => {
              if (index !== currentSlide) return null;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${lang === 'fa' ? 'text-right' : 'text-left'}`}
                >
                  <div className="lg:col-span-7 space-y-5">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 text-brand-red dark:bg-brand-red/15 text-xs font-bold tracking-wide">
                      <Award className="w-3.5 h-3.5" />
                      <span>{slide.highlight}</span>
                    </div>

                    {/* Titles */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-brand-red">
                      {slide.subtitle}
                    </h2>

                    {/* Description */}
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                      {slide.description}
                    </p>

                    {/* Call to Actions */}
                    <div className={`pt-4 flex flex-wrap items-center gap-4 ${lang === 'fa' ? 'justify-start' : 'justify-start'}`}>
                      <button
                        onClick={() => {
                          setProductCategoryFilter('all');
                          setCurrentTab('products');
                        }}
                        className={`px-6 py-3.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-red/20 hover:shadow-brand-red/30 transition-all duration-300 flex items-center gap-2 cursor-pointer ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}
                      >
                        <span>{lang === 'fa' ? 'کاتالوگ محصولات' : 'Product Catalog'}</span>
                        {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setCurrentTab('about')}
                        className="px-6 py-3.5 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl text-sm font-bold transition-all duration-300 border border-zinc-200 dark:border-zinc-800 cursor-pointer"
                      >
                        {lang === 'fa' ? 'درباره ایمن تک' : 'About Iman Tak'}
                      </button>
                    </div>
                  </div>

                  {/* Graphics / Tech-Display Representation */}
                  <div className="lg:col-span-5 hidden lg:block">
                    <motion.div
                      initial={{ scale: 0.9, rotate: -2 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8 }}
                      className="relative p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 shadow-2xl overflow-hidden group"
                    >
                      <div className="absolute top-0 left-0 w-2 h-full bg-brand-red" />
                      
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                      <div className="relative space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">IMANTAK R&D // SYSTEM_ACTIVE</span>
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                        </div>

                        <div className={`border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 bg-zinc-50 dark:bg-zinc-950 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                          <span className="text-xs font-semibold text-brand-red block mb-1">{lang === 'fa' ? 'درحال تولید انبوه' : 'In Mass Production'}</span>
                          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-100">{lang === 'fa' ? 'کلید ترمز پارک برقی و اتوهلد ریرا AB327' : 'Reera EPB & Auto-Hold Console Switch AB327'}</h3>
                          <div className={`mt-4 flex gap-2 ${lang === 'fa' ? 'flex-row' : 'flex-row'}`}>
                            <span className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">{lang === 'fa' ? '۱۰۰٪ کالیبره' : '100% Calibrated'}</span>
                            <span className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">{lang === 'fa' ? 'اثر هال' : 'Hall Effect'}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className={`flex justify-between text-xs font-bold text-zinc-600 dark:text-zinc-400 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                            <span>{lang === 'fa' ? 'دقت بومی‌سازی قطعات های‌تک' : 'Localization Accuracy of High-Tech Parts'}</span>
                            <span className="text-brand-red">98.5%</span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div className="w-[98.5%] h-full bg-brand-red rounded-full" />
                          </div>
                        </div>

                        <div className={`flex items-center justify-between text-xs text-zinc-500 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                          <div className="flex items-center gap-1">
                            <Shield className="w-3.5 h-3.5 text-brand-red" />
                            <span>{lang === 'fa' ? '۴ دهه استاندارد کیفی' : '4 Decades of Quality Standard'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-brand-red" />
                            <span>{lang === 'fa' ? 'تولد: ۱۳۶۳' : 'Est: 1984'}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Manual carousel controls */}
        <div className="flex justify-center gap-2 mb-16">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-10 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-brand-red' : 'bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Corporate Stats Banner */}
        <div id="company-statistics-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 shadow-lg mb-20 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-brand-red block">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Three Core Categories Requested */}
        <div id="core-categories-cards">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">
              {t.homeAboutTitle}
            </h2>
            <div className="w-16 h-1 bg-brand-red mx-auto rounded-full mb-4" />
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              {lang === 'fa' ? 'محصولات شرکت ایمن تک پیشرو در سه دسته اصلی زیر با بهره‌گیری از آخرین استانداردهای فنی مهندسی جهان تولید می‌گردند.' : 'Iman Tak Pishro products are designed and manufactured in three distinct categories satisfying leading global standards.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                id={`cat-card-${cat.id}`}
                className={`p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 hover:border-brand-red dark:hover:border-brand-red transition-all duration-300 shadow-md hover:shadow-xl group flex flex-col justify-between ${lang === 'fa' ? 'text-right' : 'text-left'}`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-brand-red/10 dark:bg-brand-red/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${lang === 'fa' ? 'mr-0 ml-auto' : 'mr-auto ml-0'}`}>
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>
                <button
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`w-full py-3 bg-zinc-50 dark:bg-zinc-950 group-hover:bg-brand-red text-zinc-800 dark:text-zinc-200 group-hover:text-white rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1 border border-zinc-100 dark:border-zinc-900 group-hover:border-transparent cursor-pointer ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <span>{lang === 'fa' ? 'مشاهده محصولات' : 'View Products'}</span>
                  {lang === 'fa' ? <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" /> : <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
