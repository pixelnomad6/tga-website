import { Link } from 'react-router-dom';
import type { MetaItem } from '../content/types';
import { INTAKE_FORM_URL } from '../lib/config';
import './Footer.css';

interface Props {
  meta: MetaItem[];
}

function getMeta(meta: MetaItem[], key: string) {
  return meta.find(m => m.setting_key === key)?.setting_value ?? '';
}

export default function Footer({ meta }: Props) {
  const phone    = getMeta(meta, 'phone');
  const email    = getMeta(meta, 'email');
  const address  = getMeta(meta, 'address');
  const license  = getMeta(meta, 'license_number');

  return (
    <footer className="footer">
      <div className="container footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-trust">TRUST GUARD</span>
            <span className="footer-logo-sub">ADJUSTERS</span>
          </Link>
          <p className="footer-tagline">Your claim, our fight.</p>
          <p className="footer-license">{license}</p>
        </div>

        {/* Pages */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Navigate</h4>
          <nav>
            <Link to="/"          className="footer-link">Home</Link>
            <Link to="/services"  className="footer-link">Services</Link>
            <Link to="/process"   className="footer-link">How It Works</Link>
            <Link to="/about"     className="footer-link">About</Link>
            <Link to="/blog"      className="footer-link">Resources</Link>
            <Link to="/contact"   className="footer-link">Contact</Link>
          </nav>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Claims We Handle</h4>
          <nav>
            <Link to="/services" className="footer-link">Wind &amp; Hurricane</Link>
            <Link to="/services" className="footer-link">Water &amp; Flood</Link>
            <Link to="/services" className="footer-link">Fire &amp; Smoke</Link>
            <Link to="/services" className="footer-link">Roof Damage</Link>
            <Link to="/services" className="footer-link">Hail Damage</Link>
            <Link to="/services" className="footer-link">Mold &amp; Secondary</Link>
          </nav>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Contact</h4>
          {phone  && <a href={`tel:${phone}`}   className="footer-link">{phone}</a>}
          {email  && <a href={`mailto:${email}`} className="footer-link">{email}</a>}
          {address && <span className="footer-link">{address}</span>}
          <a href={INTAKE_FORM_URL} className="footer-cta" target="_blank" rel="noopener noreferrer">Free Claim Review</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Trust Guard Adjusters. All rights reserved.</p>
          <p>We are not affiliated with any insurance company.</p>
        </div>
      </div>
    </footer>
  );
}
