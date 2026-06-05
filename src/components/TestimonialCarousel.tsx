import type { Testimonial } from '../content/types';
import AnimatedSection from './AnimatedSection';
import './TestimonialCarousel.css';

interface Props {
  items: Testimonial[];
}

export default function TestimonialCarousel({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="tc-scroll-outer">
      <div className="tc-scroll-track">
        {items.map((t, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="tc-card">
              <div className="tc-stars">{'★'.repeat(Math.min(Number(t.stars) || 5, 5))}</div>
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
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
