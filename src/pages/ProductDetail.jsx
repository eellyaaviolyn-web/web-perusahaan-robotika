import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, X, Rotate3D } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ProductDetail.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function ProductDetail() {
  const { id } = useParams();
  const [show360, setShow360] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  const { t } = useLanguage();
  const pdData = t('productDetail');
  
  const product = pdData.data[id] || pdData.data['titanium-arm']; // Default fallback

  return (
    <div className="page-wrapper product-detail-page">
      <section className="product-detail-hero">
        <div className="container">
          <Link to="/products" className="back-link">
            <ArrowLeft size={16} style={{marginRight: '8px'}} /> {pdData.backBtn}
          </Link>
          
          <div className="pd-layout">
            <motion.div 
                className="pd-image-col" 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8 }}
            >
              <div className="pd-image-wrapper">
                <img src={product.image} alt={product.name} />
                <button className="btn-360" onClick={() => setShow360(true)}>
                  <Rotate3D size={20} /> {pdData.mode360}
                </button>
              </div>
            </motion.div>
            
            <motion.div className="pd-info-col" initial="hidden" animate="visible" variants={fadeUp}>
              <span className="pd-category">{product.category}</span>
              <h1 className="font-serif pd-title">{product.name}</h1>
              <p className="pd-desc">{product.desc}</p>
              
              <div className="pd-action">
                <Link to="/contact" className="btn btn-primary">{pdData.btnReserve}</Link>
                <Link to="/contact" className="btn btn-outline" style={{marginLeft: '1rem'}}>{pdData.btnConsult}</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="product-specs-section">
        <div className="container">
          <div className="specs-layout">
            <motion.div className="specs-data" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="font-serif specs-heading">{pdData.specTitle}</h3>
              <ul className="specs-list">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}>
                    <span className="spec-key">{key}</span>
                    <span className="spec-value">{value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div className="specs-features" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <h3 className="font-serif specs-heading">{pdData.featTitle}</h3>
              <ul className="features-list">
                {product.features.map((feature, idx) => (
                  <li key={idx}>
                    <CheckCircle size={20} className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 360 Viewer Modal */}
      <AnimatePresence>
        {show360 && (
          <motion.div 
            className="viewer-360-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="close-360" onClick={() => setShow360(false)}>
              <X size={32} />
            </button>
            <div className="viewer-360-container">
              <h3 className="font-serif text-center" style={{color: 'white', marginBottom: '2rem'}}>
                {pdData.simTitle} {product.name}
              </h3>
              
              <div className="viewer-360-stage">
                <img 
                  src={product.image} 
                  alt="360 view" 
                  style={{ 
                    transform: `rotateY(${rotation}deg)`,
                    transition: 'transform 0.1s linear'
                  }}
                />
                <div className="viewer-crosshair"></div>
              </div>
              
              <div className="viewer-controls">
                <label style={{color: 'white', marginBottom: '1rem', display: 'block'}}>{pdData.simLabel} {rotation}°</label>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={rotation} 
                  onChange={(e) => setRotation(e.target.value)}
                  className="slider-360"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
