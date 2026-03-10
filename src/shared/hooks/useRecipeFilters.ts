"use client";

import { useCallback } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export interface RecipeFilters {
  search: string;
  categories: number[];
  page: number;
}

export const useRecipeFilters = (): [
  RecipeFilters,
  (updates: Partial<RecipeFilters>) => void
] => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const search = searchParams.get('search') ?? '';

  const categoriesParam = searchParams.get('categories');
  const categories = categoriesParam
    ? categoriesParam.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id))
    : [];

  const pageParam = searchParams.get('page');
  const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;

  const setFilters = useCallback((updates: Partial<RecipeFilters>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (updates.search !== undefined) {
      if (updates.search.trim()) {
        newParams.set('search', updates.search.trim());
      } else {
        newParams.delete('search');
      }
    }

    if (updates.categories !== undefined) {
      if (updates.categories.length > 0) {
        newParams.set('categories', updates.categories.join(','));
      } else {
        newParams.delete('categories');
      }
    }

    if (updates.page !== undefined) {
      if (updates.page > 1) {
        newParams.set('page', updates.page.toString());
      } else {
        newParams.delete('page');
      }
    }

    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  return [{ search, categories, page }, setFilters];
};
