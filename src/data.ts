import { Product, Article } from './types';

export const HERO_SLIDES_FA = [
  {
    title: 'ایمن تک پیشرو',
    subtitle: 'بزرگترین تولیدی قطعات خودرو الکترومکانیکی کشور',
    description: 'پیشگام در طراحی، بومی‌سازی و تولید انبوه انواع کلیدها، سنسورها و سوئیچ‌های نسل جدید خودرو با چهار دهه سابقه درخشان در زنجیره تامین صنایع خودروسازی کشور.',
    highlight: 'بیش از ۴۰ سال افتخار ملی',
  },
  {
    title: 'سیستم‌های الکترونیک پیشرفته خودرو',
    subtitle: 'طراحی منطبق با استانداردهای جهانی و بومی',
    description: 'تولید تخصصی قطعات خودروی ریرا (اولین کراس‌اوور ملی) از جمله کلیدهای داشبورد، ترمز پارک برقی، کنترل گیربکس و فلاشر با مدرن‌ترین تجهیزات آزمایشگاهی.',
    highlight: 'تکنولوژی پیشرفته ریرا',
  },
  {
    title: 'آزمایشگاه تخصصی و مرجع',
    subtitle: 'کیفیت، دقت و دوام بی‌رقیب قطعات',
    description: 'انجام تست‌های پیشرفته عملکردی، متالوژی، رطوبت، دما و دوام الکترومکانیکی برای تضمین ۱۰۰ درصدی کیفیت و رضایت طولانی‌مدت مشتریان.',
    highlight: 'استاندارد بین‌المللی ISO',
  },
];

export const HERO_SLIDES_EN = [
  {
    title: 'Iman Tak Pishro',
    subtitle: 'Largest Manufacturer of Automotive Electro-Mechanical Parts',
    description: 'Pioneering the design, localization, and mass production of modern automotive switches, keys, and sensors with four decades of stellar history in the OEM supply chain.',
    highlight: 'Over 40 Years of Industrial Pride',
  },
  {
    title: 'Advanced Automotive Electronics',
    subtitle: 'Designed in Alignment with Global & Local Standards',
    description: 'Specialized production of electronic parts for Reera (first national crossover) including console buttons, EPB switch, gear controller, and warning flashers.',
    highlight: 'Advanced Reera Technology',
  },
  {
    title: 'Accredited Testing Laboratory',
    subtitle: 'Unrivaled Precision, Quality & Component Durability',
    description: 'Conducting advanced functional, metallurgy, humidity, thermal, and mechanical durability tests to guarantee 100% QA and long-term customer satisfaction.',
    highlight: 'International ISO Standard',
  },
];

export const COMPANY_STATS_FA = [
  { value: '۴۰+', label: 'سال سابقه صنعت' },
  { value: '۵۰+', label: 'قطعه بومی‌سازی شده' },
  { value: '۳۰۰+', label: 'نیروی متخصص و کارآفرینی' },
  { value: '۳', label: 'سایت تولید و آزمایشگاه مرجع' },
];

export const COMPANY_STATS_EN = [
  { value: '40+', label: 'Years of Industry Experience' },
  { value: '50+', label: 'Localized High-Tech Parts' },
  { value: '300+', label: 'Experts & Workforce Employees' },
  { value: '3', label: 'Production Sites & Test Labs' },
];

export const PRODUCT_CATEGORIES_FA = [
  {
    id: 'keys' as const,
    title: 'کلید ها',
    description: 'طراحی ظریف، کلیدزنی عالی با نورپردازی هماهنگ و منطبق با ارگونومی کابین خودرو.',
    icon: 'ToggleRight',
  },
  {
    id: 'sensors' as const,
    title: 'سنسور ها',
    description: 'اندازه‌گیری دقیق کمیت‌های فیزیکی مانند فشار، دما و سرعت با پایداری حرارتی بالا.',
    icon: 'Cpu',
  },
  {
    id: 'switches' as const,
    title: 'سوئیچ ها',
    description: 'سوئیچ‌های قطع و وصل جریان با بازده جریان بالا و طول عمر مکانیکی طولانی.',
    icon: 'Power',
  },
];

export const PRODUCT_CATEGORIES_EN = [
  {
    id: 'keys' as const,
    title: 'Keys & Buttons',
    description: 'Elegant designs, outstanding tactile feedback, and integrated lighting matching cockpit ergonomics.',
    icon: 'ToggleRight',
  },
  {
    id: 'sensors' as const,
    title: 'Sensors',
    description: 'High-precision tracking of physical variables like pressure, temperature, and speed with thermal stability.',
    icon: 'Cpu',
  },
  {
    id: 'switches' as const,
    title: 'Switches',
    description: 'Heavy-duty current switches with high power efficiency and prolonged mechanical work life.',
    icon: 'Power',
  },
];

import { PRODUCTS_DATA as IMPORTED_PRODUCTS_DATA } from './productsData';

export const PRODUCTS_DATA: Product[] = IMPORTED_PRODUCTS_DATA;

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art1',
    title: 'گزارش تصویری از نمایشگاه بین‌المللی خرداد ماه 1403',
    titleEn: 'Photo Report: International Auto Parts Expo June 2024',
    excerpt: 'در خرداد ماه 1403، چندین نمایشگاه مهم صنعتی برگزار شد که در آن شرکت ایمن تک پیشرو جدیدترین ماژول‌های الکترونیکی خود را به نمایش گذاشت.',
    excerptEn: 'In June 2024, several critical industrial exhibitions took place where Iman Tak Pishro proudly showcased its newest automotive multiplex modules.',
    content: 'در خرداد ماه 1403، چندین نمایشگاه مهم در این مجموعه و سالن‌های تخصصی بین‌المللی برگزار شد که هر یک به نحوی صنعت و تجارت داخلی و بین‌المللی را تحت تأثیر قرار دادند.\n\nشرکت ایمن تک پیشرو با حضوری مقتدرانه در این رویداد بزرگ، از پروژه‌های بومی‌سازی شده جدید خود از جمله کلیدهای پیشرفته کنسول خودروی ریرا رونمایی کرد. غرفه ایمن تک میزبان مدیران ارشد گروه صنعتی ایران‌خودرو، سایپا و جمع کثیری از کارشناسان، مهندسین الکترونیک و توزیع‌کنندگان قطعات یدکی سراسر کشور بود.\n\nدر حاشیه این نمایشگاه، کارگاه‌های تخصصی بررسی چالش‌های تامین قطعات های‌تک خودرو برگزار شد که تیمی از بخش تحقیق و توسعه ایمن تک پیشرو به ارائه‌ی راهکارهای فناورانه در تولید بردهای الکترونیکی مالتی‌پلکس پرداختند. این رویداد گام مهمی در جهت انعقاد قراردادهای جدید با زنجیره تامین خودروسازی کشور بود.',
    contentEn: 'In June 2024, multiple high-profile industrial trade fairs took place in specialized international centers, shifting regional supply chains.\n\nIman Tak Pishro, showing strong presence in this event, unveiled its newly localized high-tech projects, including advanced multiplex controllers for the Reera vehicle. The Iman Tak booth welcomed top executives from IKCO and SAIPA, along with electrical engineers and nationwide spare part distributors.\n\nFurthermore, specialized workshops addressed modern high-tech automotive components. Engineers from our R&D wing delivered highly technological presentations on the design of robust CAN-bus electronics, reinforcing our tie-ins with major automotive supply grids.',
    category: 'رویدادها و نمایشگاه‌ها',
    categoryEn: 'Exhibitions & Events',
    date: 'خرداد ۱۴۰۳',
    dateEn: 'June 2024',
    readTime: '۳ دقیقه مطالعه',
    readTimeEn: '3 min read'
  },
  {
    id: 'art2',
    title: 'شمع خودرو و اهمیت کارکرد صحیح آن در احتراق',
    titleEn: 'The Crucial Role of Spark Plugs in Engine Combustion',
    excerpt: 'خودرو از قطعات متعددی تشکیل شده که وجود هر یک برای عملکرد صحیح وسایل نقلیه کاملا ضروری است. در این میان بعضی از قطعات اهمیت بسیار بالایی دارند...',
    excerptEn: 'An automotive engine relies on numerous synchronized elements. Among them, spark plugs hold extreme weight regarding efficiency...',
    content: 'خودرو از قطعات متعددی تشکیل شده که وجود هر یک برای عملکرد صحیح وسایل نقلیه کاملاً ضروری است. در این میان بعضی از قطعات اهمیت بالاتری نسبت به دیگران دارند که شمع موتور از جمله آن‌هاست.\n\nشمع خودرو قطعه‌ای کوچک اما حیاتی است که در بالای سیلندر موتور قرار می‌گیرد و وظیفه ایجاد جرقه اولیه برای سوزاندن ترکیب فشرده شده هوا و سوخت را دارد. کیفیت جرقه زده شده توسط شمع به طور مستقیم روی شتاب خودرو، مصرف سوخت، میزان آلایندگی گازهای خروجی اگزوز و حتی صدای لرزش موتور تاثیرگذار است.\n\nخرابی شمع خودرو می‌تواند منجر به پدیده‌های مضری چون خام‌سوزی، کاهش شدید راندمان موتور، دشواری در استارت خوردن خودرو در سرما و آسیب جدی به کاتالیزور خودرو شود. کارشناسان ایمن تک پیشرو توصیه می‌کنند که برای تضمین عملکرد بهینه سیستم برقی و جرقه‌زنی خودرو، شمع‌ها را در فواصل مشخص (بین ۳۰,۰۰۰ تا ۵۰,۰۰۰ کیلومتر) بررسی و در صورت نیاز با نمونه‌های استاندارد تعویض نمایید.',
    contentEn: 'An automotive engine relies on numerous synchronized elements. Among them, spark plugs hold extreme weight regarding efficiency and performance.\n\nInstalled at the cylinder head, a spark plug is responsible for generating the electric arc that ignites compressed fuel-air mixtures. The quality of this spark directly controls vehicle acceleration, fuel economy, tailpipe emission scales, and engine vibrations.\n\nFailing plugs trigger harmful engine misfires, lost power output, hard cold-starts, and severe catalytic converter meltdown risks. Technicians at Iman Tak recommend regular spark plug checks every 30,000 to 50,000 kilometers to guarantee optimal ignition coil health and peak fuel efficiency.',
    category: 'آموزشی و فنی',
    categoryEn: 'Technical & Guides',
    date: 'اردیبهشت ۱۴۰۳',
    dateEn: 'May 2024',
    readTime: '۵ دقیقه مطالعه',
    readTimeEn: '5 min read'
  },
  {
    id: 'art3',
    title: 'تاریخچه نمایشگاه بین المللی خودرو قطعات و مجموعه ها',
    titleEn: 'A History of Auto Parts Trade Fairs in Iran',
    excerpt: 'اولین دوره نمایشگاه بین المللی قطعات خودرو و لوازم و مجموعه‌های خودرو در سال 1385 برگزار شد. از این سال به بعد این نمایشگاه مسیر رشد شگرفی را پیمود.',
    excerptEn: 'The inaugural exhibition of automotive parts and assemblies took place in 2006, launching a major evolutionary path for the industry.',
    content: 'تاریخچه نمایشگاه بین المللی خودرو:\nاولین دوره نمایشگاه بین‌المللی قطعات خودرو و لوازم و مجموعه‌های خودرو در سال 1385 برگزار شد. از این سال به بعد، این نمایشگاه به بستری بی‌نظیر برای تعامل میان قطعه‌سازان، نوآوران و شرکت‌های بین‌المللی تبدیل شد.\n\nبا نگاهی به سیر تاریخی نمایشگاه قطعات خودرو، می‌توان رشد تدریجی توان داخلی کشور را در زمینه بومی‌سازی تکنولوژی‌های مدرن مشاهده کرد. ایمن تک پیشرو به عنوان یکی از پیشگامان تولید قطعات الکترومکانیکی، از ادوار نخستین به عنوان مشارکت‌کننده فعال در این رویداد حضور داشته است.\n\nاین نمایشگاه سالانه فرصتی است تا استانداردهای جدید ملی و بین‌المللی معرفی شده و دستاوردهای فنی کارخانجات به بوته نقد و بررسی کارشناسان گذاشته شود. با توسعه فناوری‌های خودروهای الکتریکی و هوشمند، پیش‌بینی می‌شود مسیر آینده نمایشگاه‌ها به سمت نوآوری‌های دیجیتال و الکترومکانیک پیشرفته سوق یابد.',
    contentEn: 'The inaugural exhibition of automotive parts and assemblies was held in 2006, immediately becoming a massive milestone for regional automotive manufacturing.\n\nReviewing this historical event shows the gradual expansion of domestic engineers in localizing highly complex automotive parts. Iman Tak Pishro, as an electro-mechanical pioneer, has actively participated since the earliest annual schedules.\n\nThis national expo is a fertile ground to inspect upcoming standards and subject factory designs to audit by global experts. With electric and smart vehicles fast appearing, the future of these exhibitions will surely gravitate towards smart software, sensors, and state-of-the-art electro-mechanics.',
    category: 'صنعت خودرو',
    categoryEn: 'Automotive Industry',
    date: 'اسفند ۱۴۰۲',
    dateEn: 'March 2024',
    readTime: '۴ دقیقه مطالعه',
    readTimeEn: '4 min read'
  },
  {
    id: 'art4',
    title: 'استپر موتور چیست و چه نقشی در دریچه گاز دارد؟',
    titleEn: 'What is an Idle Air Control Valve (Stepper Motor)?',
    excerpt: 'استپر قطعه‌ای مهم در موتور خودرو است که روی دریچه گاز خودروها نصب می‌شود. عملکرد صحیح این قطعه برقی-مکانیکی پایداری دور موتور در حالت درجا را تامین می‌کند.',
    excerptEn: 'The IAC valve (stepper motor) is a crucial regulator on the throttle body. It manages engine idle stability when the accelerator is resting.',
    content: 'استپر موتور چیست؟\nاستپر قطعه‌ای مهم در موتور خودرو است که روی دریچه گاز خودروها نصب می‌شود. زمانی که پدال گاز فشرده نباشد (مثلاً در زمان ایست کامل خودرو یا تعویض دنده)، استپر که قطعه‌ای الکترونیکی مکانیکی است، مسیر هوای کمکی را پایش و کنترل می‌کند.\n\nاین قطعه با دریافت فرمان‌های مستقیم از کامپیوتر خودرو (ECU)، با باز یا بسته‌تر کردن یک مجرای فرعی هوا، دور موتور خودرو را در محدوده نرمال (معمولاً حدود ۸۰۰ دور در دقیقه) پایدار نگه می‌دارد. همچنین زمانی که کولر خودرو را روشن می‌کنید یا در هوای سرد استارت می‌زنید، بار روی موتور افزایش می‌یابد؛ اینجاست که استپر به سرعت وارد عمل شده و با افزایش هوای ورودی مانع از خاموش شدن خودرو می‌شود.\n\nعلائم خرابی استپر شامل نوسان شدید دور موتور در حالت درجا، گاز خوردن بی‌دلیل خودرو در هنگام خلاص بودن، و یا خاموش شدن ناگهانی موتور با رها کردن پدال گاز است. شستشو و تمیزکاری دوره‌ای مجرای استپر با اسپری مخصوص می‌تواند به افزایش طول عمر آن کمک شایانی کند.',
    contentEn: 'What is a Stepper Motor / Idle Air Control Valve?\nThe IAC valve is an essential actuator sitting on the throttle body. When the accelerator is not pressed (e.g., at stoplights or while changing gears), this smart module controls the backup bypass air pathway.\n\nReceiving signals from the engine computer (ECU), it adjusts the bypass valve to maintain consistent idle RPM (around 800 RPM). It also senses load increases when you activate the AC or crank the car in freezing temperatures, immediately bumping bypass air to keep the engine from stalling.\n\nCommon signs of a faulty IAC valve include severe RPM fluctuations, unexpected engine revving in neutral, or immediate engine stalls upon letting off the gas pedal. Periodic cleanup of the valve port using carbon-dissolving sprays can significantly extend its service lifespan.',
    category: 'آموزشی و فنی',
    categoryEn: 'Technical & Guides',
    date: 'بهمن ۱۴۰۲',
    dateEn: 'Feb 2024',
    readTime: '۶ دقیقه مطالعه',
    readTimeEn: '6 min read'
  },
  {
    id: 'art5',
    title: 'سنسور ها و اهمیت آن‌ها در پایش پارامترهای موتور',
    titleEn: 'How Sensors Feed Vital Real-Time Telemetry to ECUs',
    excerpt: 'سنسور (sensor) یعنی حس کننده، و از کلمه sens به معنی حس کردن گرفته شده است. سنسورها کمیت‌های مختلف فیزیکی را به سیگنال الکتریکی تبدیل می‌کنند.',
    excerptEn: 'Modern vehicles rely heavily on sensors. They measure physical attributes like heat, rotation, or pressure and convert them to electricity...',
    content: 'سنسورها سنسور (sensor) یعنی حس کننده، و از کلمه sens به معنی حس کردن گرفته شده است. سنسور می‌تواند کمیت‌هایی مانند فشار، حرارت، رطوبت، دما، موقعیت زاویه‌ای و سرعت را دریافت کرده و آن‌ها را به کمیت‌های الکتریکی پیوسته (آنالوگ) یا گسسته (دیجیتال) تبدیل کند.\n\nدر خودروهای امروزی، سنسورها حکم چشم و گوش مغز متفکر موتور یعنی ECU را دارند. بدون داشتن سنسورهای دقیق، کامپیوتر خودرو قادر به درک شرایط لحظه‌ای موتور نخواهد بود و در نتیجه کارکرد موتور غیرممکن خواهد شد. سنسورهایی نظیر سنسور اکسیژن، سنسور دمای آب، سنسور دور موتور و سنسور ضربه (ناک سنسور) به طور مستمر وضعیت احتراق را بررسی کرده و داده‌ها را در کسری از ثانیه مخابره می‌کنند.\n\nشرکت ایمن تک پیشرو با استفاده از مرغوب‌ترین چیپست‌های حساس سیلیکونی و مواد اولیه مقاوم در برابر خوردگی، انواع سنسورهای باکیفیت و کالیبره خودرو را مطابق با کدهای استاندارد خودروسازان بزرگ دنیا تولید می‌کند تا رانندگان تجربه‌ای ایمن، نرم و بدون دغدغه داشته باشند.',
    contentEn: 'Sensors are the primary telemetry eyes of modern vehicles. They convert physical dimensions such as rotation, fluid pressure, temperatures, or humidity levels into analog or digital electrical pulses.\n\nWithout highly active and precise sensors, the Engine Control Unit (ECU) would run blind, making clean and safe engine operations completely impossible. Oxygen sensors, water temperature sensors, crankshaft angle meters, and knock sensors constantly stream active combustion metrics to the ECU within fractions of a millisecond.\n\nBy sourcing elite silicon chips and corrosion-proof enclosures, Iman Tak produces highly accurate and factory-calibrated sensors matching global standards, offering drivers an exceptionally smooth, worry-free commute.',
    category: 'آموزشی و فنی',
    categoryEn: 'Technical & Guides',
    date: 'دی ۱۴۰۲',
    dateEn: 'Jan 2024',
    readTime: '۵ دقیقه مطالعه',
    readTimeEn: '5 min read'
  }
];

export const CLIENTS_LIST_FA = [
  { name: 'ایران خودرو', logo: 'IKCO', description: 'بزرگترین گروه خودروسازی ایران و تامین قطعات تندر ۹۰، دنا، ریرا، سمند و پژو' },
  { name: 'سایپا', logo: 'SAIPA', description: 'تامین‌کننده تخصصی انواع سوئیچ‌ها و سنسورهای پلتفرم شاهین، کوییک و تیبا' },
  { name: 'ایساکو', logo: 'ISACO', description: 'تامین و توزیع قطعات یدکی استاندارد در شبکه سراسری فروش ایساکو' },
  { name: 'سازه گستر سایپا', logo: 'SazehGostar', description: 'همکاری راهبردی در زنجیره مهندسی و تامین قطعات الکتریکی سایپا' },
  { name: 'مگا موتور', logo: 'MegaMotor', description: 'تامین سنسورهای دقیق سیستم‌های قوای محرکه و اکسل خودرو' },
];

export const CLIENTS_LIST_EN = [
  { name: 'Iran Khodro', logo: 'IKCO', description: 'Largest automotive group, sourcing components for Reera, Dena, Tara, and Peugeot' },
  { name: 'SAIPA Group', logo: 'SAIPA', description: 'Specialized OEM supplier of switches and sensors for Shahin, Quick, and Tiba' },
  { name: 'ISACO', logo: 'ISACO', description: 'Supplying standard spare parts across ISACO nationwide service network' },
  { name: 'Sazeh Gostar', logo: 'SazehGostar', description: 'Strategic partner in engineering and procurement of electrical parts' },
  { name: 'Mega Motor', logo: 'MegaMotor', description: 'Provider of critical sensors for engine systems and automotive axles' },
];

export const OFFICE_CONTACTS_FA = {
  factory: {
    title: 'کارخانه اصلی تولید',
    address: 'تهران، جاجرود، سعید آباد، خیابان گلستان، کوچه سبلان (آبان صنعت)، پلاک ۵',
    phones: ['۰۲۱-۷۶۲۰۳۷۷۳', '۰۲۱-۷۶۲۰۴۷۲۴'],
  },
  centralOffice: {
    title: 'دفتر مرکزی اداری',
    address: 'تهران، ضلع جنوبی، بلوار میرداماد، پلاک ۱۵۰، واحد ۱۰',
    phones: ['۰۲۱-۲۶۴۰۳۸۵۰'],
  },
  shop: {
    title: 'فروشگاه و توزیع کالا',
    address: 'تهران، خیابان امیرکبیر، مجتمع تجاری قطعات خودرو (بازار ملت)',
    phones: ['۰۲۱-۳۳۱۱۸۶۷۴'],
  },
  general: {
    email: 'info@imantak.com',
  }
};

export const OFFICE_CONTACTS_EN = {
  factory: {
    title: 'Main Manufacturing Plant',
    address: 'No. 5, Sabalan (Aban Sanat) Alley, Golestan St, Saeidabad, Jajarood, Tehran, Iran',
    phones: ['+98 21 7620 3773', '+98 21 7620 4724'],
  },
  centralOffice: {
    title: 'Central Administrative Office',
    address: 'Unit 10, No. 150, Mirdamad Blvd (South Side), Tehran, Iran',
    phones: ['+98 21 2640 3850'],
  },
  shop: {
    title: 'Wholesale & Distribution Store',
    address: 'Mellat Auto Parts Market, Amir Kabir St, Tehran, Iran',
    phones: ['+98 21 3311 8674'],
  },
  general: {
    email: 'info@imantak.com',
  }
};

export const TIMELINE_DATA_FA = [
  { year: '۱۳۶۸', text: 'تاسیس کارگاه ایمن تک با رویکرد تولید محصولات خودرویی از جمله استپ ترمز پیکان' },
  { year: '۱۳۷۹', text: 'اخذ گرید B شرکت ساپکو بر اساس الزامات ساپکو ۷۹' },
  { year: '۱۳۸۴', text: 'ثبت شرکت با نام ایمن تک پیشرو و آغاز رسمی فعالیت‌های تولیدی، گسترش همکاری با خودروسازان کشور و اخذ گواهینامه استاندارد ISO TS 16949:2002' },
  { year: '۱۳۸۵', text: 'تولید انواع کلیدهای الکترومکانیکی خودرو (کلیدهای گرمکن شیشه عقب پژو، مه شکن عقب پژو، فلاشر پژو و ...)' },
  { year: '۱۳۸۸', text: 'اخذ گرید +B از شرکت سازه گستر سایپا بر اساس الزامات خاص AR8601' },
  { year: '۱۳۸۹', text: 'اخذ گرید B از شرکت ساپکو بر اساس الزامات خاص SSR2' },
  { year: '۱۳۹۰', text: 'اخذ گواهینامه استاندارد ISO TS 16949:2009 با دامنه طراحی و توسعه محصول، انعقاد قرارداد همکاری و مشارکت در طراحی، ساخت و تولید قطعات خودرو از جمله کلیدهای پژو ۲۰۶ با یکی از شرکت‌های معتبر قطعه‌سازی در چین و انتقال کارخانه به منطقه صنعتی جاجرود و توسعه فضای فیزیکی شرکت' },
  { year: '۱۳۹۱', text: 'طراحی، تکوین و تولید سنسورهای حرارتی خودرو از جمله سنسورهای حرارتی آب پژو و پراید، فشنگی فشار روغن پژو و پراید و ...' },
  { year: '۱۳۹۲', text: 'طراحی، تکوین و تولید کلیدهای شیشه بالابر خودروهای سمند، پژو ۴۰۵ و پژو ۲۰۶' },
  { year: '۱۳۹۴', text: 'توسعه فروش در بازار لوازم یدکی به بیش از صد درصد' },
  { year: '۱۳۹۵', text: 'توسعه محصولات در خانواده کلیدها، سنسورها و سوئیچ‌ها از ۶۰ قطعه به ۹۰ قطعه' },
  { year: '۱۳۹۶', text: 'طراحی، تکوین و تولید محصول سنسور سرعت خودرو سمند و پژو، عقد قرارداد با شرکت ایکاپ جهت طراحی و تولید کلیدهای داشبورد و کلید تنظیم آئینه خودروهای پژو ۳۰۱، ۲۰۸ و ۲۰۰۸ و ورود در VENDOR LIST شرکت پژو فرانسه' },
  { year: '۱۳۹۸', text: 'اخذ گواهینامه استاندارد IATF 16949 از شرکت TUV آلمان و راه‌اندازی خط تولید کلیدهای داشبورد و تنظیم آئینه پژو ۳۰۱' },
  { year: '۱۳۹۹', text: 'طراحی، تکوین و تولید کلیدهای شیشه بالابر پژو ۳۰۱ (K132)، طراحی، تکوین و تولید اتوماتیک انواع رله‌های الکترومغناطیسی و خودکفایی در انواع سنسورهای فشار قوی هیدرولیک و گاز کولر خودروهای تولید داخل' },
  { year: '۱۴۰۰', text: 'طراحی و تکوین کلیدهای شیشه بالابر و آئینه برقی مالتی‌پلکس خودروهای پارس، دنا، رانا پلاس و تارا، طراحی، تکوین و تولید سنسورهای اکسیژن، استپر موتور XU7 و توسعه فیزیکی فضای تولیدی به مساحت ۴۵۰۰ متر مربع' },
  { year: '۱۴۰۱', text: 'طراحی و تکوین مجموعه کلیدهای کنسول سقف تارا، کلیدهای شیشه بالابر تارا، تنظیم صندلی تارا، کلیدهای شیشه بالابر سورن پلاس و سوئیچ بانک ساینا و کوئیک' },
  { year: '۱۴۰۲', text: 'طراحی و تکوین انواع بوق‌های خودروهای داخلی، طراحی و تکوین انواع میکرو رله‌های قابل مصرف در دسته سیم خودرو، طراحی و تکوین سنسورهای دور موتور و اخذ گواهینامه دانش‌بنیان در تولید محصولات و خدمات آزمایشگاهی' },
];

export const TIMELINE_DATA_EN = [
  { year: '1989', text: 'Establishment of Iman Tak workshop, focusing on manufacturing automotive parts, starting with the Paykan brake switch.' },
  { year: '2000', text: 'Achieving Grade B certification from SAPCO based on SAPCO 79 requirements.' },
  { year: '2005', text: 'Official registration as "Iman Tak Pishro Co.", expanding cooperation with national automakers and securing the ISO TS 16949:2002 standard.' },
  { year: '2006', text: 'Production of various automotive electromechanical keys (rear window heaters, rear fog lights, flasher buttons, etc. for Peugeot).' },
  { year: '2009', text: 'Achieving Grade B+ from Sazeh Gostar Saipa based on AR8601 requirements.' },
  { year: '2010', text: 'Securing Grade B from SAPCO under SSR2 requirements.' },
  { year: '2011', text: 'Securing the ISO TS 16949:2009 standard for design and development; signed a partnership agreement with a leading Chinese parts manufacturer for Peugeot 206 keys; relocated and expanded the main factory to the Jajarood Industrial Zone.' },
  { year: '2012', text: 'Design and manufacture of automotive thermal sensors (water temp sensors and oil pressure sensors for Peugeot and Pride).' },
  { year: '2013', text: 'Design and manufacture of power window switches for Samand, Peugeot 405, and Peugeot 206.' },
  { year: '2015', text: 'Boosting spare parts aftermarket sales by more than 100%.' },
  { year: '2016', text: 'Expanding the catalog of keys, sensors, and switches from 60 parts to over 90 localized components.' },
  { year: '2017', text: 'Design and mass production of vehicle speed sensors for Samand and Peugeot; signed contracts with IKAP for designing and manufacturing dashboard and mirror control switches for Peugeot 301, 208, and 2008; entered the official vendor list of Peugeot France.' },
  { year: '2019', text: 'Obtaining the IATF 16949 certification from TUV Germany; launching the dashboard key and mirror adjuster production line for Peugeot 301.' },
  { year: '2020', text: 'Designing and manufacturing power window switches for Peugeot 301 (IKCO Tara); mass production of electromagnetic relays and high-pressure hydraulic sensors, achieving self-sufficiency in automotive AC pressure switches.' },
  { year: '2021', text: 'Designing multiplex power window switches and mirrors for Pars, Dena, Runna Plus, and Tara; mass production of oxygen sensors and XU7 stepper motors; expanding the manufacturing facilities to 4,500 square meters.' },
  { year: '2022', text: 'Designing and localizing overhead console switches, power window units, and seat adjusters for IKCO Tara, Soren Plus, and Saina/Quick switch banks.' },
  { year: '2023', text: 'Designing and manufacturing automotive horns, micro-relays for wiring harnesses, and crankshaft position sensors; obtaining the official "Knowledge-Based" corporate certification for manufacturing and laboratory services.' },
];
