import { QueryClient } from '@tanstack/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { searchRecipes, getCategories } from '@/shared/config/recipes';
import RecipesPage from '@/shared/pages/RecipesPage';

export default async function Home() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['recipes', '', [], 1, 9],
      queryFn: () => searchRecipes({ searchQuery: '', categoryIds: [], page: 1, limit: 9 }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: getCategories,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <RecipesPage />
      </Suspense>
    </HydrationBoundary>
  );
}
