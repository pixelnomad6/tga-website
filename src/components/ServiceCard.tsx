import { Link } from 'react-router-dom';
import {
  Wind, Droplets, Flame, Home, CloudSnow,
  ShieldAlert, CloudLightning, Waves,
  HardHat, FileWarning, Thermometer, AlertTriangle,
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import type { Service } from '../content/types';
import './ServiceCard.css';

// Map service IDs and icon keywords to Lucide line icons
const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  // by service id
  'wind-damage':       Wind,
  'water-damage':      Droplets,
  'roof-damage':       Home,
  'hail-damage':       CloudSnow,
  'storm-damage':      CloudLightning,
  'denied-claims':     ShieldAlert,
  'fire-and-smoke':    Flame,
  'fire-and-smoke-damage': Flame,
  'flood-damage':      Waves,
  // by icon keyword (from Sheet icon column)
  'wind':              Wind,
  'droplets':          Droplets,
  'flame':             Flame,
  'home':              Home,
  'cloud-snow':        CloudSnow,
  'shield-alert':      ShieldAlert,
  'cloud-lightning':   CloudLightning,
  'waves':             Waves,
  'hard-hat':          HardHat,
  'file-warning':      FileWarning,
  'thermometer':       Thermometer,
  'alert-triangle':    AlertTriangle,
};

function ServiceIcon({ id, iconKey, size = 28 }: { id: string; iconKey: string; size?: number }) {
  const Icon = iconMap[iconKey] ?? iconMap[id] ?? Home;
  return <Icon size={size} strokeWidth={1.5} />;
}

interface Props {
  service: Service;
  delay?: number;
  variant?: 'card' | 'row';
}

export default function ServiceCard({ service, delay = 0, variant = 'card' }: Props) {
  const summary = service.summary ?? service.sumary ?? '';

  const displayTitle = service.short_title || service.title;

  if (variant === 'row') {
    return (
      <AnimatedSection delay={delay}>
        <Link to={`/services/${service.id}`} className="svc-row">
          <div className="svc-row-icon">
            <ServiceIcon id={service.id} iconKey={service.icon} size={36} />
          </div>
          <div className="svc-row-body">
            <h2 className="svc-row-title">{displayTitle}</h2>
            <p className="svc-row-summary">{summary}</p>
            <span className="svc-row-link">Read more →</span>
          </div>
        </Link>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection delay={delay}>
      <Link to={`/services/${service.id}`} className="svc-card-link">
        <span className="svc-card-icon">
          <ServiceIcon id={service.id} iconKey={service.icon} size={28} />
        </span>
        <h3 className="svc-card-title">{displayTitle}</h3>
        <p className="svc-card-summary">{summary}</p>
        <span className="svc-card-arrow">→</span>
      </Link>
    </AnimatedSection>
  );
}
