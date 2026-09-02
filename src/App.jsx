import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import JournalDetail from './pages/JournalDetail';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Simulator from './pages/Simulator';
import NotFound from './pages/NotFound';
import LegalPage from './pages/LegalPage';
import CookieBanner from './components/CookieBanner';
import { Toaster } from 'react-hot-toast'
import { Analytics } from "@vercel/analytics/react"

const PageWrapper = ({ children }) => (
  <>
    <motion.div
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--secondary)',
        zIndex: 99999,
        transformOrigin: 'bottom'
      }}
    />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  </>
);

function App() {
  const location = useLocation();
  
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', backgroundColor: 'var(--bg-color)' }}>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
            <Route path="/products/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
            <Route path="/casestudies" element={<PageWrapper><CaseStudies /></PageWrapper>} />
            <Route path="/casestudies/:id" element={<PageWrapper><JournalDetail /></PageWrapper>} />
            <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
            <Route path="/simulator" element={<PageWrapper><Simulator /></PageWrapper>} />
            <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/privacy" element={<PageWrapper><LegalPage type="privacy" /></PageWrapper>} />
            <Route path="/terms" element={<PageWrapper><LegalPage type="terms" /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <Analytics />
      <CookieBanner />
      <Toaster position="top-right" toastOptions={{ style: { background: '#1a1a1a', color: '#f5f5f5', border: '1px solid rgba(200,170,110,0.3)', borderRadius: '12px', fontFamily: 'Inter, sans-serif' } }} />
    </>
  );
}

export default App;
