import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
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

// Split body markdown into: content before FAQ section, FAQ items, content after FAQ
function parseBodyWithFAQ(body: string) {
  const faqMatch = body.match(/^(#{1,2}\s+.*(faq|frequently asked).*)$/im);
  if (!faqMatch || faqMatch.index === undefined) {
    return { before: body, faqs: [], faqHeading: '', after: '' };
  }

  const before = body.slice(0, faqMatch.index).trim();
  const faqAndAfter = body.slice(faqMatch.index);

  // FAQ heading is the matched line
  const firstNewline = faqAndAfter.indexOf('\n');
  const faqHeading = faqAndAfter.slice(0, firstNewline).replace(/^#{1,2}\s+/, '').trim();
  const faqContent = faqAndAfter.slice(firstNewline + 1);

  // Find where FAQ ends (next h2 that isn't an h3)
  const nextH2 = faqContent.match(/^##\s+/m);
  const faqBody = nextH2?.index !== undefined
    ? faqContent.slice(0, nextH2.index)
    : faqContent;
  const after = nextH2?.index !== undefined
    ? faqContent.slice(nextH2.index)
    : '';

  // Parse ### Question\nAnswer pairs
  const faqs: Array<{ question: string; answer: string }> = [];
  const qaRegex = /###\s+(.+)\n([\s\S]+?)(?=###|$)/g;
  let m;
  while ((m = qaRegex.exec(faqBody)) !== null) {
    faqs.push({
      question: m[1].trim(),
      answer: m[2].trim().replace(/\n+/g, ' '),
    });
  }

  return { before, faqs, faqHeading, after };
}

// Simple inline accordion (no Sheet dependency)
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
              <button
                className="sd-faq-trigger"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <motion.span
                  className="sd-faq-icon"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="sd-faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
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

const mdComponents = {
  h1: ({ children }: any) => <h1 className="sd-md-h1">{children}</h1>,
  h2: ({ children }: any) => <h2 className="sd-md-h2">{children}</h2>,
  h3: ({ children }: any) => <h3 className="sd-md-h3">{children}</h3>,
  p:  ({ children }: any) => <p  className="sd-md-p">{children}</p>,
  ul: ({ children }: any) => <ul className="sd-md-ul">{children}</ul>,
  ol: ({ children }: any) => <ol className="sd-md-ol">{children}</ol>,
  li: ({ children }: any) => <li className="sd-md-li">{children}</li>,
  a:  ({ href, children }: any) => <a href={href} className="sd-md-a">{children}</a>,
  hr: () => <hr className="sd-md-hr" />,
  strong: ({ children }: any) => <strong className="sd-md-strong">{children}</strong>,
  blockquote: ({ children }: any) => <blockquote className="sd-md-blockquote">{children}</blockquote>,
};

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
  const { before, faqs, faqHeading, after } = parseBodyWithFAQ(service.body || '');

  return (
    <div className="sd-page">
      <PageMeta
        title={service.title}
        description={service.summary ?? ''}
        path={`/services/${service.id}`}
      />

      {/* Hero */}
      <section
        className="sd-hero"
        style={service.image ? {
          backgroundImage: `linear-gradient(to right, rgba(17,31,54,0.92) 55%, rgba(17,31,54,0.5) 100%), url(${service.image})`,
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
              <Button to="/contact" size="lg">Get a Free Claim Review</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Body content */}
      <section className="sd-body">
        <div className="container sd-content">
          <AnimatedSection>
            {/* Content before FAQ */}
            <ReactMarkdown components={mdComponents}>{before}</ReactMarkdown>

            {/* FAQ accordion */}
            <FAQBlock heading={faqHeading} items={faqs} />

            {/* Content after FAQ (final CTA etc.) */}
            {after && <ReactMarkdown components={mdComponents}>{after}</ReactMarkdown>}
          </AnimatedSection>

          {/* Inline CTA */}
          <AnimatedSection delay={0.2}>
            <div className="sd-inline-cta">
              <p>Ready to get started? Claim reviews are free — no obligation.</p>
              <Button to="/contact" variant="primary">Get a Free Claim Review</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Other services */}
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
    </div>
  );
}
