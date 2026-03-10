"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/shared/hooks/useAuth';
import Input from '@/shared/components/Input';
import Button from '@/shared/components/Button';
import Text from '@/shared/components/Text';
import styles from './RegisterPage.module.scss';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await register({ username, email, password });
      router.push('/');
    } catch (err) {
      const axiosError = err as { response?: { data?: { error?: { message?: string } } } };
      const message = axiosError?.response?.data?.error?.message || 'Registration failed. Email may already be in use.';
      setError(message);
    }
  };

  return (
    <div className={styles.container}>
      <Text view="title" className={styles.title}>Register</Text>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Username</label>
          <Input
            value={username}
            onChange={setUsername}
            placeholder="Enter your username"
          />
        </div>

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
          {isLoading ? 'Loading...' : 'Register'}
        </Button>
      </form>

      <Text view="p-16" className={styles.link}>
        Already have an account? <Link href="/login">Login</Link>
      </Text>
    </div>
  );
};

export default RegisterPage;
