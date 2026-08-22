import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Products.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function Products() {
  return (
    <div className="page-wrapper products-page">
      <section className="page-hero">
        <div className="container">
          <motion.h1 className="font-serif page-title" initial="hidden" animate="visible" variants={fadeUp}>
            Koleksi <span className="italic">Sistem Automasi</span>
          </motion.h1>
          <motion.p className="page-subtitle" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            Galeri portofolio produk kelas enterprise kami.
          </motion.p>
        </div>
      </section>

      <section className="product-gallery">
        <div className="container">
          {/* Product 1 */}
          <div className="product-showcase">
            <motion.div className="product-image" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
               <img src="/robot-black.jpg" alt="Titanium Arm Series" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            <motion.div className="product-details" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h4 className="product-category">SERI MANUFAKTUR BERAT</h4>
              <h2 className="font-serif product-name">Titanium Arm Series (T-900)</h2>
              <p className="product-desc">
                Dirancang untuk menahan beban ekstrem di lingkungan pabrik yang keras. Sistem sendi berbahan titanium padat memberikan kecepatan torsi tanpa getaran sedikit pun.
              </p>
              <ul className="product-specs">
                <li><span>Payload</span> : 800 Kg</li>
                <li><span>Reach</span> : 3.5 Meter</li>
                <li><span>Repeatability</span> : ±0.02 mm</li>
              </ul>
              <Link to="/products/titanium-arm" className="discover-link mt-4">Lihat Detail <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
            </motion.div>
          </div>

          {/* Product 2 */}
          <div className="product-showcase reverse">
            <motion.div className="product-details" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h4 className="product-category">ROBOTIK KOLABORATIF (COBOT)</h4>
              <h2 className="font-serif product-name">V-Cobot Harmony (C-20)</h2>
              <p className="product-desc">
                Kesempurnaan bekerja berdampingan. Dilengkapi dengan balutan kulit sensor kapasitif yang mendeteksi sentuhan sekecil apa pun, memastikan keamanan mutlak bagi operator manusia di sekitarnya.
              </p>
              <ul className="product-specs">
                <li><span>Payload</span> : 20 Kg</li>
                <li><span>Reach</span> : 1.3 Meter</li>
                <li><span>Safety Protocol</span> : ISO/TS 15066</li>
              </ul>
              <Link to="/products/v-cobot" className="discover-link mt-4">Lihat Detail <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
            </motion.div>
            <motion.div className="product-image" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
               <img src="/robot-green.png" alt="V-Cobot Harmony" style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#e2e8f0' }} />
            </motion.div>
          </div>
          
          {/* Product 3 */}
          <div className="product-showcase">
            <motion.div className="product-image" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
               <img src="/robot-boxy.png" alt="Aero AMR Fleet" style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#e2e8f0' }} />
            </motion.div>
            <motion.div className="product-details" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h4 className="product-category">SISTEM LOGISTIK OTONOM</h4>
              <h2 className="font-serif product-name">Aero AMR Fleet (A-X)</h2>
              <p className="product-desc">
                Arsitektur logistik masa depan. Armada mobil otonom cerdas yang mampu memetakan dinamika gudang secara real-time menggunakan LIDAR dan sistem navigasi hibrida, mengeliminasi kemacetan logistik.
              </p>
              <ul className="product-specs">
                <li><span>Max Payload</span> : 1,500 Kg</li>
                <li><span>Battery Life</span> : 14 Jam (Fast Charge)</li>
                <li><span>Navigation</span> : SLAM & Visual Odometry</li>
              </ul>
              <Link to="/products/aero-amr" className="discover-link mt-4">Lihat Detail <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
