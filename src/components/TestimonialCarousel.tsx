import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Testimonial } from '../content/types';
import './TestimonialCarousel.css';

interface Props {
  items: Testimonial[];
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function TestimonialCarousel({ items }: Props) {
  const [[index, dir], setPage] = useState([0, 0]);

  const paginate = useCallback((newDir: number) => {
    setPage(([i]) => {
      const next = (i + newDir + items.length) % items.length;
      return [next, newDir];
    });
  }, [items.length]);

  if (items.length === 0) return null;

  const t = items[index];

  return (
    <div className="tc-wrap">
      <div className="tc-stage">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            className="tc-card"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="tc-stars">{'★'.repeat(Number(t.stars))}</div>
            <blockquote className="tc-quote">"{t.quote}"</blockquote>
            <div className="tc-meta">
              {t.image
                ? <img src={t.image} alt={t.name} className="tc-avatar" />
                : <div className="tc-avatar-placeholder">{t.name.charAt(0)}</div>
              }
              <div>
                <strong className="tc-name">{t.name}</strong>
                <span className="tc-detail">{t.location} · {t.claim_type}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="tc-controls">
          <button className="tc-btn" onClick={() => paginate(-1)} aria-label="Previous testimonial">
            ←
          </button>
          <div className="tc-dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`tc-dot ${i === index ? 'tc-dot-active' : ''}`}
                onClick={() => setPage([i, i > index ? 1 : -1])}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button className="tc-btn" onClick={() => paginate(1)} aria-label="Next testimonial">
            →
          </button>
        </div>
      )}
    </div>
  );
}
