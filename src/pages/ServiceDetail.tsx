import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import PageMeta from '../components/PageMeta';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';
import type { Service } from '../content/types';
import _servicesData from '../content/services.json';
import './ServiceDetail.css';

const servicesData = _servicesData as unknown as Service[];

// Same derivation as ServiceCard — short_title from Sheet, or strip SEO suffix from full title
function getDisplayTitle(s: Service) {
  return s.short_title
    || s.title.split(' Public Adjuster')[0].split(':')[0].trim();
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

  return (
    <div className="sd-page">
      {/* Full SEO title in <title> tag, clean display title on page */}
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
            {service.summary && (
              <p className="sd-summary">{service.summary}</p>
            )}
            <div className="sd-hero-cta">
              <Button to="/contact" size="lg">Get a Free Claim Review</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Body content — rendered from Markdown */}
      <section className="sd-body">
        <div className="container sd-content">
          <AnimatedSection>
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="sd-md-h1">{children}</h1>,
                h2: ({ children }) => <h2 className="sd-md-h2">{children}</h2>,
                h3: ({ children }) => <h3 className="sd-md-h3">{children}</h3>,
                p:  ({ children }) => <p  className="sd-md-p">{children}</p>,
                ul: ({ children }) => <ul className="sd-md-ul">{children}</ul>,
                ol: ({ children }) => <ol className="sd-md-ol">{children}</ol>,
                li: ({ children }) => <li className="sd-md-li">{children}</li>,
                a:  ({ href, children }) => (
                  <a href={href} className="sd-md-a">{children}</a>
                ),
                hr: () => <hr className="sd-md-hr" />,
                strong: ({ children }) => <strong className="sd-md-strong">{children}</strong>,
                blockquote: ({ children }) => (
                  <blockquote className="sd-md-blockquote">{children}</blockquote>
                ),
              }}
            >
              {service.body || ''}
            </ReactMarkdown>
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
                {otherServices.map(s => (
                  <Link key={s.id} to={`/services/${s.id}`} className="sd-related-card">
                    <strong>{getDisplayTitle(s)}</strong>
                    <span>{s.summary}</span>
                    <span className="sd-related-arrow">→</span>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}
    </div>
  );
}
