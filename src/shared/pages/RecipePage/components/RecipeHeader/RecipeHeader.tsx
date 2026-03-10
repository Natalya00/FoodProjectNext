"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ArrowDownIcon from '@/shared/components/icons/ArrowDownIcon';
import styles from './RecipeHeader.module.scss';

interface RecipeHeaderProps {
  title: string;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => router.push('/')}
        aria-label="Назад"
      >
        <ArrowDownIcon color="accent" width={32} height={32} className={styles.icon} style={{ transform: 'rotate(90deg)' }} />
      </button>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default RecipeHeader;
