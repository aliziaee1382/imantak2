import React from 'react';
import { AppTab } from '../types';
import { Cpu, Phone, Mail, MapPin, ShieldCheck, User } from 'lucide-react';
import { OFFICE_CONTACTS_FA, OFFICE_CONTACTS_EN } from '../data';
import { translations } from '../translations';
import logo from '../logo.png';

interface FooterProps {
  setCurrentTab: (tab: AppTab) => void;
  lang: 'fa' | 'en';
  onAdminClick?: () => void;
}

export default function Footer({ setCurrentTab, lang, onAdminClick }: FooterProps) {
  const t = translations[lang];
  const contacts = lang === 'fa' ? OFFICE_CONTACTS_FA : OFFICE_CONTACTS_EN;
  
  const handleLinkClick = (tab: AppTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className={`bg-zinc-950 text-zinc-400 border-t border-zinc-900 pt-16 pb-8 transition-colors duration-300 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
          
          {/* Logo & Slogan Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`flex items-center gap-3 cursor-pointer`} onClick={() => handleLinkClick('home')}>
              <img 
                src={logo} 
                alt="Iman Tak Pishro" 
                className="h-10 sm:h-12 w-auto object-contain dark:brightness-125 transition-all duration-300" 
              />
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 max-w-md">
              {t.footerSlogan}
            </p>
            <div className={`flex items-center gap-2 pt-2 text-xs text-zinc-500 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
              <ShieldCheck className="w-4 h-4 text-brand-red shrink-0" />
              <span>{t.footerGoldenChain}</span>
            </div>
          </div>

          {/* Useful Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className={`text-sm font-extrabold text-white tracking-wide ${lang === 'fa' ? 'border-r-2 border-brand-red pr-3' : 'border-l-2 border-brand-red pl-3'}`}>
              {t.footerLinksTitle}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('products')}
                  className="hover:text-brand-red transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{t.navProducts}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('cooperation')}
                  className="hover:text-brand-red transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{t.navCooperation}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-brand-red transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{t.navContact}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-brand-red transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{t.navAbout}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-brand-red transition-colors cursor-pointer text-right"
                >
                  {t.aboutTabFacilities}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-brand-red transition-colors cursor-pointer text-right"
                >
                  {t.aboutTabClients}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact details brief Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className={`text-sm font-extrabold text-white tracking-wide ${lang === 'fa' ? 'border-r-2 border-brand-red pr-3' : 'border-l-2 border-brand-red pl-3'}`}>
              {t.footerDirectContact}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className={`flex items-start gap-2.5 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                <div>
                  <span className="font-bold text-zinc-500 block">{lang === 'fa' ? 'دفتر مرکزی:' : 'Head Office:'}</span>
                  <span>{contacts.centralOffice.address}</span>
                </div>
              </li>
              <li className={`flex items-start gap-2.5 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <div>
                  <span className="font-bold text-zinc-500 block">{lang === 'fa' ? 'تلفن دفتر مرکزی:' : 'Office Phone:'}</span>
                  <a href={`tel:${contacts.centralOffice.phones[0]}`} className="font-mono hover:text-brand-red transition-colors">
                    {contacts.centralOffice.phones[0]}
                  </a>
                </div>
              </li>
              <li className={`flex items-start gap-2.5 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <div>
                  <span className="font-bold text-zinc-500 block">{lang === 'fa' ? 'پست الکترونیکی:' : 'Email Address:'}</span>
                  <a href={`mailto:${contacts.general.email}`} className="font-mono hover:text-brand-red transition-colors">
                    {contacts.general.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider line & Copyright */}
        <div className={`border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={`flex flex-wrap gap-4 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
            <span>{t.footerCompanyType}</span>
            <span>•</span>
            <span>{t.footerEst}</span>
          </div>
          <div className={`flex items-center gap-2 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
            <span>{t.footerCopyright}</span>
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                className="p-1 rounded text-zinc-500 hover:text-brand-red hover:bg-zinc-900/50 transition-all cursor-pointer opacity-50 hover:opacity-100"
                title={lang === 'fa' ? 'ورود به پنل مدیریت ادمین' : 'Admin Login'}
              >
                <User className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
