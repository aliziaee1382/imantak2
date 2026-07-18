export type AppTab = 'home' | 'about' | 'products' | 'articles' | 'cooperation' | 'contact';

export interface Product {
  id: string;
  title: string;
  titleEn: string;
  model: string;
  category: 'keys' | 'sensors' | 'switches';
  categoryFa: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  specs: { [key: string]: string };
  specsEn: { [key: string]: string };
  image: string;
}

export interface Article {
  id: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  category: string;
  categoryEn: string;
  date: string;
  dateEn: string;
  readTime: string;
  readTimeEn: string;
  videoUrl?: string;
}

export interface ContactForm {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface CooperationForm {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  experience: string;
  resumeText: string;
}
