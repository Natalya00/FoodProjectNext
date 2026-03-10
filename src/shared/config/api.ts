import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://front-school-strapi.ktsdev.ru';

export const CACHE_OPTIONS = {
  recipes: { next: { revalidate: 60 } },
  categories: { next: { revalidate: 3600 } },
  favorites: { cache: 'no-store' },
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

