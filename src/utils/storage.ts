import { Product, Article } from '../types';
import { PRODUCTS_DATA, ARTICLES_DATA } from '../data';

const PRODUCTS_KEY = 'imantak-dynamic-products';
const ARTICLES_KEY = 'imantak-dynamic-articles';

export function getProducts(): Product[] {
  const saved = localStorage.getItem(PRODUCTS_KEY);
  if (!saved) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS_DATA));
    return PRODUCTS_DATA;
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return PRODUCTS_DATA;
  }
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getArticles(): Article[] {
  const saved = localStorage.getItem(ARTICLES_KEY);
  if (!saved) {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(ARTICLES_DATA));
    return ARTICLES_DATA;
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return ARTICLES_DATA;
  }
}

export function saveArticles(articles: Article[]): void {
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
}
