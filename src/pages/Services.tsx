import PageMeta from '../components/PageMeta';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import ServiceCard from '../components/ServiceCard';
import AnimatedSection from '../components/AnimatedSection';
import type { Service } from '../content/types';
import _servicesData from '../content/services.json';
const servicesData = _servicesData as Service[];
import './Services.css';

export default function Services() {
  const services = [...servicesData].sort((a, b) => Number(a.sort_order) - Number(b.sort_order));

  return (
    <div className="services-page">
      <PageMeta
        title="Our Services"
        description="Wind, water, fire, roof, hail, mold — we handle every major property claim type in Florida. No fee unless we recover more."
        path="/services"
      />

      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <span className="page-eyebrow">What We Handle</span>
            <h1 className="page-title">Every claim type. One team. Zero compromises.</h1>
            <p className="page-sub">
              Michigan homeowners deserve a fair settlement. We specialize in every major claim type
              — and we know exactly how carriers try to minimize each one.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-full-grid">
            {services.map((svc, i) => (
              <ServiceCard key={svc.id} service={svc} delay={i * 0.08} variant="row" />
            ))}
          </div>
        </div>
      </section>

      <section className="section services-bottom-cta">
        <div className="container">
          <SectionHeading
            eyebrow="Ready to fight back?"
            heading="Not sure if your claim qualifies? Call us anyway."
            sub="A free review costs you nothing. We'll tell you honestly whether we can help — and if we can't, we'll point you in the right direction."
            light
          />
          <div style={{ textAlign: 'center' }}>
            <Button to="/contact" size="lg">Get a Free Claim Review</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
