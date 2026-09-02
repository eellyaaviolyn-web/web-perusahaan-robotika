import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();
  const isId = language === 'id';

  useEffect(() => {
    const consent = localStorage.getItem('vin-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('vin-cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('vin-cookie-consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99998,
            width: 'min(680px, calc(100vw - 32px))',
            background: 'rgba(15,15,15,0.92)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(200,170,110,0.25)',
            borderRadius: '20px',
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <Cookie size={28} style={{ color: 'var(--primary)', flexShrink: 0 }} />

          <div style={{ flex: 1, minWidth: '200px' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.6 }}>
              {isId
                ? <>Kami menggunakan cookie untuk meningkatkan pengalaman Anda. <Link to="/privacy" style={{ color: 'var(--primary)', textDecoration: 'underline' }} onClick={accept}>Kebijakan Privasi</Link></>
                : <>We use cookies to enhance your experience. <Link to="/privacy" style={{ color: 'var(--primary)', textDecoration: 'underline' }} onClick={accept}>Privacy Policy</Link></>
              }
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
            <button
              onClick={decline}
              style={{ padding: '0.5rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#94a3b8', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              {isId ? 'Tolak' : 'Decline'}
            </button>
            <button
              onClick={accept}
              style={{ padding: '0.5rem 1.4rem', borderRadius: '30px', background: 'var(--primary)', border: 'none', color: '#0a0a0a', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <CheckCircle size={14} /> {isId ? 'Terima' : 'Accept'}
            </button>
          </div>

          <button onClick={decline} style={{ position: 'absolute', top: '12px', right: '14px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
