import Link from 'next/link';
import Text from '@/shared/components/Text';
import Button from '@/shared/components/Button';

export default function NotFound() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <Text view="title" tag="h2">
        404 - Page Not Found
      </Text>
      <Text view="p-16" color="secondary">
        The page you are looking for does not exist.
      </Text>
      <div style={{ marginTop: '24px' }}>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}

