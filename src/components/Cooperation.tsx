import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Upload, CheckCircle2, User, Mail, Phone, Clock, AlertCircle } from 'lucide-react';
import { CooperationForm } from '../types';
import { translations } from '../translations';

interface CooperationProps {
  lang: 'fa' | 'en';
}

export default function Cooperation({ lang }: CooperationProps) {
  const [formData, setFormData] = useState<CooperationForm>({
    fullName: '',
    email: '',
    phone: '',
    department: 'rd',
    experience: '1-3',
    resumeText: '',
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Drag and Drop File Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage(lang === 'fa' ? 'فرمت فایل نامعتبر است. لطفا فایل PDF یا Word بارگذاری کنید.' : 'Invalid file type. Please upload a PDF or Word document.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage(lang === 'fa' ? 'حجم فایل نباید بیشتر از ۵ مگابایت باشد.' : 'File size cannot exceed 5MB.');
      return;
    }
    setUploadedFile(file);
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      setErrorMessage(lang === 'fa' ? 'لطفاً فیلدهای الزامی را تکمیل کنید.' : 'Please fill in the required fields.');
      return;
    }
    setIsSubmitted(true);
  };

  const departments = [
    { id: 'rd', label: t.careersFormDeptRd },
    { id: 'qc', label: t.careersFormDeptQa },
    { id: 'prod', label: t.careersFormDeptProd },
    { id: 'admin', label: t.careersFormDeptAdmin },
  ];

  return (
    <section id="cooperation-page" className="py-20 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Titles */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-red text-xs font-black tracking-widest uppercase block mb-2">{t.careersBadge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
            {t.careersTitle}
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto rounded-full mt-4 mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            {t.careersIntro}
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
          
          {/* Right Column: Values / Instructions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 p-8 rounded-3xl shadow-sm space-y-6">
              <h3 className={`text-xl font-bold text-zinc-950 dark:text-white flex items-center gap-2 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <Briefcase className="w-5 h-5 text-brand-red" />
                <span>{t.careersWhyTitle}</span>
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {lang === 'fa' ? 'ما به دنبال جذب نخبگان، متخصصین متعهد و باانگیزه جهت رشد مداوم خانواده صنعتی ایمن تک پیشرو هستیم.' : 'We aim to hire passionate and dedicated talents to foster continuous growth at Iman Tak Pishro.'}
              </p>

              <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className={`flex items-start gap-3 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0 text-xs font-bold">1</div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-200">{t.careersWhy1Title}</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{t.careersWhy1Desc}</p>
                  </div>
                </div>
                <div className={`flex items-start gap-3 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0 text-xs font-bold">2</div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-200">{t.careersWhy2Title}</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{t.careersWhy2Desc}</p>
                  </div>
                </div>
                <div className={`flex items-start gap-3 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0 text-xs font-bold">3</div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-200">{t.careersWhy3Title}</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{t.careersWhy3Desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 p-8 rounded-3xl shadow-md">
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMessage && (
                  <div className={`p-3.5 bg-red-50 dark:bg-red-950/30 text-brand-red border border-red-200 dark:border-red-900/50 rounded-xl flex items-center gap-2 text-xs font-bold ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <User className="w-3.5 h-3.5 text-brand-red" />
                      <span>{t.careersFormName} *</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder={lang === 'fa' ? 'مثال: رضا محمدی' : 'e.g. John Doe'}
                      className={`w-full text-xs sm:text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red ${lang === 'fa' ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <Mail className="w-3.5 h-3.5 text-brand-red" />
                      <span>{t.careersFormEmail}</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@company.com"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <Phone className="w-3.5 h-3.5 text-brand-red" />
                      <span>{t.careersFormPhone} *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={lang === 'fa' ? '۰۹۱۲۳۴۵۶۷۸۹' : 'e.g. +989123456789'}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red text-left"
                    />
                  </div>

                  {/* Experience */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <Clock className="w-3.5 h-3.5 text-brand-red" />
                      <span>{t.careersFormExp}</span>
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                    >
                      <option value="none">{t.careersFormExpNone}</option>
                      <option value="1-3">{t.careersFormExp1to3}</option>
                      <option value="3-5">{t.careersFormExp3to5}</option>
                      <option value="7+">{t.careersFormExpMore}</option>
                    </select>
                  </div>
                </div>

                {/* Department Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block">{t.careersFormDept}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {departments.map((dept) => {
                      const isSelected = formData.department === dept.id;
                      return (
                        <button
                          key={dept.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, department: dept.id }))}
                          className={`p-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                            isSelected
                              ? 'bg-brand-red/10 border-brand-red text-brand-red shadow-sm'
                              : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100'
                          }`}
                        >
                          {dept.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Text Resume Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block">{t.careersFormResume}</label>
                  <textarea
                    name="resumeText"
                    rows={4}
                    value={formData.resumeText}
                    onChange={handleInputChange}
                    placeholder={lang === 'fa' ? 'در این قسمت مهارت‌ها، سوابق تحصیلی، دانشگاه محل تحصیل یا خلاصه‌ای از رزومه خود را وارد فرمایید...' : 'Briefly describe your skills, background, university, or highlights...'}
                    className={`w-full text-xs sm:text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red ${lang === 'fa' ? 'text-right' : 'text-left'}`}
                  />
                </div>

                {/* Drag and Drop File Upload Area */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block">
                    {lang === 'fa' ? 'بارگذاری فایل رزومه' : 'Upload Resume File'}
                  </label>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      isDragOver
                        ? 'border-brand-red bg-brand-red/5'
                        : uploadedFile
                        ? 'border-green-500 bg-green-500/5'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <Upload className={`w-8 h-8 mx-auto mb-2 ${uploadedFile ? 'text-green-500' : 'text-zinc-400 group-hover:text-brand-red'}`} />
                    {uploadedFile ? (
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-green-500">{lang === 'fa' ? 'فایل رزومه با موفقیت انتخاب شد' : 'Resume file uploaded successfully'}</span>
                        <p className="text-[10px] text-zinc-500 font-mono">{uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{lang === 'fa' ? 'رزومه خود را به اینجا بکشید یا برای بارگذاری کلیک فرمایید' : 'Drag & drop your resume file here or click to browse'}</p>
                        <span className="text-[10px] text-zinc-500 block">{lang === 'fa' ? 'پسوندهای مجاز: PDF, DOC, DOCX' : 'Supported formats: PDF, DOC, DOCX'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-red/20 hover:shadow-brand-red/30 transition-all cursor-pointer text-center"
                >
                  {t.careersFormSubmit}
                </button>

              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-950/50 rounded-full flex items-center justify-center text-green-500 mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{t.careersFormSuccess}</h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    {lang === 'fa' ? 'کد رهگیری پرونده پرسنلی شما:' : 'Your Application Tracking Code:'} <span className="font-mono text-brand-red font-bold">HR-{Math.floor(Math.random() * 900000) + 100000}</span>
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-md mx-auto">
                  {lang === 'fa' ? (
                    'از اینکه مایل به پیوستن به خانواده بزرگ صنعتی ایمن تک پیشرو هستید، کمال سپاسگزاری را داریم. رزومه شما توسط مدیریت منابع انسانی بررسی و در صورت تطابق شرایط، ظرف یک هفته کاری با شما تماس گرفته خواهد شد.'
                  ) : (
                    'We sincerely appreciate your interest in joining the family of Iman Tak Pishro. Your application is under review by our HR specialists, and we will contact you within a business week if your qualifications match our current vacancies.'
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setUploadedFile(null);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      department: 'rd',
                      experience: '1-3',
                      resumeText: '',
                    });
                  }}
                  className="px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  {lang === 'fa' ? 'ارسال مجدد درخواست دیگر' : 'Submit Another Application'}
                </button>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
