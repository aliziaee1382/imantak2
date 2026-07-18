import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS_DATA } from '../data';
import { Product } from '../types';
import { IMAGE_CONFIG } from '../imageConfig';
import { Search, Filter, Info, ShoppingBag, X, CheckCircle, HelpCircle, FileText, ChevronLeft, ArrowRight } from 'lucide-react';
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
                <div className={`bg-brand-red p-6 text-white flex justify-between items-center ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded">
                      {lang === 'fa' ? 'بخش فنی مهندسی' : 'Engineering Department'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold">
                      {lang === 'fa' ? selectedProduct.title : selectedProduct.titleEn}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
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

                  {/* Right Column: Dynamic Price/Quotation Form */}
                  <div className={`lg:col-span-5 border-t lg:border-t-0 border-zinc-150 dark:border-zinc-800 pt-6 lg:pt-0 ${lang === 'fa' ? 'lg:border-r lg:pr-8' : 'lg:border-l lg:pl-8'}`}>
                    <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-150 dark:border-zinc-800/50">
                      
                      {!isQuotationSent ? (
                        <form onSubmit={handleQuotationSubmit} className="space-y-4">
                          <h4 className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-2 mb-2 justify-start">
                            <ShoppingBag className="w-4 h-4 text-brand-red" />
                            <span>{t.productsModalFormTitle}</span>
                          </h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                            {lang === 'fa' ? 'جهت دریافت آخرین کاتالوگ فنی، قیمت و شرایط همکاری سازندگان، مشخصات خود را وارد فرمایید تا کارشناسان فروش با شما تماس بگیرند.' : 'Please enter your business contact information below to receive official quotes, drawings, and corporate OEM prices.'}
                          </p>

                          <div>
                            <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">{t.productsModalFormQty}</label>
                            <select
                              value={quotationQty}
                              onChange={(e) => setQuotationQty(e.target.value)}
                              className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand-red"
                            >
                              <option value="1000">{lang === 'fa' ? '۱,۰۰۰ الی ۵,۰۰۰ عدد' : '1,000 to 5,000 Units'}</option>
                              <option value="5000">{lang === 'fa' ? '۵,۰۰۰ الی ۲۰,۰۰۰ عدد' : '5,000 to 20,000 Units'}</option>
                              <option value="20000">{lang === 'fa' ? 'بیش از ۲۰,۰۰۰ عدد (تولید انبوه)' : 'Over 20,000 Units (Mass Production)'}</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">{t.productsModalFormName} *</label>
                            <input
                              type="text"
                              required
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              placeholder={lang === 'fa' ? 'مثال: علی احمدی' : 'e.g. John Doe'}
                              className={`w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand-red ${lang === 'fa' ? 'text-right' : 'text-left'}`}
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">{t.productsModalFormCompany}</label>
                            <input
                              type="text"
                              value={clientCompany}
                              onChange={(e) => setClientCompany(e.target.value)}
                              placeholder={lang === 'fa' ? 'مثال: قطعه سازان غرب' : 'e.g. West Auto Parts Co'}
                              className={`w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand-red ${lang === 'fa' ? 'text-right' : 'text-left'}`}
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">{t.productsModalFormPhone} *</label>
                            <input
                              type="tel"
                              required
                              value={clientPhone}
                              onChange={(e) => setClientPhone(e.target.value)}
                              placeholder={lang === 'fa' ? 'مثال: 09123456789' : 'e.g. +989123456789'}
                              className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand-red text-left"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-brand-red hover:bg-brand-red-hover text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-red/10 cursor-pointer text-center"
                          >
                            {t.productsModalFormSubmit}
                          </button>
                        </form>
                      ) : (
                        <div className="text-center py-10 space-y-4">
                          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                          <h5 className="text-sm font-bold text-zinc-900 dark:text-white">{lang === 'fa' ? 'درخواست شما با موفقیت ثبت شد' : 'Inquiry Submitted Successfully'}</h5>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            {lang === 'fa' ? 'شماره پیگیری:' : 'Tracking Number:'} <span className="font-mono text-xs font-bold text-brand-red">IM-{Math.floor(Math.random() * 90000) + 10000}</span>
                          </p>
                          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {lang === 'fa' ? (
                              <>کارشناسان واحد فروش شرکت ایمن تک پیشرو طی ۲۴ ساعت آینده جهت ارسال پیش‌فاکتور و کاتالوگ جامع قطعه <span className="font-bold">{selectedProduct.model}</span> با شما تماس خواهند گرفت.</>
                            ) : (
                              <>Our OEM sales coordinators will reach out to you within 24 hours with custom pricing and technical drawings for module <span className="font-bold">{selectedProduct.model}</span>.</>
                            )}
                          </p>
                        </div>
                      )}

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
