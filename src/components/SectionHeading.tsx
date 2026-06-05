import AnimatedSection from './AnimatedSection';
import './SectionHeading.css';

interface Props {
  eyebrow?: string;
  heading: string;
  sub?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({ eyebrow, heading, sub, align = 'center', light = false }: Props) {
  const cls = [
    'sh-wrap',
    align === 'center' ? 'sh-center' : 'sh-left',
    light ? 'sh-light' : '',
  ].filter(Boolean).join(' ');

  return (
    <AnimatedSection className={cls}>
      {eyebrow && <span className="sh-eyebrow">{eyebrow}</span>}
      <h2 className="sh-title">{heading}</h2>
      {sub && <p className="sh-sub">{sub}</p>}
    </AnimatedSection>
  );
}
