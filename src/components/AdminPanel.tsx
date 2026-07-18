import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Product, Article } from '../types';
import { 
  X, Lock, ShieldCheck, Plus, Trash2, Tag, 
  Settings, Image as ImageIcon, FileText, ShoppingBag, 
  Link as LinkIcon, Film, AlertCircle, Sparkles, Check
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'fa' | 'en';
  products: Product[];
  setProducts: (products: Product[]) => void;
  articles: Article[];
  setArticles: (articles: Article[]) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  lang,
  products,
  setProducts,
  articles,
  setArticles
}: AdminPanelProps) {
  // Login states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('imantak-admin-logged') === 'true';
  });

  // Active panel tab: 'products' | 'articles'
  const [activeTab, setActiveTab] = useState<'products' | 'articles'>('products');

  // New Product Form states
  const [pTitle, setPTitle] = useState('');
  const [pTitleEn, setPTitleEn] = useState('');
  const [pModel, setPModel] = useState('');
  const [pCategory, setPCategory] = useState<'keys' | 'sensors' | 'switches'>('keys');
  const [pDesc, setPDesc] = useState('');
  const [pDescEn, setPDescEn] = useState('');
  const [pFeatures, setPFeatures] = useState(''); // Textarea, line by line
  const [pFeaturesEn, setPFeaturesEn] = useState(''); // Textarea, line by line
  const [pSpecs, setPSpecs] = useState(''); // Textarea, key: value per line
  const [pSpecsEn, setPSpecsEn] = useState(''); // Textarea, key: value per line
  const [pImageBase64, setPImageBase64] = useState('');
  const [pImageUrl, setPImageUrl] = useState('');
  const [productSuccessMsg, setProductSuccessMsg] = useState('');

  // New Article Form states
  const [aTitle, setATitle] = useState('');
  const [aTitleEn, setATitleEn] = useState('');
  const [aExcerpt, setAExcerpt] = useState('');
  const [aExcerptEn, setAExcerptEn] = useState('');
  const [aContent, setAContent] = useState('');
  const [aContentEn, setAContentEn] = useState('');
  const [aCategory, setACategory] = useState('آموزشی و فنی');
  const [aCategoryEn, setACategoryEn] = useState('Technical & Guides');
  const [aDate, setADate] = useState('تیر ۱۴۰۳');
  const [aDateEn, setADateEn] = useState('July 2024');
  const [aReadTime, setAReadTime] = useState('۵ دقیقه مطالعه');
  const [aReadTimeEn, setAReadTimeEn] = useState('5 min read');
  const [aVideoUrl, setAVideoUrl] = useState('');
  const [articleSuccessMsg, setArticleSuccessMsg] = useState('');

  // Deletion confirmations (to avoid iframe confirm dialog blocking)
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  // Refs for inserting text at cursor
  const aContentRef = useRef<HTMLTextAreaElement>(null);
  const aContentEnRef = useRef<HTMLTextAreaElement>(null);

  // Helper function to insert text at cursor in any textarea
  const insertTextAtCursor = (
    ref: React.RefObject<HTMLTextAreaElement | null>,
    textToInsert: string,
    setter: (val: string) => void
  ) => {
    const textarea = ref.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = textarea.value;

    const newVal = currentVal.substring(0, start) + textToInsert + currentVal.substring(end);
    setter(newVal);

    // Put focus back and set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + textToInsert.length;
    }, 0);
  };

  if (!isOpen) return null;

  // Handle Admin Login Verification
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'pasword') {
      setIsLoggedIn(true);
      setLoginError('');
      sessionStorage.setItem('imantak-admin-logged', 'true');
    } else {
      setLoginError(
        lang === 'fa' 
          ? 'نام کاربری یا رمز عبور نادرست است!' 
          : 'Incorrect username or password!'
      );
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('imantak-admin-logged');
  };

  // Convert uploaded image file to Base64
  const handleProductImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPImageBase64(reader.result as string);
        setPImageUrl(''); // Clear text URL if file uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  // Create Product Submit Handler
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle || !pTitleEn || !pModel) {
      alert(lang === 'fa' ? 'لطفا فیلدهای ستاره‌دار را پر کنید.' : 'Please fill required fields.');
      return;
    }

    // Auto calculate categories based on category select
    let categoryFa = 'کلیدها و دکمه‌ها';
    let categoryEn = 'Keys & Buttons';
    if (pCategory === 'sensors') {
      categoryFa = 'سنسورهای هوشمند';
      categoryEn = 'Smart Sensors';
    } else if (pCategory === 'switches') {
      categoryFa = 'سوئیچ‌های الکترونیکی';
      categoryEn = 'Power Switches';
    }

    // Parse features (line-by-line)
    const featuresList = pFeatures.split('\n').map(f => f.trim()).filter(f => f.length > 0);
    const featuresListEn = pFeaturesEn.split('\n').map(f => f.trim()).filter(f => f.length > 0);

    // Parse specifications (key: value per line)
    const specsObj: { [key: string]: string } = {};
    pSpecs.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join(':').trim();
        if (key && val) specsObj[key] = val;
      }
    });

    const specsObjEn: { [key: string]: string } = {};
    pSpecsEn.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join(':').trim();
        if (key && val) specsObjEn[key] = val;
      }
    });

    // Default high-tech placeholder image if none provided
    const finalImage = pImageBase64 || pImageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80';

    const newProduct: Product = {
      id: 'custom-' + Date.now(),
      title: pTitle,
      titleEn: pTitleEn,
      model: pModel,
      category: pCategory,
      categoryFa,
      categoryEn,
      description: pDesc,
      descriptionEn: pDescEn,
      features: featuresList.length > 0 ? featuresList : ['کیفیت ساخت صنعتی عالی'],
      featuresEn: featuresListEn.length > 0 ? featuresListEn : ['Premium industrial grade construction'],
      specs: Object.keys(specsObj).length > 0 ? specsObj : { 'کشور سازنده': 'ایران' },
      specsEn: Object.keys(specsObjEn).length > 0 ? specsObjEn : { 'Origin': 'Iran' },
      image: finalImage
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem('imantak-dynamic-products', JSON.stringify(updated));

    // Reset Form & show success
    setPTitle('');
    setPTitleEn('');
    setPModel('');
    setPDesc('');
    setPDescEn('');
    setPFeatures('');
    setPFeaturesEn('');
    setPSpecs('');
    setPSpecsEn('');
    setPImageBase64('');
    setPImageUrl('');
    setProductSuccessMsg(lang === 'fa' ? 'محصول جدید با موفقیت ثبت شد!' : 'New product added successfully!');
    setTimeout(() => setProductSuccessMsg(''), 4000);
  };

  // Create Article Submit Handler
  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aTitle || !aTitleEn || !aContent) {
      alert(lang === 'fa' ? 'لطفا فیلدهای ستاره‌دار را پر کنید.' : 'Please fill required fields.');
      return;
    }

    const newArticle: Article = {
      id: 'art-custom-' + Date.now(),
      title: aTitle,
      titleEn: aTitleEn,
      excerpt: aExcerpt || aContent.slice(0, 100) + '...',
      excerptEn: aExcerptEn || aContentEn.slice(0, 100) + '...',
      content: aContent,
      contentEn: aContentEn || aContent,
      category: aCategory,
      categoryEn: aCategoryEn,
      date: aDate,
      dateEn: aDateEn,
      readTime: aReadTime,
      readTimeEn: aReadTimeEn,
      videoUrl: aVideoUrl || undefined
    };

    const updated = [newArticle, ...articles];
    setArticles(updated);
    localStorage.setItem('imantak-dynamic-articles', JSON.stringify(updated));

    // Reset Form & show success
    setATitle('');
    setATitleEn('');
    setAExcerpt('');
    setAExcerptEn('');
    setAContent('');
    setAContentEn('');
    setAVideoUrl('');
    setArticleSuccessMsg(lang === 'fa' ? 'مقاله یا خبر جدید با موفقیت منتشر شد!' : 'New article published successfully!');
    setTimeout(() => setArticleSuccessMsg(''), 4000);
  };

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('imantak-dynamic-products', JSON.stringify(updated));
    setProductToDelete(null);
  };

  // Delete Article
  const handleDeleteArticle = (id: string) => {
    const updated = articles.filter(a => a.id !== id);
    setArticles(updated);
    localStorage.setItem('imantak-dynamic-articles', JSON.stringify(updated));
    setArticleToDelete(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className={`w-full max-w-5xl bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-850 flex flex-col max-h-[90vh] overflow-hidden ${lang === 'fa' ? 'text-right' : 'text-left'}`}
        dir={lang === 'fa' ? 'rtl' : 'ltr'}
      >
        {/* Header Block */}
        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
                {lang === 'fa' ? 'پنل مدیریت شرکت ایمن تک پیشرو' : 'Iman Tak Admin Control Panel'}
              </h3>
              <p className="text-[10px] font-mono text-zinc-400">MANAGEMENT TERMINAL // V1.0</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-brand-red hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* LOGIN VIEW */}
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto py-12 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl mx-auto flex items-center justify-center text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-800">
                  <Lock className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-zinc-800 dark:text-white">
                  {lang === 'fa' ? 'ورود به حساب کاربری مدیریت' : 'Management Authentication'}
                </h4>
                <p className="text-xs text-zinc-500">
                  {lang === 'fa' ? 'برای تغییر محصولات و مقالات سایت وارد شوید.' : 'Sign in to configure catalogs and news modules.'}
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 block">
                    {lang === 'fa' ? 'نام کاربری ادمین' : 'Admin Username'}
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-red text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 block">
                    {lang === 'fa' ? 'رمز عبور' : 'Password'}
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-red text-sm transition-all font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-red/10 cursor-pointer transition-all"
                >
                  {lang === 'fa' ? 'تایید و ورود به پنل' : 'Authenticate Credentials'}
                </button>
              </form>
            </div>
          ) : (
            
            /* LOGGED IN DASHBOARD */
            <div className="space-y-8">
              {/* Tabs & Logout buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-200 dark:border-zinc-850 pb-4 gap-4">
                <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl gap-1">
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'products' 
                        ? 'bg-white dark:bg-zinc-850 text-brand-red shadow' 
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{lang === 'fa' ? 'مدیریت محصولات' : 'Products Manager'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('articles')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'articles' 
                        ? 'bg-white dark:bg-zinc-850 text-brand-red shadow' 
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>{lang === 'fa' ? 'مدیریت اخبار و مقالات' : 'Articles & News'}</span>
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-red-500/10 hover:text-red-500 text-xs font-bold text-zinc-500 cursor-pointer transition-all"
                >
                  {lang === 'fa' ? 'خروج از پنل ادمین' : 'Sign Out'}
                </button>
              </div>

              {/* PRODUCTS MANAGEMENT TAB */}
              {activeTab === 'products' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Add Product Form */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        <Plus className="w-4 h-4 text-brand-red" />
                        <h4 className="text-sm font-extrabold text-zinc-800 dark:text-white">
                          {lang === 'fa' ? 'افزودن محصول جدید به کاتالوگ' : 'Add New Automotive Product'}
                        </h4>
                      </div>

                      {productSuccessMsg && (
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 dark:text-green-400 text-xs font-bold flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          <span>{productSuccessMsg}</span>
                        </div>
                      )}

                      <form onSubmit={handleAddProduct} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'نام فارسی محصول *' : 'Farsi Name *'}
                            </label>
                            <input
                              type="text"
                              required
                              value={pTitle}
                              onChange={(e) => setPTitle(e.target.value)}
                              placeholder="مثال: کلید فلاشر ریرا"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'نام انگلیسی محصول *' : 'English Name *'}
                            </label>
                            <input
                              type="text"
                              required
                              value={pTitleEn}
                              onChange={(e) => setPTitleEn(e.target.value)}
                              placeholder="e.g. Reera Flasher Button"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'کد مدل قطعه *' : 'Component Model Code *'}
                            </label>
                            <input
                              type="text"
                              required
                              value={pModel}
                              onChange={(e) => setPModel(e.target.value)}
                              placeholder="e.g. AB32-FL95"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'دسته‌بندی قطعه *' : 'Product Category *'}
                            </label>
                            <select
                              value={pCategory}
                              onChange={(e) => setPCategory(e.target.value as 'keys' | 'sensors' | 'switches')}
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            >
                              <option value="keys">{lang === 'fa' ? 'کلیدها و دکمه‌ها' : 'Keys & Buttons'}</option>
                              <option value="sensors">{lang === 'fa' ? 'سنسورها' : 'Sensors'}</option>
                              <option value="switches">{lang === 'fa' ? 'سوئیچ‌ها' : 'Switches'}</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'توضیحات فارسی' : 'Farsi Description'}
                            </label>
                            <textarea
                              rows={2}
                              value={pDesc}
                              onChange={(e) => setPDesc(e.target.value)}
                              placeholder="توضیح مختصر در مورد ویژگی‌های اصلی و کاربرد..."
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'توضیحات انگلیسی' : 'English Description'}
                            </label>
                            <textarea
                              rows={2}
                              value={pDescEn}
                              onChange={(e) => setPDescEn(e.target.value)}
                              placeholder="Brief description of product features..."
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'ویژگی‌های قطعه (هر ویژگی در یک خط)' : 'Features List (One per line)'}
                            </label>
                            <textarea
                              rows={3}
                              value={pFeatures}
                              onChange={(e) => setPFeatures(e.target.value)}
                              placeholder="مکانیزم با دوام الکتریکی عالی&#10;نور پس‌زمینه یکنواخت&#10;تطابق کامل با استاندارد ایران خودرو"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'ویژگی‌های انگلیسی (هر کدام در یک خط)' : 'English Features (One per line)'}
                            </label>
                            <textarea
                              rows={3}
                              value={pFeaturesEn}
                              onChange={(e) => setPFeaturesEn(e.target.value)}
                              placeholder="Excellent electric tactile feedback&#10;Uniform LED illumination&#10;OEM grade build standards"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'مشخصات فنی فارسی (برچسب: مقدار - خط به خط)' : 'Farsi Technical Specs (Label: Value per line)'}
                            </label>
                            <textarea
                              rows={3}
                              value={pSpecs}
                              onChange={(e) => setPSpecs(e.target.value)}
                              placeholder="دمای کاری: -40 تا 85 درجه&#10;عمر مکانیکی: 100 هزار بار&#10;ولتاژ تغذیه: 12 ولت"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'مشخصات فنی انگلیسی (Label: Value - خط به خط)' : 'English Technical Specs (Label: Value per line)'}
                            </label>
                            <textarea
                              rows={3}
                              value={pSpecsEn}
                              onChange={(e) => setPSpecsEn(e.target.value)}
                              placeholder="Working Temp: -40C to +85C&#10;Mechanical Life: 100K cycles&#10;Supply Voltage: 12V DC"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>
                        </div>

                        {/* Image picker */}
                        <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl space-y-3">
                          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block flex items-center gap-1">
                            <ImageIcon className="w-4 h-4 text-brand-red" />
                            {lang === 'fa' ? 'انتخاب تصویر قطعه' : 'Product Visual Image'}
                          </span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] text-zinc-500 font-bold block">
                                {lang === 'fa' ? 'بارگذاری تصویر از سیستم (Base64)' : 'Upload File (Converts to Base64)'}
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleProductImageFile}
                                className="w-full text-xs text-zinc-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-red/10 file:text-brand-red hover:file:bg-brand-red/25 cursor-pointer file:cursor-pointer"
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <label className="text-[10px] text-zinc-500 font-bold block">
                                {lang === 'fa' ? 'یا لینک آدرس اینترنتی تصویر' : 'Or paste online Image URL'}
                              </label>
                              <input
                                type="text"
                                value={pImageUrl}
                                onChange={(e) => {
                                  setPImageUrl(e.target.value);
                                  setPImageBase64(''); // clear base64 if URL is pasted
                                }}
                                placeholder="https://..."
                                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all font-mono"
                              />
                            </div>
                          </div>

                          {(pImageBase64 || pImageUrl) && (
                            <div className="mt-2 flex items-center gap-3">
                              <img 
                                src={pImageBase64 || pImageUrl} 
                                alt="Preview" 
                                className="w-12 h-12 object-cover rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white" 
                              />
                              <span className="text-[10px] font-bold text-green-500">
                                {lang === 'fa' ? 'تصویر آماده انتشار است' : 'Image ready for publication'}
                              </span>
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-xl text-xs font-bold shadow transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{lang === 'fa' ? 'افزودن این محصول جدید' : 'Publish This Product'}</span>
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Right: Existing Products List for deletion */}
                  <div className="lg:col-span-5 space-y-4">
                    <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-brand-red" />
                      {lang === 'fa' ? 'کاتالوگ فعلی قطعات' : 'ACTIVE PARTS LIST'} ({products.length})
                    </h4>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                      {products.map((p) => (
                        <div 
                          key={p.id}
                          className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img 
                              src={p.image} 
                              alt={p.title} 
                              className="w-10 h-10 rounded-lg object-cover bg-white border border-zinc-200 dark:border-zinc-800 shrink-0" 
                            />
                            <div className="min-w-0">
                              <h5 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                                {lang === 'fa' ? p.title : p.titleEn}
                              </h5>
                              <p className="text-[9px] font-mono text-zinc-400 truncate">
                                {p.model} • {lang === 'fa' ? p.categoryFa : p.categoryEn}
                              </p>
                            </div>
                          </div>

                          {productToDelete === p.id ? (
                            <div className="flex items-center gap-1.5 shrink-0 bg-red-500/10 dark:bg-red-500/5 p-1 rounded-lg border border-red-500/20">
                              <span className="text-[9px] font-bold text-red-500 px-1">
                                {lang === 'fa' ? 'حذف؟' : 'Sure?'}
                              </span>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[9px] font-black rounded cursor-pointer transition-colors"
                              >
                                {lang === 'fa' ? 'بله' : 'Yes'}
                              </button>
                              <button
                                onClick={() => setProductToDelete(null)}
                                className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-300 text-[9px] font-bold rounded cursor-pointer transition-colors"
                              >
                                {lang === 'fa' ? 'خیر' : 'No'}
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setProductToDelete(p.id)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-brand-red hover:bg-brand-red/5 transition-colors cursor-pointer shrink-0"
                              title={lang === 'fa' ? 'حذف محصول' : 'Delete Product'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ARTICLES MANAGEMENT TAB */}
              {activeTab === 'articles' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Add Article Form */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        <Plus className="w-4 h-4 text-brand-red" />
                        <h4 className="text-sm font-extrabold text-zinc-800 dark:text-white">
                          {lang === 'fa' ? 'انتشار مقاله یا خبر جدید' : 'Publish New Article / News'}
                        </h4>
                      </div>

                      {articleSuccessMsg && (
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 dark:text-green-400 text-xs font-bold flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          <span>{articleSuccessMsg}</span>
                        </div>
                      )}

                      <form onSubmit={handleAddArticle} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'عنوان مقاله (فارسی) *' : 'Article Title (Farsi) *'}
                            </label>
                            <input
                              type="text"
                              required
                              value={aTitle}
                              onChange={(e) => setATitle(e.target.value)}
                              placeholder="مثال: تکنولوژی کلیدهای نسل جدید خودرو"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'عنوان مقاله (انگلیسی) *' : 'Article Title (English) *'}
                            </label>
                            <input
                              type="text"
                              required
                              value={aTitleEn}
                              onChange={(e) => setATitleEn(e.target.value)}
                              placeholder="e.g. Technology of New Automotive Switches"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'دسته‌بندی (فارسی)' : 'Category (Farsi)'}
                            </label>
                            <input
                              type="text"
                              value={aCategory}
                              onChange={(e) => setACategory(e.target.value)}
                              placeholder="مثال: آموزشی و فنی"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'دسته‌بندی (انگلیسی)' : 'Category (English)'}
                            </label>
                            <input
                              type="text"
                              value={aCategoryEn}
                              onChange={(e) => setACategoryEn(e.target.value)}
                              placeholder="e.g. Technical & Guides"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'تاریخ انتشار (فارسی)' : 'Date (Farsi)'}
                            </label>
                            <input
                              type="text"
                              value={aDate}
                              onChange={(e) => setADate(e.target.value)}
                              placeholder="مثال: تیر ۱۴۰۳"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'تاریخ انتشار (انگلیسی)' : 'Date (English)'}
                            </label>
                            <input
                              type="text"
                              value={aDateEn}
                              onChange={(e) => setADateEn(e.target.value)}
                              placeholder="e.g. July 2024"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'زمان تخمینی مطالعه (فارسی)' : 'Read Time (Farsi)'}
                            </label>
                            <input
                              type="text"
                              value={aReadTime}
                              onChange={(e) => setAReadTime(e.target.value)}
                              placeholder="مثال: ۵ دقیقه مطالعه"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'زمان تخمینی مطالعه (انگلیسی)' : 'Read Time (English)'}
                            </label>
                            <input
                              type="text"
                              value={aReadTimeEn}
                              onChange={(e) => setAReadTimeEn(e.target.value)}
                              placeholder="e.g. 5 min read"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'چکیده/خلاصه خبر (فارسی)' : 'Excerpt/Summary (Farsi)'}
                            </label>
                            <textarea
                              rows={2}
                              value={aExcerpt}
                              onChange={(e) => setAExcerpt(e.target.value)}
                              placeholder="توضیح کوتاه و جذاب خبر..."
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'چکیده/خلاصه خبر (انگلیسی)' : 'Excerpt/Summary (English)'}
                            </label>
                            <textarea
                              rows={2}
                              value={aExcerptEn}
                              onChange={(e) => setAExcerptEn(e.target.value)}
                              placeholder="Brief visual summary of news..."
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1 col-span-1 sm:col-span-2">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'متن کامل مقاله (فارسی) *' : 'Full Content Text (Farsi) *'}
                            </label>
                            <textarea
                              ref={aContentRef}
                              rows={8}
                              required
                              value={aContent}
                              onChange={(e) => setAContent(e.target.value)}
                              placeholder="متن کامل خبر، مقاله آموزشی یا گزارش..."
                              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all font-medium"
                            />
                            
                            {/* Farsi Inline Image Helper */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 rounded-xl mt-1.5">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                                  {lang === 'fa' ? 'درج تصویر در هر کجای متن (محل نشانگر موس):' : 'Insert image at cursor position:'}
                                </span>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-2">
                                {/* Upload File Button */}
                                <label className="px-2.5 py-1.5 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-zinc-700 hover:border-brand-red dark:hover:border-brand-red rounded-lg text-[10px] font-extrabold text-zinc-700 dark:text-zinc-300 cursor-pointer flex items-center gap-1.5 transition-all">
                                  <ImageIcon className="w-3.5 h-3.5 text-brand-red" />
                                  <span>{lang === 'fa' ? 'آپلود فایل عکس' : 'Upload Image File'}</span>
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64 = reader.result as string;
                                          insertTextAtCursor(aContentRef, `\n[image: ${base64}]\n`, setAContent);
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>

                                {/* URL Input & button */}
                                <div className="flex items-center gap-1">
                                  <input 
                                    type="text" 
                                    id="inline-img-url-fa"
                                    placeholder={lang === 'fa' ? 'یا لینک مستقیم عکس...' : 'Or enter image URL...'} 
                                    className="w-[140px] px-2 py-1.5 text-[10px] rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-750 focus:outline-none focus:ring-1 focus:ring-brand-red transition-all font-mono"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const input = document.getElementById('inline-img-url-fa') as HTMLInputElement;
                                      if (input && input.value.trim()) {
                                        insertTextAtCursor(aContentRef, `\n[image: ${input.value.trim()}]\n`, setAContent);
                                        input.value = '';
                                      }
                                    }}
                                    className="px-2.5 py-1.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-lg text-[10px] font-black cursor-pointer transition-all shrink-0"
                                  >
                                    {lang === 'fa' ? 'درج' : 'Insert'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1 col-span-1 sm:col-span-2">
                            <label className="text-xs font-bold text-zinc-500 block">
                              {lang === 'fa' ? 'متن کامل مقاله (انگلیسی)' : 'Full Content Text (English)'}
                            </label>
                            <textarea
                              ref={aContentEnRef}
                              rows={8}
                              value={aContentEn}
                              onChange={(e) => setAContentEn(e.target.value)}
                              placeholder="Full article content in English..."
                              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all font-medium"
                            />

                            {/* English Inline Image Helper */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 rounded-xl mt-1.5">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                                  {lang === 'fa' ? 'درج تصویر در هر کجای متن (محل نشانگر موس):' : 'Insert image at cursor position:'}
                                </span>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-2">
                                {/* Upload File Button */}
                                <label className="px-2.5 py-1.5 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-zinc-700 hover:border-brand-red dark:hover:border-brand-red rounded-lg text-[10px] font-extrabold text-zinc-700 dark:text-zinc-300 cursor-pointer flex items-center gap-1.5 transition-all">
                                  <ImageIcon className="w-3.5 h-3.5 text-brand-red" />
                                  <span>{lang === 'fa' ? 'آپلود فایل عکس' : 'Upload Image File'}</span>
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const base64 = reader.result as string;
                                          insertTextAtCursor(aContentEnRef, `\n[image: ${base64}]\n`, setAContentEn);
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>

                                {/* URL Input & button */}
                                <div className="flex items-center gap-1">
                                  <input 
                                    type="text" 
                                    id="inline-img-url-en"
                                    placeholder={lang === 'fa' ? 'یا لینک مستقیم عکس...' : 'Or enter image URL...'} 
                                    className="w-[140px] px-2 py-1.5 text-[10px] rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-750 focus:outline-none focus:ring-1 focus:ring-brand-red transition-all font-mono"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const input = document.getElementById('inline-img-url-en') as HTMLInputElement;
                                      if (input && input.value.trim()) {
                                        insertTextAtCursor(aContentEnRef, `\n[image: ${input.value.trim()}]\n`, setAContentEn);
                                        input.value = '';
                                      }
                                    }}
                                    className="px-2.5 py-1.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-lg text-[10px] font-black cursor-pointer transition-all shrink-0"
                                  >
                                    {lang === 'fa' ? 'درج' : 'Insert'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Video link input */}
                        <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl space-y-3">
                          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block flex items-center gap-1.5">
                            <Film className="w-4 h-4 text-brand-red" />
                            {lang === 'fa' ? 'لینک ویدیو/فیلم برای نمایش در مقاله' : 'Link Video / Movie for Article'}
                          </span>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] text-zinc-500 font-bold block">
                              {lang === 'fa' 
                                ? 'لینک مستقیم ویدیو (MP4) یا آدرس صفحه اشتراک آپارات/یوتیوب یا کد Iframe' 
                                : 'Direct video link (MP4) or Aparat/YouTube share address/Iframe code'}
                            </label>
                            <input
                              type="text"
                              value={aVideoUrl}
                              onChange={(e) => setAVideoUrl(e.target.value)}
                              placeholder="e.g. https://www.aparat.com/v/v12345"
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all font-mono"
                            />
                            <p className="text-[10px] text-zinc-400 mt-1">
                              {lang === 'fa' 
                                ? '💡 سیستم به صورت خودکار آدرس‌های کپی شده از آپارات و یوتیوب را به پخش‌کننده روان تعبیه شده تبدیل خواهد کرد.' 
                                : '💡 System will automatically transform Aparat and YouTube links into seamless embedded players.'}
                            </p>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-xl text-xs font-bold shadow transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{lang === 'fa' ? 'انتشار این مقاله و خبر' : 'Publish This Article'}</span>
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Right: Existing Articles List for deletion */}
                  <div className="lg:col-span-5 space-y-4">
                    <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-brand-red" />
                      {lang === 'fa' ? 'لیست مقالات و اخبار منتشر شده' : 'PUBLISHED ARTICLES'} ({articles.length})
                    </h4>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                      {articles.map((art) => (
                        <div 
                          key={art.id}
                          className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0 flex-1">
                            <h5 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                              {lang === 'fa' ? art.title : art.titleEn}
                            </h5>
                            <p className="text-[9px] font-mono text-zinc-400">
                              {lang === 'fa' ? art.date : art.dateEn} • {lang === 'fa' ? art.category : art.categoryEn}
                              {art.videoUrl && (
                                <span className="ml-1.5 px-1 py-0.5 rounded bg-brand-red/10 text-brand-red text-[8px] font-bold">
                                  {lang === 'fa' ? 'دارای فیلم' : 'HAS VIDEO'}
                                </span>
                              )}
                            </p>
                          </div>

                          {articleToDelete === art.id ? (
                            <div className="flex items-center gap-1.5 shrink-0 bg-red-500/10 dark:bg-red-500/5 p-1 rounded-lg border border-red-500/20">
                              <span className="text-[9px] font-bold text-red-500 px-1">
                                {lang === 'fa' ? 'حذف؟' : 'Sure?'}
                              </span>
                              <button
                                onClick={() => handleDeleteArticle(art.id)}
                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[9px] font-black rounded cursor-pointer transition-colors"
                              >
                                {lang === 'fa' ? 'بله' : 'Yes'}
                              </button>
                              <button
                                onClick={() => setArticleToDelete(null)}
                                className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-300 text-[9px] font-bold rounded cursor-pointer transition-colors"
                              >
                                {lang === 'fa' ? 'خیر' : 'No'}
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setArticleToDelete(art.id)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-brand-red hover:bg-brand-red/5 transition-colors cursor-pointer shrink-0"
                              title={lang === 'fa' ? 'حذف مقاله' : 'Delete Article'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
