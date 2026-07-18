import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Cpu, Phone, Languages } from 'lucide-react';
import { AppTab } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '../translations';
import logo from '../logo.png';

interface HeaderProps {
  currentTab: AppTab;
  setCurrentTab: (tab: AppTab) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  lang: 'fa' | 'en';
  setLang: (lang: 'fa' | 'en') => void;
}

export default function Header({ currentTab, setCurrentTab, isDarkMode, toggleDarkMode, lang, setLang }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[lang];

  const navItems: { id: AppTab; label: string }[] = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'products', label: t.navProducts },
    { id: 'articles', label: t.navArticles },
    { id: 'cooperation', label: t.navCooperation },
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (tabId: AppTab) => {
    setCurrentTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLang(lang === 'fa' ? 'en' : 'fa');
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
          
          {/* Logo */}
          <div 
            id="brand-logo-container"
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img 
              src={logo} 
              alt="Iman Tak Pishro" 
              className="h-10 sm:h-12 w-auto object-contain dark:brightness-125 transition-all duration-300" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className={`hidden lg:flex items-center gap-1 ${lang === 'fa' ? 'flex-row-reverse' : 'flex-row'}`}>
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-brand-red font-bold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-brand-red dark:hover:text-brand-red'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-red rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Utility Buttons */}
          <div id="header-utilities" className={`flex items-center gap-2 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
            
            {/* Quick Contact Button */}
            <button
              id="btn-header-contact"
              onClick={() => handleNavClick('contact')}
              className={`hidden sm:flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-brand-red hover:text-white dark:hover:bg-brand-red text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border border-zinc-200 dark:border-zinc-800 hover:border-transparent dark:hover:border-transparent cursor-pointer ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.quickContact}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-brand-red dark:hover:text-brand-red transition-colors duration-300 text-xs font-extrabold cursor-pointer flex items-center gap-1"
              aria-label="Toggle Language"
            >
              <Languages className="w-4 h-4" />
              <span>{lang === 'fa' ? 'EN' : 'FA'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-brand-red dark:hover:text-brand-red transition-colors duration-300 cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-brand-red transition-colors duration-300 cursor-pointer"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between ${lang === 'fa' ? 'text-right flex-row' : 'text-left flex-row-reverse'} ${
                      isActive
                        ? 'bg-brand-red/10 text-brand-red font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex flex-col gap-2">
                <button
                  id="btn-mobile-drawer-contact"
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center gap-2 bg-brand-red text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-brand-red/15 hover:bg-brand-red-hover transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === 'fa' ? 'تماس با بخش فروش و پشتیبانی' : 'Contact Sales & Support'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
