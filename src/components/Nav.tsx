import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Nav.css';

const links = [
  { to: '/',            label: 'Home'         },
  { to: '/services',   label: 'Services'     },
  { to: '/process',    label: 'How It Works' },
  { to: '/about',      label: 'About'        },
  { to: '/blog',       label: 'Resources'    },
];

export default function Nav() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`nav-header ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
          <span className="nav-logo-trust">TRUST GUARD</span>
          <span className="nav-logo-sub">ADJUSTERS</span>
        </Link>

        {/* Desktop links */}
        <nav className="nav-links" aria-label="Main navigation">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link to="/contact" className="nav-cta">Free Claim Review</Link>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${open ? 'nav-hamburger-open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <nav className="nav-mobile-links" aria-label="Mobile navigation">
              {links.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) => `nav-mobile-link ${isActive ? 'nav-mobile-link-active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/contact" className="nav-mobile-cta" onClick={() => setOpen(false)}>
                Free Claim Review
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
