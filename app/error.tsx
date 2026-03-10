'use client';

import { useEffect } from 'react';
import Text from '@/shared/components/Text';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <Text view="title" tag="h2">
        Something went wrong!
      </Text>
      <Text view="p-16" color="secondary">
        {error.message || 'An unexpected error occurred'}
      </Text>
      <button
        onClick={() => reset()}
        style={{
          marginTop: '24px',
          padding: '12px 24px',
          backgroundColor: '#b5460f',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
}

