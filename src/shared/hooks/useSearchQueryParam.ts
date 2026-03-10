"use client";

import { useCallback } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export const useSearchQueryParam = (): [string, (value: string) => void] => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchQuery = searchParams.get('search') ?? '';

  const setSearchQuery = useCallback((value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      newParams.set('search', value.trim());
    } else {
      newParams.delete('search');
    }
    router.push(`${pathname}?${newParams.toString()}`);
  }, [searchParams, pathname, router]);

  return [searchQuery, setSearchQuery];
};
