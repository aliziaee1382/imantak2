import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CLIENTS_LIST_FA, CLIENTS_LIST_EN, TIMELINE_DATA_FA, TIMELINE_DATA_EN } from '../data';
import { Shield, Award, Users, FileCheck, Factory, Lightbulb, Zap, TrendingUp, GraduationCap, CheckCircle2, Target, Briefcase, User } from 'lucide-react';
import { translations } from '../translations';
import { IMAGE_CONFIG } from '../imageConfig';

interface AboutUsProps {
  lang: 'fa' | 'en';
}

export default function AboutUs({ lang }: AboutUsProps) {
  const [activeSegment, setActiveSegment] = useState<'philosophy' | 'facilities' | 'clients' | 'history' | 'quality'>('philosophy');

  const clientsList = lang === 'fa' ? CLIENTS_LIST_FA : CLIENTS_LIST_EN;
  const t = translations[lang];

  return (
    <section id="about-us-section" className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-red text-xs font-black tracking-widest uppercase block mb-2">{t.aboutBadge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
            {t.aboutTitle}
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto rounded-full mt-4 mb-5" />
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            {t.aboutMainIntro}
          </p>
        </div>

        {/* Main Brief Info Block */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
              {t.aboutBriefTitle}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
              {t.aboutBriefPara1}
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
              {t.aboutBriefPara2}
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
              {t.aboutBriefPara3}
            </p>
            
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <Shield className="w-5 h-5 text-brand-red" />
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{t.aboutCardQuality}</span>
              </div>
              <div className={`flex items-center gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <Award className="w-5 h-5 text-brand-red" />
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{t.aboutCardStandard}</span>
              </div>
              <div className={`flex items-center gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <Zap className="w-5 h-5 text-brand-red" />
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{t.aboutCardPrice}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {IMAGE_CONFIG.companyBanner && (
              <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl aspect-[16/10] group">
                <img 
                  src={IMAGE_CONFIG.companyBanner} 
                  alt={lang === 'fa' ? 'شرکت ایمن تک پیشرو' : 'Iman Tak Pishro Co.'} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-red rounded-3xl rotate-3 opacity-10 dark:opacity-5 blur-sm" />
              <div className="relative p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/10 rounded-full blur-xl" />
                <div className={`space-y-6 relative z-10 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                  <span className="text-xs font-black tracking-widest text-brand-red uppercase">{t.aboutQuoteBadge}</span>
                  <blockquote className="text-base font-medium italic text-zinc-200 leading-relaxed">
                    {t.aboutQuoteText}
                  </blockquote>
                  <div className={`flex items-center gap-3 border-t border-zinc-800 pt-4 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white text-xs font-bold shrink-0">
                      40+
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-100">{t.aboutQuoteAuthor}</h4>
                      <p className="text-[10px] text-zinc-400">{t.aboutQuoteSub}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Segment Tabs */}
        <div className="mb-12 border-b border-zinc-200 dark:border-zinc-800">
          <div className={`flex justify-center sm:justify-start gap-4 overflow-x-auto pb-1.5 scrollbar-none ${lang === 'fa' ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
              onClick={() => setActiveSegment('philosophy')}
              className={`px-6 py-3 rounded-t-xl text-sm font-bold transition-all duration-300 relative cursor-pointer whitespace-nowrap ${
                activeSegment === 'philosophy'
                  ? 'text-brand-red bg-zinc-50 dark:bg-zinc-900/50'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              {t.aboutTabPhilosophy}
              {activeSegment === 'philosophy' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red" />
              )}
            </button>
            <button
              onClick={() => setActiveSegment('facilities')}
              className={`px-6 py-3 rounded-t-xl text-sm font-bold transition-all duration-300 relative cursor-pointer whitespace-nowrap ${
                activeSegment === 'facilities'
                  ? 'text-brand-red bg-zinc-50 dark:bg-zinc-900/50'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              {t.aboutTabFacilities}
              {activeSegment === 'facilities' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red" />
              )}
            </button>
            <button
              onClick={() => setActiveSegment('clients')}
              className={`px-6 py-3 rounded-t-xl text-sm font-bold transition-all duration-300 relative cursor-pointer whitespace-nowrap ${
                activeSegment === 'clients'
                  ? 'text-brand-red bg-zinc-50 dark:bg-zinc-900/50'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              {t.aboutTabClients}
              {activeSegment === 'clients' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red" />
              )}
            </button>
            <button
              onClick={() => setActiveSegment('history')}
              className={`px-6 py-3 rounded-t-xl text-sm font-bold transition-all duration-300 relative cursor-pointer whitespace-nowrap ${
                activeSegment === 'history'
                  ? 'text-brand-red bg-zinc-50 dark:bg-zinc-900/50'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              {t.aboutTabHistory}
              {activeSegment === 'history' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red" />
              )}
            </button>
            <button
              onClick={() => setActiveSegment('quality')}
              className={`px-6 py-3 rounded-t-xl text-sm font-bold transition-all duration-300 relative cursor-pointer whitespace-nowrap ${
                activeSegment === 'quality'
                  ? 'text-brand-red bg-zinc-50 dark:bg-zinc-900/50'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              {t.aboutTabQuality}
              {activeSegment === 'quality' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red" />
              )}
            </button>
          </div>
        </div>

        {/* Tab content with animations */}
        <div className="min-h-[300px]">
          {activeSegment === 'philosophy' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${lang === 'fa' ? 'text-right' : 'text-left'}`}
            >
              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-brand-red/10 dark:bg-brand-red/15 flex items-center justify-center text-brand-red ${lang === 'fa' ? 'mr-0 ml-auto' : 'mr-auto ml-0'}`}>
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-zinc-950 dark:text-white">{t.aboutPhilCustomers}</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {t.aboutPhilCustomersDesc}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-brand-red/10 dark:bg-brand-red/15 flex items-center justify-center text-brand-red ${lang === 'fa' ? 'mr-0 ml-auto' : 'mr-auto ml-0'}`}>
                  <FileCheck className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-zinc-950 dark:text-white">{t.aboutPhilProducts}</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {t.aboutPhilProductsDesc}
                </p>
              </div>
            </motion.div>
          )}

          {activeSegment === 'facilities' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${lang === 'fa' ? 'text-right' : 'text-left'}`}
            >
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-3">
                <div className={`w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red ${lang === 'fa' ? 'mr-0 ml-auto' : 'mr-auto ml-0'}`}>
                  <Factory className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-zinc-950 dark:text-white">{t.aboutFacJajarood}</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  {t.aboutFacJajaroodDesc}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-3">
                <div className={`w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red ${lang === 'fa' ? 'mr-0 ml-auto' : 'mr-auto ml-0'}`}>
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-zinc-950 dark:text-white">{t.aboutFacLab}</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  {t.aboutFacLabDesc}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-3">
                <div className={`w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red ${lang === 'fa' ? 'mr-0 ml-auto' : 'mr-auto ml-0'}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-zinc-950 dark:text-white">{t.aboutFacRd}</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  {t.aboutFacRdDesc}
                </p>
              </div>
            </motion.div>
          )}

          {activeSegment === 'clients' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <p className={`text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-4xl ${lang === 'fa' ? 'text-right ml-auto' : 'text-left mr-auto'}`}>
                {t.aboutClientsIntro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {clientsList.map((client, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center justify-between hover:border-brand-red/50 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red font-black text-sm mb-4">
                      {client.logo}
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-sm font-bold text-zinc-900 dark:text-white">{client.name}</h5>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{client.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSegment === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
                {t.aboutHistoryTitle}
              </h3>
              <div className={`relative border-zinc-200 dark:border-zinc-800 space-y-8 ${lang === 'fa' ? 'border-r-2 pr-6 mr-3 text-right' : 'border-l-2 pl-6 ml-3 text-left'}`}>
                {(lang === 'fa' ? TIMELINE_DATA_FA : TIMELINE_DATA_EN).map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* circle node */}
                    <div className={`absolute top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-brand-red group-hover:bg-brand-red transition-all duration-300 shadow-sm ${lang === 'fa' ? '-right-[33px]' : '-left-[33px]'}`} />
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black bg-brand-red/10 text-brand-red mb-2">
                        {item.year}
                      </span>
                      <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed max-w-4xl">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSegment === 'quality' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              {/* Introduction Card */}
              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red ${lang === 'fa' ? 'mr-0 ml-auto' : 'mr-auto ml-0'}`}>
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-zinc-950 dark:text-white">{t.aboutQualityTitle}</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {t.aboutQualityIntro}
                </p>
              </div>

              {/* Goals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 flex gap-4 items-start hover:border-brand-red/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-1">
                      {lang === 'fa' ? 'توسعه بازار و تنوع مشتریان' : 'Market & Portfolio Expansion'}
                    </h5>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{t.aboutQualityGoal1}</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 flex gap-4 items-start hover:border-brand-red/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-1">
                      {lang === 'fa' ? 'جلب رضایت حداکثری مشتریان' : 'Maximizing Client Satisfaction'}
                    </h5>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{t.aboutQualityGoal2}</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 flex gap-4 items-start hover:border-brand-red/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-1">
                      {lang === 'fa' ? 'حفظ و توانمندسازی سرمایه انسانی' : 'Human Capital Development'}
                    </h5>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{t.aboutQualityGoal3}</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 flex gap-4 items-start hover:border-brand-red/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-1">
                      {lang === 'fa' ? 'سودآوری و ضایعات صفر' : 'Profitability & Zero Defects'}
                    </h5>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{t.aboutQualityGoal4}</p>
                  </div>
                </div>
              </div>

              {/* Management Statement */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-100 dark:border-zinc-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-2xl" />
                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed relative z-10">
                  {t.aboutQualityFooter}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Leadership & CEO Section */}
        <div className="mt-24 pt-16 border-t border-zinc-100 dark:border-zinc-900">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-red text-xs font-black tracking-widest uppercase block mb-2">{t.aboutCEO}</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
              {lang === 'fa' ? 'مدیریت و رهبری شرکت' : 'Corporate Leadership'}
            </h3>
            <div className="w-12 h-0.5 bg-brand-red mx-auto rounded-full mt-3" />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 p-8 rounded-3xl ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
            <div className="md:col-span-4 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-red rounded-2xl rotate-3 opacity-15 blur-sm" />
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 overflow-hidden flex items-center justify-center">
                  {IMAGE_CONFIG.ceoPhoto ? (
                    <img 
                      src={IMAGE_CONFIG.ceoPhoto} 
                      alt={lang === 'fa' ? t.aboutCEOName : 'Mr. Mostafa Haffari'} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User className="w-24 h-24 text-zinc-400 dark:text-zinc-600" />
                  )}
                </div>
              </div>
            </div>
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-black tracking-wider text-brand-red uppercase">{t.aboutCEOTitle}</span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white">{t.aboutCEOName}</h4>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                {t.aboutCEODesc}
              </p>
              <div className={`border-t border-zinc-200 dark:border-zinc-800 pt-4 flex items-center gap-3 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-8 h-8 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center font-bold text-xs shrink-0">
                  ★
                </div>
                <p className="text-xs italic text-zinc-500 dark:text-zinc-400">
                  {lang === 'fa' ? 'تعهد به تعالی، بومی‌سازی و ارتقای توان ملی همگام با فناوری روز جهانی.' : 'Committed to excellence, localization, and national engineering capability aligned with global tech.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificates & Honors Section */}
        <div className="mt-20 pt-16 border-t border-zinc-100 dark:border-zinc-900">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-red text-xs font-black tracking-widest uppercase block mb-2">{t.aboutCertificatesTitle}</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
              {lang === 'fa' ? 'افتخارات، مجوزها و گواهینامه‌ها' : 'Corporate Honors & Certificates'}
            </h3>
            <div className="w-12 h-0.5 bg-brand-red mx-auto rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 space-y-4 hover:border-brand-red/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                {IMAGE_CONFIG.certificates.knowledgeBased ? (
                  <div className="w-full h-48 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 overflow-hidden mb-4 relative group/cert">
                    <img 
                      src={IMAGE_CONFIG.certificates.knowledgeBased} 
                      alt="Knowledge Based Certificate" 
                      className="w-full h-full object-contain group-hover/cert:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4">
                    <Award className="w-5 h-5" />
                  </div>
                )}
                <span className="text-[10px] font-black text-brand-red block mb-1">۱۴۰۲ | 2023</span>
                <h5 className="font-bold text-sm text-zinc-950 dark:text-white mb-2">
                  {lang === 'fa' ? 'گواهی‌نامه صلاحیت دانش‌بنیان' : 'Knowledge-Based Corporate Certification'}
                </h5>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {lang === 'fa' 
                    ? 'اخذ گواهینامه معتبر دانش‌بنیان در تولید محصولات الکترونیکی خودرو و ارائه خدمات برتر آزمایشگاهی.' 
                    : 'Obtained official knowledge-based accreditation for automotive switchgear electronics and testing labs.'}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 space-y-4 hover:border-brand-red/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                {IMAGE_CONFIG.certificates.iatf16949 ? (
                  <div className="w-full h-48 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 overflow-hidden mb-4 relative group/cert">
                    <img 
                      src={IMAGE_CONFIG.certificates.iatf16949} 
                      alt="IATF 16949 Certificate" 
                      className="w-full h-full object-contain group-hover/cert:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5" />
                  </div>
                )}
                <span className="text-[10px] font-black text-brand-red block mb-1">۱۳۹۸ | 2019</span>
                <h5 className="font-bold text-sm text-zinc-950 dark:text-white mb-2">
                  {lang === 'fa' ? 'گواهی‌نامه استاندارد بین‌المللی IATF 16949' : 'IATF 16949 International Certification'}
                </h5>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {lang === 'fa' 
                    ? 'اخذ استاندارد مدیریت کیفیت صنایع خودروسازی از شرکت معتبر TUV آلمان.' 
                    : 'Obtained Quality Management Standard in automotive industries certified by TUV Germany.'}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 space-y-4 hover:border-brand-red/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                {IMAGE_CONFIG.certificates.isoTS ? (
                  <div className="w-full h-48 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 overflow-hidden mb-4 relative group/cert">
                    <img 
                      src={IMAGE_CONFIG.certificates.isoTS} 
                      alt="ISO TS Certificate" 
                      className="w-full h-full object-contain group-hover/cert:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4">
                    <FileCheck className="w-5 h-5" />
                  </div>
                )}
                <span className="text-[10px] font-black text-brand-red block mb-1">۱۳۹۰ | 2011</span>
                <h5 className="font-bold text-sm text-zinc-950 dark:text-white mb-2">
                  {lang === 'fa' ? 'گواهی‌نامه طراحی و توسعه محصول ISO TS' : 'ISO TS 16949:2009 Design Standard'}
                </h5>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {lang === 'fa' 
                    ? 'اخذ گواهی استاندارد فنی مدیریت کیفیت با دامنه توسعه مهندسی و بومی‌سازی.' 
                    : 'Awarded design and development quality technical certification under ISO TS.'}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
