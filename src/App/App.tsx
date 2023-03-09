import { Router } from '@router/router';
import React from 'react';
import { Nav } from '@components/Nav';
import styles from './App.module.scss';
import { Spinner } from './Spinner';

export const App: React.FC = () => {
  return (
    <>
      <Spinner />
      <div className={styles.wrap}>
        <header className={styles.header}>
          <Nav />
        </header>
        <main className={styles.main}>
          <Router />
        </main>
      </div>
    </>
  );
};
