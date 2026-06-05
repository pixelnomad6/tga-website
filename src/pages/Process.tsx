import PageMeta from '../components/PageMeta';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import './Process.css';

const steps = [
  {
    num: '01',
    title: 'Free Claim Review',
    duration: 'Same day',
    body: 'You call us or submit a contact form. We review your current claim status, your policy, and any settlement offer or denial you\'ve received — completely free, no obligation. If we don\'t think we can recover more for you, we\'ll tell you that too.',
    callout: 'No upfront cost. No commitment. Just answers.',
  },
  {
    num: '02',
    title: 'Independent Property Inspection',
    duration: '1–3 days',
    body: 'We schedule an in-depth, on-site inspection of your property. While the insurance company\'s adjuster spent 20 minutes on your roof, we spend hours documenting every point of damage with photos, measurements, moisture readings, and industry-standard estimating tools.',
    callout: 'We find what they missed.',
  },
  {
    num: '03',
    title: 'Policy Analysis & Scope of Loss',
    duration: '3–7 days',
    body: 'We review your policy line by line to identify every applicable coverage. We build a comprehensive scope of loss document that captures the true cost to restore your property — not a number designed to protect your carrier\'s bottom line.',
    callout: 'Your policy was written to cover this. We prove it.',
  },
  {
    num: '04',
    title: 'Negotiation with Your Carrier',
    duration: '2–8 weeks',
    body: 'We submit our scope directly to your insurance company and handle all communication on your behalf. We know the claims process, the carrier protocols, and the leverage points. You don\'t have to argue — we do that for you.',
    callout: 'You stop dealing with the insurance company. We start.',
  },
  {
    num: '05',
    title: 'Settlement & Resolution',
    duration: 'Ongoing if needed',
    body: 'Most claims resolve through negotiation. When carriers resist, we escalate through appraisal, mediation, or work with legal counsel on bad-faith remedies. We don\'t stop at the first "no." We don\'t stop until the number is right.',
    callout: 'We don\'t close the file until you\'re paid.',
  },
];

const faqs = [
  {
    q: 'When is the best time to hire a public adjuster?',
    a: 'Immediately after a loss, before you file — or any time before you sign a final release. The earlier, the better. But it\'s rarely too late.',
  },
  {
    q: 'Do I have to let the insurance company back on my property?',
    a: 'Your policy requires you to cooperate with their inspection, but you have the right to have your own representative present. That\'s us.',
  },
  {
    q: 'What if my claim has already been paid?',
    a: 'If it\'s been paid but you believe the amount was wrong, we can re-open the claim and supplement it — in Florida, typically within 3–5 years of the loss.',
  },
];

export default function Process() {
  return (
    <div className="process-page">
      <PageMeta
        title="How It Works"
        description="Five steps from your first call to a fair settlement. No upfront cost, no fine print — here's exactly how Trust Guard Adjusters works."
        path="/process"
      />

      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <span className="page-eyebrow">The Process</span>
            <h1 className="page-title">What happens after you call us.</h1>
            <p className="page-sub">
              No vague promises. No fine print. Here's exactly how we work — step by step,
              from your first call to your final settlement.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div className="process-steps">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 0.1} className="process-step">
                <div className="process-step-num">{step.num}</div>
                <div className="process-step-content">
                  <div className="process-step-meta">
                    <h2 className="process-step-title">{step.title}</h2>
                    <span className="process-step-duration">{step.duration}</span>
                  </div>
                  <p className="process-step-body">{step.body}</p>
                  <p className="process-step-callout">{step.callout}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section process-faq">
        <div className="container">
          <SectionHeading
            eyebrow="Quick Answers"
            heading="Common questions about the process"
            light
          />
          <div className="process-faq-list">
            {faqs.map(faq => (
              <AnimatedSection key={faq.q} className="process-faq-item">
                <h3 className="process-faq-q">{faq.q}</h3>
                <p className="process-faq-a">{faq.a}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--color-gold)', textAlign: 'center' }}>
        <div className="container">
          <AnimatedSection>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-navy-dark)', marginBottom: 'var(--space-4)' }}>
              Ready to start?
            </h2>
            <p style={{ color: 'rgba(17,31,52,0.75)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)', maxWidth: 480, marginInline: 'auto' }}>
              Step one costs you nothing. Call us or submit your information below.
            </p>
            <Button to="/contact" variant="secondary" size="lg">Get My Free Review</Button>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
