'use client';

import RecipePage from '@/shared/pages/RecipePage';

export const dynamic = 'force-dynamic';

export default function Recipe({ params }: { params: Promise<{ id: string }> }) {
  return <RecipePage />;
}
