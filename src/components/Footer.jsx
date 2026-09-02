import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer glass-panel">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand-logo">
              <img src="/logo.png" alt="Vin Robotik" style={{ height: '60px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }} />
            </Link>
            <p className="footer-desc">
              {t('footer.desc')}
            </p>
          </div>
          
          <div className="footer-links">
            <h3>{t('footer.navTitle')}</h3>
            <ul>
              <li><Link to="/">{t('footer.navHome')}</Link></li>
              <li><Link to="/about">{t('footer.navAbout')}</Link></li>
              <li><Link to="/products">{t('footer.navProducts')}</Link></li>
              <li><Link to="/services">{t('footer.navServices')}</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>{t('footer.legalTitle')}</h3>
            <ul>
              <li><Link to="/privacy">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms">{t('footer.terms')}</Link></li>
              <li><Link to="#">{t('footer.iso')}</Link></li>
              <li><Link to="#">{t('footer.sitemap')}</Link></li>
            </ul>
            
            <div className="trust-badges" style={{marginTop: '2rem', display: 'flex', gap: '0.5rem'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.7rem', border: '1px solid rgba(255,255,255,0.1)'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> ISO 9001
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.7rem', border: '1px solid rgba(255,255,255,0.1)'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> CE Certified
              </div>
            </div>
          </div>

          <div className="footer-contact">
            <h3>{t('footer.contactTitle')}</h3>
            <p>{t('footer.hotline')}<br/><strong>+62 857-9798-2538</strong></p>
            <p>{t('footer.email')}<br/><strong>VinRobotik@perusahaan.com</strong></p>
            <div className="social-links">
              <a href="https://www.facebook.com/share/1Jg93vMeyH/" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/zakiaabdillah_/" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="tiktok.com/@vinzkie_saja" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@zakiaabdillah138" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>{t('footer.rights')}</p>
          <div className="server-status">
            <span className="status-dot"></span>
            <span className="status-text">{t('footer.status') || "All Systems Operational"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
