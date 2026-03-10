'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Text from '@/shared/components/Text';
import { useAuth } from '@/shared/hooks/useAuth';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/logo.svg" alt="Logo" />
        </Link>
      </div>
      <Text view="p-20" weight="bold" color="primary">Food Client</Text>
      <nav className={styles.nav}>
        <Link href="/">
          <Text tag="span" view="p-16" color="accent">Recipes</Text>
        </Link>
        <Text tag="span" view="p-16" color="primary">Meals Categories</Text>
        <Text tag="span" view="p-16" color="primary">Products</Text>
        <Text tag="span" view="p-16" color="primary">Menu Items</Text>
        <Text tag="span" view="p-16" color="primary">Meal Planning</Text>
      </nav>
      <div className={styles.icons}>
        {isAuthenticated ? (
          <>
            <Link href="/favorites">
              <img src="/logo_heart.svg" alt="Favorites" width={17} height={17} />
            </Link>
            <div className={styles.userMenu}>
              <span className={styles.username}>{user?.username}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link href="/login">
            <img src="/logo_user.svg" alt="Login" width={24} height={24} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
