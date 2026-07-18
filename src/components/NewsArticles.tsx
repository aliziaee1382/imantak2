import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ARTICLES_DATA } from '../data';
import { Article } from '../types';
import { Calendar, Clock, ArrowRight, BookOpen, X, Share2, Search, Check, Linkedin } from 'lucide-react';
import { translations } from '../translations';

interface NewsArticlesProps {
  lang: 'fa' | 'en';
  articles?: Article[];
}

export default function NewsArticles({ lang, articles = ARTICLES_DATA }: NewsArticlesProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const t = translations[lang];

  const categories = useMemo(() => {
    const cats = new Set(articles.map(a => lang === 'fa' ? a.category : a.categoryEn));
    return ['all', ...Array.from(cats)];
  }, [lang, articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const activeCat = lang === 'fa' ? a.category : a.categoryEn;
      const matchesCat = selectedCat === 'all' || activeCat === selectedCat;

      const titleText = lang === 'fa' ? a.title : a.titleEn;
      const excerptText = lang === 'fa' ? a.excerpt : a.excerptEn;
      const contentText = lang === 'fa' ? a.content : a.contentEn;

      const matchesSearch =
        titleText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        excerptText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contentText.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCat, searchTerm, lang, articles]);

  const handleShareClick = () => {
    setCopiedSuccess(true);
    navigator.clipboard?.writeText?.(window.location.href);
    setTimeout(() => setCopiedSuccess(false), 3000);
  };

  return (
    <section id="news-articles-section" className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-red text-xs font-black tracking-widest uppercase block mb-2">{t.newsBadge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
            {t.newsTitle}
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto rounded-full mt-4 mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            {t.newsIntro}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className={`bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-850 p-6 rounded-2xl mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-brand-red text-white'
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100'
                }`}
              >
                {cat === 'all' ? (lang === 'fa' ? 'همه موضوعات' : 'All Topics') : cat}
              </button>
            ))}
          </div>

          {/* Article Search */}
          <div className="relative max-w-xs w-full">
            <span className={`absolute inset-y-0 flex items-center text-zinc-400 ${lang === 'fa' ? 'right-3 pr-2' : 'left-3 pl-2'}`}>
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder={t.newsSearchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full py-2 rounded-xl text-xs bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-transparent transition-all ${lang === 'fa' ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'}`}
            />
          </div>

        </div>

        {/* Articles List */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                id={`article-${article.id}`}
                className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div className="p-6 space-y-4">
                  {/* Date & Meta */}
                  <div className={`flex items-center gap-4 text-[10px] sm:text-xs font-bold text-zinc-400 dark:text-zinc-500 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-red" />
                      {lang === 'fa' ? article.date : article.dateEn}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-red" />
                      {lang === 'fa' ? article.readTime : article.readTimeEn}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base sm:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-brand-red transition-colors line-clamp-2 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                    {lang === 'fa' ? article.title : article.titleEn}
                  </h3>

                  {/* Excerpt */}
                  <p className={`text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                    {lang === 'fa' ? article.excerpt : article.excerptEn}
                  </p>
                </div>

                {/* Card Footer Action */}
                <div className={`p-6 pt-0 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <span className="text-[10px] font-bold text-brand-red bg-brand-red/5 dark:bg-brand-red/10 px-2 py-1 rounded">
                    {lang === 'fa' ? article.category : article.categoryEn}
                  </span>
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className={`flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:text-brand-red dark:hover:text-brand-red text-xs font-bold transition-all cursor-pointer ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <span>{t.newsBtnRead}</span>
                    {lang === 'fa' ? <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-[-4px] transition-transform" /> : <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-[4px] transition-transform" />}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <BookOpen className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-zinc-800 dark:text-200">
              {lang === 'fa' ? 'مقاله یا خبری یافت نشد' : 'No articles or news found'}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
              {lang === 'fa' ? 'لطفاً عبارت دیگری را جستجو فرمایید.' : 'Please enter a different search keyword.'}
            </p>
          </div>
        )}

      </div>

      {/* Reader Dialog / Modal Overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="reader-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArticle(null)}
                className="fixed inset-0 bg-black/70 dark:bg-black/85 transition-opacity"
              />

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              {/* Reader panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={`relative z-10 inline-block align-bottom bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full border border-zinc-200 dark:border-zinc-800 ${lang === 'fa' ? 'text-right' : 'text-left'}`}
              >
                {/* Meta Header */}
                <div className={`px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex items-center gap-3 text-xs text-zinc-500 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span className="px-2.5 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">
                      {lang === 'fa' ? selectedArticle.category : selectedArticle.categoryEn}
                    </span>
                    <span>•</span>
                    <span>{lang === 'fa' ? selectedArticle.date : selectedArticle.dateEn}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <button
                      onClick={handleShareClick}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-brand-red dark:hover:text-brand-red transition-colors cursor-pointer relative"
                      title={lang === 'fa' ? 'کپی لینک صفحه' : 'Copy Page Link'}
                    >
                      {copiedSuccess ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                      {copiedSuccess && (
                        <span className={`absolute bottom-full mb-1 text-[9px] bg-green-500 text-white px-2 py-0.5 rounded shadow ${lang === 'fa' ? 'right-0' : 'left-0'} whitespace-nowrap`}>
                          {lang === 'fa' ? 'کپی شد' : 'Copied'}
                        </span>
                      )}
                    </button>

                    {/* Telegram Share Button */}
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(lang === 'fa' ? selectedArticle.title : selectedArticle.titleEn)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-[#0088cc] dark:hover:text-[#0088cc] transition-colors cursor-pointer"
                      title={lang === 'fa' ? 'اشتراک در تلگرام' : 'Share on Telegram'}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.88 7.99-3.44 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.16-.03.22z"/>
                      </svg>
                    </a>

                    {/* WhatsApp Share Button */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent((lang === 'fa' ? selectedArticle.title : selectedArticle.titleEn) + ' ' + window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-[#25D366] dark:hover:text-[#25D366] transition-colors cursor-pointer"
                      title={lang === 'fa' ? 'اشتراک در واتساپ' : 'Share on WhatsApp'}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.05 4.91A11.86 11.86 0 0 0 12 2c-6.6 0-12 5.4-12 12 0 2.1.54 4.14 1.59 5.94L0 24l4.16-1.09c1.74.95 3.7 1.45 5.7 1.45h.01c6.6 0 12-5.4 12-12 0-3.2-1.24-6.21-3.52-8.5C18.35 4.9 18.35 4.9 19.05 4.91zm-7.05 17.02c-1.78 0-3.53-.48-5.05-1.38l-.36-.21-2.49.65.66-2.43-.23-.37a9.92 9.92 0 0 1-1.52-5.26c0-5.48 4.47-9.95 9.96-9.95 2.66 0 5.16 1.04 7.03 2.92a9.85 9.85 0 0 1 2.92 7.03c0 5.48-4.47 9.95-9.96 9.95zm5.46-7.46c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.21 8.21 0 0 1-2.43-1.5 9.1 9.1 0 0 1-1.68-2.09c-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.57-.49-.49-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.5.7.3 1.26.48 1.69.62.72.23 1.37.2 1.89.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/>
                      </svg>
                    </a>

                    {/* LinkedIn Share Button */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-[#0a66c2] dark:hover:text-[#0a66c2] transition-colors cursor-pointer"
                      title={lang === 'fa' ? 'اشتراک در لینکدین' : 'Share on LinkedIn'}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="p-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-brand-red hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 sm:p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                  <h3 id="reader-title" className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white leading-snug">
                    {lang === 'fa' ? selectedArticle.title : selectedArticle.titleEn}
                  </h3>

                  <div className={`flex items-center gap-2 text-xs font-bold text-zinc-400 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <Clock className="w-4 h-4 text-brand-red" />
                    <span>{lang === 'fa' ? `زمان تخمینی مطالعه: ${selectedArticle.readTime}` : `Estimated Read: ${selectedArticle.readTimeEn}`}</span>
                  </div>

                  {/* Video Player if available */}
                  {selectedArticle.videoUrl && (
                    <div className="my-6 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black aspect-video relative shadow-lg">
                      {selectedArticle.videoUrl.includes('.mp4') || selectedArticle.videoUrl.includes('.webm') || selectedArticle.videoUrl.includes('.ogg') ? (
                        <video
                          src={selectedArticle.videoUrl}
                          controls
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <iframe
                          src={(function(url: string) {
                            if (!url) return '';
                            if (url.includes('<iframe')) {
                              const srcMatch = url.match(/src="([^"]+)"/);
                              if (srcMatch && srcMatch[1]) return srcMatch[1];
                            }
                            const aparatMatch = url.match(/aparat\.com\/v\/([a-zA-Z0-9]+)/);
                            if (aparatMatch) {
                              return `https://www.aparat.com/video/video/embed/videohash/${aparatMatch[1]}/vt/frame`;
                            }
                            const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
                            if (ytMatch) {
                              return `https://www.youtube.com/embed/${ytMatch[1]}`;
                            }
                            return url;
                          })(selectedArticle.videoUrl)}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="Article Video"
                        />
                      )}
                    </div>
                  )}

                  {/* Body Text */}
                  <div className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4 font-medium">
                    {(function() {
                      const contentText = lang === 'fa' ? selectedArticle.content : selectedArticle.contentEn;
                      if (!contentText) return null;
                      const parts = contentText.split(/(\[image:\s*[^\]]+\])/g);
                      return parts.map((part, index) => {
                        const match = part.match(/\[image:\s*([^\]]+)\]/);
                        if (match) {
                          const imgSource = match[1].trim();
                          return (
                            <div key={index} className="my-6 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-lg">
                              <img 
                                src={imgSource} 
                                alt="Article visual" 
                                className="w-full h-auto max-h-[500px] object-cover mx-auto"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          );
                        } else {
                          if (!part.trim()) return null;
                          return (
                            <p key={index} className="whitespace-pre-wrap">
                              {part}
                            </p>
                          );
                        }
                      });
                    })()}
                  </div>
                </div>

                {/* Footer block */}
                <div className={`px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 flex ${lang === 'fa' ? 'justify-end' : 'justify-end'}`}>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    {lang === 'fa' ? 'بستن صفحه مقاله' : 'Close Reader'}
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
