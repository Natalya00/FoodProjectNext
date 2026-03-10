"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/shared/hooks/useAuth';
import Input from '@/shared/components/Input';
import Button from '@/shared/components/Button';
import Text from '@/shared/components/Text';
import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login({ identifier: email, password });
      router.push('/');
    } catch (err) {
      const axiosError = err as { response?: { data?: { error?: { message?: string } } } };
      const message = axiosError?.response?.data?.error?.message || 'Invalid email or password';
      setError(message);
    }
  };

  return (
    <div className={styles.container}>
      <Text view="title" className={styles.title}>Login</Text>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Email</label>
          <Input
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            type="email"
          />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <Input
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            type="password"
          />
        </div>

        {error && <Text view="p-16" color="accent" className={styles.error}>{error}</Text>}

        <Button type="submit" disabled={isLoading} className={styles.submit}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </form>

      <Text view="p-16" className={styles.link}>
        Don't have an account? <Link href="/register">Register</Link>
      </Text>
    </div>
  );
};

export default LoginPage;
