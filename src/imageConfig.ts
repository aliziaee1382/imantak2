/**
 * تنظیمات تصاویر سایت ایمن تک پیشرو
 * 
 * تمامی لینک‌های تصاویر سایت را می‌توانید در این بخش به راحتی مدیریت و جایگذاری کنید.
 * در صورتی که لینک یک تصویر خالی باشد ('')، سیستم به صورت هوشمند از تصویر پیش‌فرض یا آیکون‌های استاندارد استفاده می‌کند.
 */
export const IMAGE_CONFIG = {
  // --- تصاویر شرکت و کارخانه (Company & Factory) ---
  // لینک تصویر نمای کارخانه یا شرکت را در این بخش قرار دهید.
  companyBanner: 'https://imantak.com/wp-content/uploads/2024/01/sakhtemoon-iman-tak.jpg', // نمونه: 'https://imantak.com/wp-content/uploads/2023/12/karkhaneh.jpg'

  // --- تصویر مدیرعامل (CEO / Leadership) ---
  // لینک تصویر جناب آقای مصطفی حفاری (مدیرعامل) را در این بخش قرار دهید.
  ceoPhoto: 'https://imantak.com/wp-content/uploads/2024/01/co-manager.jpg', // نمونه: 'https://imantak.com/wp-content/uploads/2024/01/co-manager.jpg'

  // --- گواهی‌نامه‌ها و افتخارات (Certificates & Honors) ---
  // لینک تصاویر گواهی‌نامه‌ها را در این بخش قرار دهید.
  certificates: {
    knowledgeBased: 'https://imantak.com/wp-content/uploads/2024/01/govahi-1.png', // گواهی‌نامه دانش‌بنیان (نمونه: 'https://imantak.com/wp-content/uploads/2024/01/govahi-1.png')
    iatf16949: 'https://imantak.com/wp-content/uploads/2024/01/govahi-2.png',      // گواهی‌نامه IATF 16949 (نمونه: 'https://imantak.com/wp-content/uploads/2024/01/govahi-2.png')
    isoTS: 'https://imantak.com/wp-content/uploads/2024/01/govhii-3.png',          // گواهی‌نامه طراحی ISO TS (نمونه: 'https://imantak.com/wp-content/uploads/2024/01/govhii-3.png')
  },

  // --- تصاویر کاتالوگ محصولات (Product Catalog) ---
  // لینک تصاویر مربوط به هر محصول را بر اساس کد فنی (Model) آن در زیر جایگذاری کنید.
  products: {
    AB328: 'https://imantak.com/wp-content/uploads/2024/01/AB328-1-270x262.jpg', // کلید بازکن درب صندوق عقب ریرا
    AB327: 'https://imantak.com/wp-content/uploads/2024/01/AB327-1-270x262.jpg', // کلید ترمز پارک برقی (EPB) و اتوهلد ریرا
    AB326: 'https://imantak.com/wp-content/uploads/2024/01/AB326-1-270x262.jpg', // کلید فلاشر ریرا
    AB325: 'https://imantak.com/wp-content/uploads/2024/01/AB325-1-270x262.jpg', // کلید مرکزی داشبورد ریرا
    AB330: 'https://imantak.com/wp-content/uploads/2024/01/AB330-1-270x262.jpg', // کلید کنترل گیربکس ریرا (شایفتر الکترونیکی)
    SN101: 'https://imantak.com/wp-content/uploads/2024/01/SN101-1-270x262.jpg', // سنسور موقعیت میل‌لنگ
    SN102: 'https://imantak.com/wp-content/uploads/2024/01/SN102-1-270x262.jpg', // مپ سنسور فشار مانیفولد (MAP Sensor)
    AB282: 'https://imantak.com/wp-content/uploads/2024/01/AB282-1-270x262.jpg', // استپر موتور XU7
    AB333: 'https://imantak.com/wp-content/uploads/2024/01/AB314-1-270x262.jpg', // استپر موتور AB333
    AB222: 'https://imantak.com/wp-content/uploads/2024/01/AB222-1-270x262.jpg', // ترموسوئیچ قطع کن فن رادیات
    AB003: 'https://imantak.com/wp-content/uploads/2024/02/AB003-270x262.jpg',     // سوئیچ چراغ ترمز دستی و صندوق
    AB001: 'https://imantak.com/wp-content/uploads/2024/01/AB001-1-270x262.jpg', // سوئیچ چراغ ترمز
    AB004: 'https://imantak.com/wp-content/uploads/2024/01/AB004-1-270x262.jpg', // سوئیچ چراغ ترمز AB004
    AB002: 'https://imantak.com/wp-content/uploads/2024/01/AB002-1-1-270x262.jpg', // سوئیچ چراغ دنده عقب AB002
    AB013: 'https://imantak.com/wp-content/uploads/2024/01/AB013-2-270x262.jpg', // سوئیچ چراغ دنده عقب AB013
    AB027: 'https://imantak.com/wp-content/uploads/2024/01/AB027-1-270x262.jpg', // سوئیچ چراغ دنده عقب AB027
    AB052: 'https://imantak.com/wp-content/uploads/2024/01/AB052-1-270x262.jpg', // سوئیچ چراغ دنده عقب AB052
    AB227: 'https://imantak.com/wp-content/uploads/2024/01/AB227-1-270x262.jpg', // سوئیچ چراغ دنده عقب AB227
    AB253: 'https://imantak.com/wp-content/uploads/2024/01/AB253-1-270x262.jpg', // سوئیچ چراغ دنده عقب AB253
    AB105: 'https://imantak.com/wp-content/uploads/2024/01/AB105-1-1-270x262.jpg', // سوئیچ چراغ قرمز / ترمز
    AB244: 'https://imantak.com/wp-content/uploads/2024/01/AB244-1-270x262.jpg', // سوئیچ دوکاره پنل کولر
    AB262: 'https://imantak.com/wp-content/uploads/2024/01/AB262-1-270x262.jpg', // سنسور اکسیژن بالای کاتالیست
    AB263: 'https://imantak.com/wp-content/uploads/2024/01/AB263-1-270x262.jpg', // سنسور اکسیژن بالای کاتالیست (SSAT)
    AB254: 'https://imantak.com/wp-content/uploads/2024/03/AB254-2-270x262.jpg', // سنسور ترموکوپل
    AB240: 'https://imantak.com/wp-content/uploads/2024/03/AB240-1-270x262.jpg', // سنسور دمای آب کاربراتور
    AB261: 'https://imantak.com/wp-content/uploads/2024/03/AB261-270x262.jpg',     // سنسور دمای آب AB261
    AB114: 'https://imantak.com/wp-content/uploads/2024/01/AB114-1-270x262.jpg', // سنسور دمای آب موتور انژکتوری (زیمنس)
    AB225: 'https://imantak.com/wp-content/uploads/2024/01/AB225-270x262.jpg',     // سنسور دمای آب موتور AB225
    AB234: 'https://imantak.com/wp-content/uploads/2024/01/AB234-1-270x262.jpg', // سنسور دمای آب موتور AB234
    AB257: 'https://imantak.com/wp-content/uploads/2024/01/AB275-1-270x262.jpg', // سنسور سرعت بلند AB257
    AB256: 'https://imantak.com/wp-content/uploads/2024/01/AB256-2-270x262.jpg', // سنسور سرعت کوتاه AB256
    AB134: 'https://imantak.com/wp-content/uploads/2024/01/AB134-2-270x262.jpg', // سنسور سرعت AB134
    AB103: 'https://imantak.com/wp-content/uploads/2024/01/AB103-1-270x262.jpg', // سنسور فشار روغن موتور AB103
    AB107: 'https://imantak.com/wp-content/uploads/2024/01/AB107-1-1-270x262.jpg', // سنسور فشار روغن موتور AB107
    AB128: 'https://imantak.com/wp-content/uploads/2024/01/Untitled-128-270x262.jpg', // سنسور فشار روغن موتور AB128
    AB151: 'https://imantak.com/wp-content/uploads/2024/01/AB151-1-270x262.jpg', // سنسور فشار روغن موتور AB151
    AB224: 'https://imantak.com/wp-content/uploads/2024/01/AB224-270x262.jpg',     // سنسور فشار روغن موتور AB224
    AB258: 'https://imantak.com/wp-content/uploads/2024/01/AB258-2-270x262.jpg', // سنسور فشار روغن موتور AB258
    AB180: 'https://imantak.com/wp-content/uploads/2024/01/AB180-1-2-270x262.jpg', // سنسور فشار روغن موتور ملی (EF7)
    AB238: 'https://imantak.com/wp-content/uploads/2024/01/AB238-270x262.jpg',     // سنسور فشار روغن هیدرولیک فرمان
    AB243: 'https://imantak.com/wp-content/uploads/2024/01/AB243-2-270x262.jpg', // سنسور کنترل دمای فن
    AB108: 'https://imantak.com/wp-content/uploads/2024/01/AB108-1-270x262.jpg', // سنسور نمایشگر درجه آب موتور انژکتوری (فشنگی)
    AB109: 'https://imantak.com/wp-content/uploads/2024/01/AB109-2-270x262.jpg', // سنسور نمایشگر درجه آب موتور (ترموکوپل)
  } as Record<string, string>,
};
