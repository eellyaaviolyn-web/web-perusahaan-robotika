import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, X, Rotate3D } from 'lucide-react';
import './ProductDetail.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const productsData = {
  'titanium-arm': {
    name: 'Titanium Arm Series (T-900)',
    category: 'SERI MANUFAKTUR BERAT',
    image: '/robot-black.jpg',
    desc: 'Dirancang untuk menahan beban ekstrem di lingkungan pabrik yang keras. Sistem sendi berbahan titanium padat memberikan kecepatan torsi tanpa getaran sedikit pun. Memiliki presisi mikroskopis untuk perakitan kelas berat maupun semikonduktor berkat sistem kalibrasi mandiri.',
    specs: {
      'Max Payload': '800 Kg',
      'Maximum Reach': '3.5 Meter',
      'Repeatability': '±0.02 mm',
      'Operating Temp': '-10°C to 55°C',
      'Power Supply': '380V 3-Phase',
      'Controller': 'Vin-Core 9.0'
    },
    features: [
      'Konstruksi 100% Titanium Alloy',
      'Sistem Pendingin Liquid-Active',
      'Sensor Torsi 6-Axis Terintegrasi',
      'Garansi Perangkat Keras Seumur Hidup'
    ]
  },
  'v-cobot': {
    name: 'V-Cobot Harmony (C-20)',
    category: 'ROBOTIK KOLABORATIF (COBOT)',
    image: '/robot-green.png',
    desc: 'Kesempurnaan bekerja berdampingan. Dilengkapi dengan balutan kulit sensor kapasitif yang mendeteksi sentuhan sekecil apa pun, memastikan keamanan mutlak bagi operator manusia di sekitarnya tanpa memerlukan pagar pembatas.',
    specs: {
      'Payload': '20 Kg',
      'Reach': '1.3 Meter',
      'Safety Protocol': 'ISO/TS 15066 Certified',
      'Programming': 'Drag-and-Drop GUI',
      'Weight': '32 Kg',
      'Joint Speed': '120°/s'
    },
    features: [
      'Kulit Kapasitif Sensitif Sentuhan',
      'Pelatihan Robot dengan Demonstrasi Fisik (Lead-through)',
      'Sistem Visi AI Bawaan',
      'Instalasi Plug-and-Play dalam 30 Menit'
    ]
  },
  'aero-amr': {
    name: 'Aero AMR Fleet (A-X)',
    category: 'SISTEM LOGISTIK OTONOM',
    image: '/robot-boxy.png',
    desc: 'Arsitektur logistik masa depan. Armada mobil otonom cerdas yang mampu memetakan dinamika gudang secara real-time menggunakan LIDAR 3D dan sistem navigasi hibrida, mengeliminasi kemacetan logistik secara otonom.',
    specs: {
      'Max Payload': '1,500 Kg',
      'Battery Life': '14 Jam (Fast Charge)',
      'Navigation': '3D SLAM & Visual Odometry',
      'Max Speed': '2.5 m/s',
      'Charge Time': '45 Menit (0-80%)',
      'Communication': '5G / Wi-Fi 6'
    },
    features: [
      'LIDAR 360° Tanpa Titik Buta',
      'Sistem Penghindaran Rintangan AI',
      'Manajemen Armada Cloud (Hingga 500 Unit)',
      'Pengisian Daya Otonom'
    ]
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const [show360, setShow360] = useState(false);
  const [rotation, setRotation] = useState(0);
  const product = productsData[id] || productsData['titanium-arm']; // Default fallback

  return (
    <div className="page-wrapper product-detail-page">
      <section className="product-detail-hero">
        <div className="container">
          <Link to="/products" className="back-link">
            <ArrowLeft size={16} style={{marginRight: '8px'}} /> Kembali ke Koleksi
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
                  <Rotate3D size={20} /> Mode 360°
                </button>
              </div>
            </motion.div>
            
            <motion.div className="pd-info-col" initial="hidden" animate="visible" variants={fadeUp}>
              <span className="pd-category">{product.category}</span>
              <h1 className="font-serif pd-title">{product.name}</h1>
              <p className="pd-desc">{product.desc}</p>
              
              <div className="pd-action">
                <Link to="/contact" className="btn btn-primary">Reservasi Unit</Link>
                <Link to="/contact" className="btn btn-outline" style={{marginLeft: '1rem'}}>Konsultasi Integrasi</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="product-specs-section">
        <div className="container">
          <div className="specs-layout">
            <motion.div className="specs-data" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="font-serif specs-heading">Spesifikasi Teknis</h3>
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
              <h3 className="font-serif specs-heading">Keunggulan Utama</h3>
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
                Simulasi Rotasi {product.name}
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
                <label style={{color: 'white', marginBottom: '1rem', display: 'block'}}>Putar Interaktif: {rotation}°</label>
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
