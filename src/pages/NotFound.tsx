import Button from '../components/Button';
import PageMeta from '../components/PageMeta';

export default function NotFound() {
  return (
    <>
    <PageMeta title="Page Not Found" />
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'var(--space-12)',
      gap: 'var(--space-6)',
    }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(5rem, 15vw, 10rem)',
        fontWeight: 700,
        color: 'var(--color-gold)',
        lineHeight: 1,
        opacity: 0.4,
      }}>404</span>
      <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy)' }}>
        Page not found
      </h1>
      <p style={{ color: 'var(--color-slate)', maxWidth: 420, lineHeight: 1.7 }}>
        The page you're looking for doesn't exist. If you were trying to reach us about a claim, we're one click away.
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button to="/">Go Home</Button>
        <Button to="/contact" variant="outline">Contact Us</Button>
      </div>
    </div>
    </>
  );
}
