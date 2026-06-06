import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import AnimatedCounter from '../components/AnimatedCounter';
import ServiceCard from '../components/ServiceCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import type { MetaItem, Service, Testimonial } from '../content/types';
import _metaData from '../content/meta.json';
import _servicesData from '../content/services.json';
import _testimonialsData from '../content/testimonials.json';
const metaData         = _metaData         as unknown as MetaItem[];
const servicesData     = _servicesData     as Service[];
const testimonialsData = _testimonialsData as Testimonial[];
import './Home.css';

function getMeta(key: string) {
  return metaData.find(m => m.setting_key === key)?.setting_value ?? '';
}

const steps = [
  { num: '01', title: 'Free Claim Review',    body: 'We review your policy, your denial or settlement offer, and your damage documentation — at no cost, no obligation.' },
  { num: '02', title: 'Forensic Inspection',  body: 'We conduct a thorough, independent inspection of your property — documenting everything the insurance adjuster missed.' },
  { num: '03', title: 'We Fight. You Collect.', body: "We negotiate directly with your carrier and don't stop until you receive every dollar your policy entitles you to." },
];

const whyCards = [
  { title: 'Michigan Licensed & Regulated', body: "We're licensed by the Michigan Department of Insurance and Financial Services (DIFS). You can verify our credentials. No surprises." },
  { title: 'Local Michigan Team',           body: "We know Michigan weather, Michigan properties, and Michigan insurers. We're your neighbors — not a call center thousands of miles away." },
  { title: 'No Fee Unless You Win',         body: "Our fee is a percentage of what we recover for you. If we don't increase your settlement, you owe us nothing. Zero risk to you." },
  { title: 'You Stay in Control',           body: "You always have the final say. We keep you informed, we never make decisions without you, and we move at a pace you're comfortable with." },
];

export default function Home() {
  const allTestimonials = testimonialsData;
  const featuredTestimonial = allTestimonials[0] ?? null;
  const services = [...servicesData]
    .sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
    .slice(0, 3);

  return (
    <div className="home">
      <PageMeta path="/" />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-eyebrow">{getMeta('tagline') || 'Your claim, our fight.'}</span>
            <h1 className="hero-heading">
              Your claim.<br />
              <em>Our guidance.</em>
            </h1>
            <p className="hero-sub">
              Property damage is overwhelming. We walk with you through every step of the
              insurance process, so nothing gets missed and nothing gets left on the table.
            </p>
            <div className="hero-actions">
              <Button to="/contact" size="lg">Get a Free Claim Review</Button>
              <Button to="/process" variant="outline" size="lg">See How It Works</Button>
            </div>
            <div className="hero-badges">
              <span className="hero-badge">✓ Licensed in Michigan</span>
              <span className="hero-badge">✓ No fee unless we recover more</span>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="container hero-stats-inner">
            {[1, 2, 3, 4].map(i => {
              const val   = getMeta(`stat_${i}_number`);
              const label = getMeta(`stat_${i}_label`);
              if (!val) return null;
              return (
                <div key={i} className="hero-stat">
                  <span className="hero-stat-number"><AnimatedCounter value={val} /></span>
                  <span className="hero-stat-label">{label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ── Why Trust Guard — 4 clean cards ── */}
      <section className="section value-prop">
        <div className="container">
          <SectionHeading
            eyebrow="Why Trust Guard"
            heading="What makes working with us different"
          />
          <div className="value-grid-4">
            {whyCards.map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.1}>
                <div className="value-card-clean">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof — testimonial + stat ── */}
      {featuredTestimonial && (
        <section className="section social-proof">
          <div className="container">
            <div className="sp-grid">
              {/* Left col */}
              <AnimatedSection>
                <div className="sp-left">
                  <span className="sp-eyebrow">You're not alone in this</span>
                  <h2 className="sp-heading">
                    Most homeowners feel overwhelmed after a claim. That's completely normal.
                  </h2>
                  <p className="sp-body">
                    The insurance process is designed by companies, for companies. The language
                    is dense. The process is slow. And the person the insurance company sends to
                    assess your damage? They work for the insurer — not for you.
                  </p>
                  <p className="sp-body">
                    That's where we come in. We're on your side of the table. We speak the
                    language, know the process, and make sure you don't leave money on the table
                    simply because the paperwork was confusing.
                  </p>
                  <Button to="/contact" size="lg">Get a Free Claim Review Today</Button>
                </div>
              </AnimatedSection>

              {/* Right col — testimonial + stat */}
              <AnimatedSection delay={0.15}>
                <div className="sp-right">
                  <div className="sp-testimonial-card">
                    <span className="sp-card-eyebrow">What our clients say</span>
                    <blockquote className="sp-quote">"{featuredTestimonial.quote}"</blockquote>
                    <div className="sp-attribution">
                      <strong>{featuredTestimonial.name}</strong>
                      <span>{featuredTestimonial.location} · {featuredTestimonial.claim_type}</span>
                    </div>
                  </div>
                  <div className="sp-stat-card">
                    <div className="sp-stat-number">
                      <AnimatedCounter value={getMeta('stat_1_number') || '$22,266'} />
                    </div>
                    <p className="sp-stat-context">{getMeta('stat_1_label') || 'Average payout with a public adjuster'}</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* ── How it works ── */}
      <section className="section how-it-works">
        <div className="container">
          <SectionHeading eyebrow="The Process" heading="Three steps from loss to fair settlement" light />
          <div className="steps-grid">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 0.15}>
                <div className="step-card">
                  <span className="step-num">{step.num}</span>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-body">{step.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="how-cta">
            <Button to="/process" variant="outline" size="lg">See the Full Process</Button>
          </div>
        </div>
      </section>

      {/* ── Services preview ── */}
      {services.length > 0 && (
        <section className="section services-preview">
          <div className="container">
            <SectionHeading eyebrow="What We Handle" heading="Every type of property claim" sub="If your home was damaged and your insurer isn't paying what you're owed, we can help." />
            <div className="services-grid">
              {services.map((svc, i) => (
                <ServiceCard key={svc.id} service={svc} delay={i * 0.1} variant="card" />
              ))}
            </div>
            <div className="services-cta">
              <Button to="/services" variant="secondary" size="lg">View All Services</Button>
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials scroll ── */}
      {allTestimonials.length > 1 && (
        <section className="section testimonials">
          <div className="container">
            <SectionHeading eyebrow="Results" heading="Real clients. Real recoveries." light />
            <TestimonialCarousel items={allTestimonials} />
          </div>
        </section>
      )}

      {/* ── CTA banner — two-column split ── */}
      <section className="cta-banner">
        <div className="container cta-banner-split">
          <AnimatedSection>
            <div className="cta-split-left">
              <span className="cta-split-eyebrow">Ready to get started?</span>
              <h2 className="cta-banner-heading">Don't navigate your claim alone.</h2>
              <p className="cta-banner-sub">
                Tell us what happened. We'll listen, review your situation honestly, and tell
                you exactly how we can help — or point you in the right direction if we can't.
                That first conversation is always free.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="cta-split-right">
              <Button to="/contact" size="lg">Get a Free Claim Review Today</Button>
              <Button to="/process" variant="outline" size="lg">See How It Works</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
