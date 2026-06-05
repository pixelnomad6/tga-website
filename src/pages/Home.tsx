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
  {
    num: '01',
    title: 'Free Claim Review',
    body: 'We review your policy, your denial or settlement offer, and your damage documentation — at no cost, no obligation.',
  },
  {
    num: '02',
    title: 'Forensic Inspection',
    body: 'We conduct a thorough, independent inspection of your property — documenting everything the insurance adjuster missed.',
  },
  {
    num: '03',
    title: 'We Fight. You Collect.',
    body: "We negotiate directly with your carrier and don't stop until you receive every dollar your policy entitles you to.",
  },
];

export default function Home() {
  const allTestimonials = testimonialsData;
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
              Your insurance company<br />
              <em>owes you more.</em>
            </h1>
            <p className="hero-sub">
              We've been there too. Now we stand with you — one homeowner,
              one claim, one fair outcome at a time.
            </p>
            <div className="hero-actions">
              <Button to="/contact" size="lg">Get a Free Claim Review</Button>
              <Button to="/process" variant="outline" size="lg">See How It Works</Button>
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
                  <span className="hero-stat-number">
                    <AnimatedCounter value={val} />
                  </span>
                  <span className="hero-stat-label">{label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ── Value prop ── */}
      <section className="section value-prop">
        <div className="container">
          <SectionHeading
            eyebrow="Why Trust Guard"
            heading="They have an adjuster. Now you do too."
            sub="Your insurance company sends a trained professional whose job is to minimize your payout. We send ours to maximize it."
          />
          <div className="value-grid">
            {[
              { icon: '⚖️', title: 'Licensed Representation', body: 'We are licensed public adjusters in the state of Florida. We know your policy, your rights, and the tactics carriers use to underpay.' },
              { icon: '🔍', title: 'Forensic Documentation', body: 'We inspect your property with the same rigor your carrier should have used the first time — and find what they missed.' },
              { icon: '💪', title: 'No Fee Unless We Win', body: "We work on contingency. Our fee comes from your recovered settlement — so we're motivated to fight for every dollar." },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.1}>
                <div className="value-card">
                  <div className="value-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section how-it-works">
        <div className="container">
          <SectionHeading
            eyebrow="The Process"
            heading="Three steps from loss to fair settlement"
            light
          />
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
            <SectionHeading
              eyebrow="What We Handle"
              heading="Every type of property claim"
              sub="If your home was damaged and your insurer isn't paying what you're owed, we can help."
            />
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

      {/* ── Testimonials ── */}
      {allTestimonials.length > 0 && (
        <section className="section testimonials">
          <div className="container">
            <SectionHeading
              eyebrow="Results"
              heading="Real clients. Real recoveries."
              light
            />
            <TestimonialCarousel items={allTestimonials} />
          </div>
        </section>
      )}

      {/* ── CTA banner ── */}
      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <AnimatedSection>
            <h2 className="cta-banner-heading">
              Don't settle for their number.<br />Let's find yours.
            </h2>
            <p className="cta-banner-sub">
              Free review. No obligation. No fee unless we recover more for you.
            </p>
            <Button to="/contact" size="lg">Start Your Free Review</Button>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
