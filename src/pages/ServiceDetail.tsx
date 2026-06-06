import { INTAKE_FORM_URL } from '../lib/config';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, BadgeDollarSign } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';
import ServiceCard from '../components/ServiceCard';
import type { Service } from '../content/types';
import _servicesData from '../content/services.json';
import './ServiceDetail.css';

const servicesData = _servicesData as unknown as Service[];

function getDisplayTitle(s: Service) {
  return s.short_title
    || s.title.split(' Public Adjuster')[0].split(':')[0].trim();
}

// Parse body into: content before FAQ, FAQ items, content after FAQ
function parseBodyWithFAQ(body: string) {
  const faqMatch = body.match(/^(#{1,2}\s+.*(faq|frequently asked).*)$/im);
  if (!faqMatch || faqMatch.index === undefined) {
    return { before: body, faqs: [], faqHeading: '', after: '' };
  }
  const before = body.slice(0, faqMatch.index).trim();
  const faqAndAfter = body.slice(faqMatch.index);
  const firstNewline = faqAndAfter.indexOf('\n');
  const faqHeading = faqAndAfter.slice(0, firstNewline).replace(/^#{1,2}\s+/, '').trim();
  const faqContent = faqAndAfter.slice(firstNewline + 1);
  const nextH2 = faqContent.match(/^##\s+/m);
  const faqBody = nextH2?.index !== undefined ? faqContent.slice(0, nextH2.index) : faqContent;
  const after = nextH2?.index !== undefined ? faqContent.slice(nextH2.index) : '';
  const faqs: Array<{ question: string; answer: string }> = [];
  const qaRegex = /###\s+(.+)\n([\s\S]+?)(?=###|$)/g;
  let m;
  while ((m = qaRegex.exec(faqBody)) !== null) {
    faqs.push({ question: m[1].trim(), answer: m[2].trim().replace(/\n+/g, ' ') });
  }
  return { before, faqs, faqHeading, after };
}

// Check if a paragraph node is a solo CTA link (e.g. [Text →](/url))
function isCTALink(children: any): { text: string; href: string } | null {
  const child = Array.isArray(children) ? children[0] : children;
  if (!child || typeof child !== 'object') return null;
  if (child.type !== 'a' && child?.props?.href === undefined) return null;
  const href = child.props?.href ?? '';
  const text = typeof child.props?.children === 'string' ? child.props.children : '';
  if (!href || !text) return null;
  return { text, href };
}

// FAQ accordion
function FAQBlock({ heading, items }: { heading: string; items: Array<{ question: string; answer: string }> }) {
  const [open, setOpen] = useState<number | null>(null);
  if (!items.length) return null;
  return (
    <div className="sd-faq-block">
      {heading && <h2 className="sd-md-h2">{heading}</h2>}
      <div className="sd-faq-list">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`sd-faq-item ${isOpen ? 'sd-faq-item-open' : ''}`}>
              <button className="sd-faq-trigger" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                <span>{item.question}</span>
                <motion.span className="sd-faq-icon" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div className="sd-faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Stats strip — appears below hero on every service page
const STATS = [
  { Icon: BadgeDollarSign, value: '$0 Upfront',         label: 'Fee only from what we recover for you' },
  { Icon: ShieldCheck,     value: 'Michigan Licensed',  label: 'Series 16-70 Public Adjuster' },
  { Icon: Clock,           value: '24-Hour Response',   label: 'On-site inspection within 48 hours' },
];

function StatsStrip() {
  return (
    <div className="sd-stats-strip">
      {STATS.map(({ Icon, value, label }) => (
        <div key={value} className="sd-stat">
          <Icon size={36} strokeWidth={1.5} className="sd-stat-icon" />
          <strong className="sd-stat-value">{value}</strong>
          <span className="sd-stat-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

// Mid-page CTA block
function MidCTA() {
  return (
    <div className="sd-mid-cta">
      <div className="sd-mid-cta-inner">
        <p>Not sure if your claim qualifies? We'll tell you honestly — free, no pressure.</p>
        <Button href={INTAKE_FORM_URL} size="lg">Get a Free Claim Review</Button>
      </div>
    </div>
  );
}

// Markdown component overrides
function makeMdComponents(_displayTitle: string) {
  return {
    h1: ({ children }: any) => <h1 className="sd-md-h1">{children}</h1>,
    h2: ({ children }: any) => (
      <div className="sd-section-heading">
        <h2 className="sd-md-h2">{children}</h2>
      </div>
    ),
    h3: ({ children }: any) => <h3 className="sd-md-h3">{children}</h3>,
    p: ({ children }: any) => {
      const cta = isCTALink(children);
      if (cta) {
        return (
          <div className="sd-body-cta">
            <Button to={cta.href.startsWith('/') ? cta.href : '/contact'} variant="primary" size="lg">
              {cta.text.replace(' →', '')}
            </Button>
          </div>
        );
      }
      return <p className="sd-md-p">{children}</p>;
    },
    ul: ({ children }: any) => <ul className="sd-md-ul">{children}</ul>,
    ol: ({ children }: any) => <ol className="sd-md-ol">{children}</ol>,
    li: ({ children }: any) => <li className="sd-md-li">{children}</li>,
    a: ({ href, children }: any) => <a href={href} className="sd-md-a">{children}</a>,
    hr: () => <hr className="sd-md-hr" />,
    strong: ({ children }: any) => <strong className="sd-md-strong">{children}</strong>,
    blockquote: ({ children }: any) => <blockquote className="sd-md-blockquote">{children}</blockquote>,
  };
}

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = servicesData.find(s => s.id === id);
  const otherServices = servicesData
    .filter(s => s.id !== id)
    .sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
    .slice(0, 3);

  if (!service) {
    return (
      <div className="sd-not-found container">
        <h1>Service not found</h1>
        <Link to="/services">← Back to all services</Link>
      </div>
    );
  }

  const displayTitle = getDisplayTitle(service);
  const body = service.body || '';
  const { before, faqs, faqHeading, after } = parseBodyWithFAQ(body);

  // Split "before" content at roughly halfway for mid-page CTA insertion
  const sections = before.split(/^(?=## )/m).filter(Boolean);
  const midPoint = Math.ceil(sections.length / 2);
  const firstHalf = sections.slice(0, midPoint).join('');
  const secondHalf = sections.slice(midPoint).join('');

  const mdComponents = makeMdComponents(displayTitle);

  return (
    <div className="sd-page">
      <PageMeta title={service.title} description={service.summary ?? ''} path={`/services/${service.id}`} />

      {/* ── Hero ── */}
      <section
        className="sd-hero"
        style={service.image ? {
          backgroundImage: `linear-gradient(to right, rgba(17,31,54,0.95) 55%, rgba(17,31,54,0.6) 100%), url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : undefined}
      >
        <div className="container">
          <AnimatedSection>
            <Link to="/services" className="sd-breadcrumb">← All Services</Link>
            <h1 className="sd-title">{displayTitle}</h1>
            {service.summary && <p className="sd-summary">{service.summary}</p>}
            <div className="sd-hero-cta">
              <Button href={INTAKE_FORM_URL} size="lg">Get a Free Claim Review</Button>
              <a href="tel:" className="sd-hero-phone">Or call us directly →</a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <StatsStrip />

      {/* ── Body content ── */}
      <section className="sd-body">
        <div className="container sd-content">
          <AnimatedSection>
            <ReactMarkdown components={mdComponents}>{firstHalf}</ReactMarkdown>
          </AnimatedSection>

          {/* Mid-page CTA */}
          {secondHalf && (
            <>
              <MidCTA />
              <AnimatedSection>
                <ReactMarkdown components={mdComponents}>{secondHalf}</ReactMarkdown>
              </AnimatedSection>
            </>
          )}

          {/* FAQ accordion */}
          <AnimatedSection>
            <FAQBlock heading={faqHeading} items={faqs} />
          </AnimatedSection>

          {after && (
            <AnimatedSection>
              <ReactMarkdown components={mdComponents}>{after}</ReactMarkdown>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="sd-bottom-cta">
        <div className="container">
          <AnimatedSection>
            <h2>Ready to fight for your full settlement?</h2>
            <p>We only get paid when you get paid. Free review, no obligation.</p>
            <Button href={INTAKE_FORM_URL} size="lg">Get a Free Claim Review</Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Related services ── */}
      {otherServices.length > 0 && (
        <section className="sd-related">
          <div className="container">
            <AnimatedSection>
              <h2 className="sd-related-heading">Other services we handle</h2>
              <div className="sd-related-grid">
                {otherServices.map((s, i) => (
                  <ServiceCard key={s.id} service={s} delay={i * 0.1} variant="card" />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ── Sticky mobile CTA ── */}
      <div className="sd-sticky-cta">
        <Button href={INTAKE_FORM_URL} size="lg" fullWidth>Get a Free Claim Review</Button>
      </div>
    </div>
  );
}
