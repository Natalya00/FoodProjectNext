"use client";

import { useCallback } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export const useCategoriesParam = (): [number[], (value: number[]) => void] => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const categoriesParam = searchParams.get('categories');
  const categoryIds: number[] = categoriesParam
    ? categoriesParam.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id))
    : [];

  const setCategoryIds = useCallback((value: number[]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value.length > 0) {
      newParams.set('categories', value.join(','));
    } else {
      newParams.delete('categories');
    }
    router.push(`${pathname}?${newParams.toString()}`);
  }, [searchParams, pathname, router]);

  return [categoryIds, setCategoryIds];
};
