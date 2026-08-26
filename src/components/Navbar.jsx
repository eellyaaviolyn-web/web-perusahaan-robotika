import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

// Create a motion-enabled Link component for click animations
const MotionLink = motion.create ? motion.create(Link) : motion(Link);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // On inner pages, always act as if scrolled to maintain a solid white background
  const isSolid = scrolled || !isHomePage;

  return (
    <nav className={`navbar ${isSolid ? 'scrolled' : ''}`}>
      <div className="nav-container container">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <img src="/logo.png" alt="Vin Robotik" className="nav-logo" />
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <MotionLink whileTap={{ scale: 0.9 }} to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>{t('nav.home')}</MotionLink>
          <MotionLink whileTap={{ scale: 0.9 }} to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>{t('nav.about')}</MotionLink>
          <MotionLink whileTap={{ scale: 0.9 }} to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`} onClick={closeMenu}>{t('nav.collection')}</MotionLink>
          <MotionLink whileTap={{ scale: 0.9 }} to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`} onClick={closeMenu}>{t('nav.services')}</MotionLink>
          <MotionLink whileTap={{ scale: 0.9 }} to="/simulator" className={`nav-link ${location.pathname === '/simulator' ? 'active' : ''}`} onClick={closeMenu}>{t('nav.simulator')}</MotionLink>
          <MotionLink whileTap={{ scale: 0.9 }} to="/casestudies" className={`nav-link ${location.pathname === '/casestudies' ? 'active' : ''}`} onClick={closeMenu}>{t('nav.journal')}</MotionLink>
          <MotionLink whileTap={{ scale: 0.9 }} to="/careers" className={`nav-link ${location.pathname === '/careers' ? 'active' : ''}`} onClick={closeMenu}>{t('nav.careers')}</MotionLink>
          <MotionLink whileTap={{ scale: 0.95 }} to="/contact" className="btn btn-primary nav-btn" onClick={closeMenu}>{t('nav.book')}</MotionLink>
          
          <div className="nav-controls" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
            <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle Language" style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '0.4rem 0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)', fontSize: '0.85rem', fontWeight: '500' }}>
              <Globe size={16} />
              {language.toUpperCase()}
            </button>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Dark Mode" style={{ marginLeft: 0 }}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
    </nav>
  );
}
