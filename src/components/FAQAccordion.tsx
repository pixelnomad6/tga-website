import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import type { FaqItem } from '../content/types';
import './FAQAccordion.css';

interface Props {
  items: FaqItem[];
  light?: boolean;
}

export default function FAQAccordion({ items, light = false }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  const sorted = [...items].sort((a, b) => Number(a.sort_order) - Number(b.sort_order));

  return (
    <div className={`faq-list ${light ? 'faq-light' : ''}`}>
      {sorted.map((item, i) => {
        const isOpen = open === item.id;
        return (
          <AnimatedSection key={item.id} delay={i * 0.05}>
            <div className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
              <button
                className="faq-trigger"
                onClick={() => setOpen(isOpen ? null : item.id)}
                aria-expanded={isOpen}
              >
                <span className="faq-question">{item.question}</span>
                <motion.span
                  className="faq-icon"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="faq-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="faq-answer">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        );
      })}
    </div>
  );
}
