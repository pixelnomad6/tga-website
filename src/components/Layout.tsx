import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './Nav';
import Footer from './Footer';
import type { MetaItem } from '../content/types';
import _metaData from '../content/meta.json';
const metaData = _metaData as unknown as MetaItem[];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer meta={metaData} />
    </>
  );
}
