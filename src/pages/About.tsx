import { INTAKE_FORM_URL } from '../lib/config';
import PageMeta from '../components/PageMeta';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import FAQAccordion from '../components/FAQAccordion';
import type { TeamMember, FaqItem } from '../content/types';
import _teamData from '../content/team.json';
import _faqData from '../content/faq.json';
const teamData = _teamData as TeamMember[];
const faqData  = _faqData  as FaqItem[];
import './About.css';

const values = [
  {
    title: 'We only work for you',
    body: 'We are never hired by, affiliated with, or compensated by any insurance company. Our only client is the policyholder.',
  },
  {
    title: 'We take what we can personally handle',
    body: 'We deliberately limit our caseload. Every client gets direct access to a licensed adjuster — not a call center, not a case number.',
  },
  {
    title: 'We\'re honest about what we find',
    body: 'If the initial settlement was fair, we\'ll tell you. We don\'t manufacture disputes. But if you\'re owed more, we don\'t stop until you have it.',
  },
  {
    title: 'We never promise a specific number',
    body: 'Not before we\'ve seen your property, your policy, and your carrier\'s position. Anyone who guarantees a number before doing the work isn\'t working for you.',
  },
];

export default function About() {
  return (
    <div className="about-page">
      <PageMeta
        title="About Us"
        description="Trust Guard Adjusters was founded by someone who watched his own family's claim get lowballed. We know what it feels like — and we fight back."
        path="/about"
      />

      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <span className="page-eyebrow">About Trust Guard</span>
            <h1 className="page-title">We started because we were you.</h1>
            <p className="page-sub">
              Trust Guard Adjusters was founded by someone who watched his own family's claim
              get lowballed after a hurricane. We know what it feels like to be on the wrong
              side of the negotiation table. That's exactly why we do this.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="section about-mission">
        <div className="container about-mission-inner">
          <AnimatedSection className="about-mission-text">
            <span className="about-label">Our Mission</span>
            <h2>Every homeowner deserves the same expertise their insurer has.</h2>
            <p>
              Insurance companies have teams of adjusters, engineers, attorneys, and analysts
              working every claim. The average homeowner has none of that. We exist to close
              that gap — giving every client the representation, documentation, and negotiating
              force that levels the playing field.
            </p>
            <p>
              We operate on contingency because we believe access to expert advocacy shouldn't
              depend on your ability to pay upfront. You only pay when we recover more for you.
            </p>
          </AnimatedSection>
          <AnimatedSection className="about-mission-quote" direction="left">
            <blockquote>
              "After disaster strikes your home, insurance companies lowball you — we get you
              every dollar rightfully yours."
            </blockquote>
            <cite>— Trust Guard Adjusters</cite>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values">
        <div className="container">
          <SectionHeading
            eyebrow="How We Work"
            heading="What we promise — and what we don't."
            sub="Our brand never list is as important as our mission statement."
            light
          />
          <div className="values-grid">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="value-item">
                  <span className="value-check">✓</span>
                  <div>
                    <h3>{v.title}</h3>
                    <p>{v.body}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {teamData.length > 0 && (
        <section className="section about-team">
          <div className="container">
            <SectionHeading
              eyebrow="The Team"
              heading="The people behind your claim"
            />
            <div className="team-grid">
              {teamData.map((member, i) => (
                <AnimatedSection key={member.id} delay={i * 0.1}>
                  <div className="team-card">
                    <div className="team-avatar">
                      {member.image
                        ? <img src={member.image} alt={member.name} />
                        : <div className="team-avatar-placeholder">{member.name.charAt(0)}</div>
                      }
                    </div>
                    <div className="team-info">
                      <h3 className="team-name">{member.name}</h3>
                      <span className="team-title">{member.title}</span>
                      <p className="team-bio">{member.bio}</p>
                      <span className="team-license">{member.license_no}</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqData.length > 0 && (
        <section className="section about-faq">
          <div className="container">
            <SectionHeading
              eyebrow="Common Questions"
              heading="Everything you're wondering about."
            />
            <FAQAccordion items={faqData} />
          </div>
        </section>
      )}

      {/* Credibility */}
      <section className="section about-cred">
        <div className="container about-cred-inner">
          <AnimatedSection>
            <h2>Licensed. Accountable. On your side.</h2>
            <p>
              Public adjusters in Florida are licensed and regulated by the Florida Department
              of Financial Services. We carry all required licensing, maintain errors &amp; omissions
              insurance, and operate under the strict ethical guidelines of the public adjuster
              profession. You can verify our license at any time through the Florida DFS website.
            </p>
            <Button href={INTAKE_FORM_URL} size="lg" style={{ marginTop: 'var(--space-8)' }}>
              Work With Us
            </Button>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
