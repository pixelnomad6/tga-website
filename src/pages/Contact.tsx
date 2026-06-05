import { useState } from 'react';
import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import type { MetaItem } from '../content/types';
import _metaData from '../content/meta.json';
const metaData = _metaData as unknown as MetaItem[];
import './Contact.css';

function getMeta(key: string) {
  return metaData.find(m => m.setting_key === key)?.setting_value ?? '';
}

const claimTypes = [
  'Wind / Hurricane Damage',
  'Water / Flood Damage',
  'Fire / Smoke Damage',
  'Roof Damage',
  'Hail Damage',
  'Mold / Secondary Damage',
  'Denied Claim',
  'Underpaid Claim',
  'Other',
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', claimType: '', message: '',
  });
  const [state, setState] = useState<FormState>('idle');
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('submitting');
    // TODO: wire to Netlify Forms or a backend endpoint
    await new Promise(r => setTimeout(r, 1200));
    setState('success');
  }

  const phone = getMeta('phone');
  const email = getMeta('email');

  return (
    <div className="contact-page">
      <PageMeta
        title="Free Claim Review"
        description="Get a free, no-obligation review of your insurance claim. Trust Guard Adjusters fights for Florida homeowners — no fee unless we recover more."
        path="/contact"
      />

      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <span className="page-eyebrow">Contact</span>
            <h1 className="page-title">Let's talk about your claim.</h1>
            <p className="page-sub">
              Free review. No commitment. No fee unless we recover more for you.
              Fill out the form and we'll be in touch the same business day.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section contact-body">
        <div className="container contact-layout">

          {/* Form */}
          <AnimatedSection className="contact-form-wrap">
            {state === 'success' ? (
              <motion.div
                className="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="success-icon">✓</div>
                <h2>We've got your message.</h2>
                <p>Someone from Trust Guard will reach out to you within one business day. In the meantime, if your situation is urgent, call us directly.</p>
                {phone && <a href={`tel:${phone}`} className="contact-phone-link">{phone}</a>}
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} name="contact" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                <h2 className="form-heading">Tell us about your claim</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name" name="name" type="text" required
                      placeholder="Jane Smith"
                      value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone" name="phone" type="tel" required
                      placeholder="(407) 555-0000"
                      value={form.phone} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email" name="email" type="email" required
                    placeholder="jane@example.com"
                    value={form.email} onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="claimType">Type of Claim</label>
                  <select id="claimType" name="claimType" value={form.claimType} onChange={handleChange}>
                    <option value="">Select claim type…</option>
                    {claimTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tell us what happened</label>
                  <textarea
                    id="message" name="message" rows={5}
                    placeholder="Brief description of the damage, when it occurred, and where you are in the claims process…"
                    value={form.message} onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={state === 'submitting'}
                >
                  {state === 'submitting' ? 'Sending…' : 'Request My Free Review'}
                </Button>

                <p className="form-disclaimer">
                  By submitting this form you agree to be contacted by Trust Guard Adjusters.
                  We do not sell or share your information.
                </p>
              </form>
            )}
          </AnimatedSection>

          {/* Info sidebar */}
          <AnimatedSection className="contact-info" delay={0.15} direction="left">
            <div className="contact-info-card">
              <h3>Prefer to call?</h3>
              {phone && <a href={`tel:${phone}`} className="contact-phone">{phone}</a>}
              <p>Available Monday–Saturday, 8am–6pm ET. Emergency situations — call anytime.</p>
            </div>

            <div className="contact-info-card">
              <h3>Email us</h3>
              {email && <a href={`mailto:${email}`} className="contact-email">{email}</a>}
              <p>We respond to every email within one business day.</p>
            </div>

            <div className="contact-info-card contact-promise">
              <h3>Our promise to you</h3>
              <ul>
                <li>✓ Free initial review, no strings</li>
                <li>✓ No fee unless we recover more</li>
                <li>✓ Direct access to a licensed adjuster</li>
                <li>✓ We never hand you off to junior staff</li>
                <li>✓ We never promise a number before inspection</li>
              </ul>
            </div>
          </AnimatedSection>

        </div>
      </section>

    </div>
  );
}
