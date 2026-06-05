import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import type { Service } from '../content/types';
import './ServiceCard.css';

const iconMap: Record<string, string> = {
  wind:           '🌀',
  droplets:       '💧',
  flame:          '🔥',
  home:           '🏠',
  'cloud-snow':   '🌨',
  'shield-alert': '🛡',
};

interface Props {
  service: Service;
  delay?: number;
  variant?: 'card' | 'row';
}

export default function ServiceCard({ service, delay = 0, variant = 'card' }: Props) {
  const summary = service.summary ?? service.sumary ?? '';

  if (variant === 'row') {
    return (
      <AnimatedSection delay={delay}>
        <div className="svc-row">
          <div className="svc-row-icon">{iconMap[service.icon] ?? '🏠'}</div>
          <div className="svc-row-body">
            <h2 className="svc-row-title">{service.title}</h2>
            <p className="svc-row-summary">{summary}</p>
            <p className="svc-row-detail">{service.body}</p>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection delay={delay}>
      <Link to="/services" className="svc-card-link">
        <span className="svc-card-icon">{iconMap[service.icon] ?? '🏠'}</span>
        <h3 className="svc-card-title">{service.title}</h3>
        <p className="svc-card-summary">{summary}</p>
        <span className="svc-card-arrow">→</span>
      </Link>
    </AnimatedSection>
  );
}
