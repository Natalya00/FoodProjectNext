"use client";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const usePageParam = (): [number, (page: number | ((prev: number) => number)) => void] => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const validPage = isNaN(page) || page < 1 ? 1 : page;

  const setPage = useCallback((newPage: number | ((prev: number) => number)) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const nextPage = typeof newPage === 'function'
      ? newPage(validPage)
      : newPage;

    if (nextPage > 1) {
      newParams.set('page', nextPage.toString());
    } else {
      newParams.delete('page');
    }
    router.push(`${pathname}?${newParams.toString()}`);
  }, [searchParams, pathname, router, validPage]);

  return [validPage, setPage];
};
