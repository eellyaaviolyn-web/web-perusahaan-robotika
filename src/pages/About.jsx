import { motion } from 'framer-motion';
import { ArrowRight, Globe, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function About() {
  return (
    <div className="page-wrapper about-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.h1 className="font-serif page-title" initial="hidden" animate="visible" variants={fadeUp}>
            Warisan Presisi <br/><span className="italic">& Keunggulan Mekanis</span>
          </motion.h1>
          <motion.p className="page-subtitle" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            Mengenal lebih jauh arsitek di balik revolusi otomasi industri global.
          </motion.p>
        </div>
      </section>

      {/* Philosophy & Research (Zig-Zag) */}
      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <motion.div className="about-text" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-serif">Filosofi Kami</h2>
              <p>Vin Robotik didirikan dengan satu tujuan absolut: mengeliminasi inefisiensi dalam lanskap manufaktur global. Kami percaya bahwa masa depan industri yang berkelanjutan terletak pada sinergi sempurna antara kecerdasan buatan tingkat tinggi dan ketangguhan mekanis.</p>
              <p>Setiap perangkat yang keluar dari fasilitas perakitan kami telah melalui standar pengujian ekstrem, menjamin tingkat presisi mikroskopis dan durabilitas yang tidak dapat ditiru oleh pabrikan massal biasa.</p>
            </motion.div>
            <motion.div className="about-image" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="placeholder-image relative-container">
                <img src="/factory_luxury.jpg" alt="Fasilitas Manufaktur Vin Robotik" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
            </motion.div>
          </div>

          <div className="about-grid reverse-grid mt-8">
            <motion.div className="about-image" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="placeholder-image relative-container">
                <img src="/micro_chip.jpg" alt="Riset dan Inovasi Robotika" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
            </motion.div>
            <motion.div className="about-text" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-serif">Riset & Inovasi</h2>
              <p>Inovasi bukanlah departemen di perusahaan kami, melainkan DNA inti dari setiap karyawan. Ratusan insinyur utama kami mendedikasikan hidup mereka untuk memecahkan batas-batas ilmu fisika dan algoritma komputasi visual.</p>
              <p>Dari pengembangan paten <em>Magnetic Servo</em> hingga arsitektur <em>Neural Network</em> untuk pendeteksian cacat produk secara seketika, kami memastikan klien kami selalu selangkah lebih maju di garis depan revolusi industri modern.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Quote */}
      <section className="quote-section">
        <div className="container text-center">
          <motion.div className="quote-box" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="font-serif quote-text">
              "Kami tidak mendesain robot untuk sekadar menggantikan pekerja. Kami merancang arsitektur sistem saraf bagi fasilitas manufaktur masa depan, di mana kecerdasan dan besi melebur menjadi satu kesatuan yang sempurna."
            </p>
            <div className="quote-author">
              <h4 className="font-serif">Dr. Vincentius Artha</h4>
              <span>Founder & Chief Architect, Vin Robotik</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="section-title">Perjalanan <span className="italic">Evolusi</span></h2>
            <p className="section-subtitle">Jejak langkah kami dalam mendefinisikan ulang standar industri global dari tahun ke tahun.</p>
          </motion.div>

          <div className="timeline-wrapper">
            <div className="timeline-center-line"></div>
            
            <div className="timeline-row left">
              <motion.div className="timeline-box" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span className="timeline-year">2014</span>
                <h3 className="font-serif">Inisiasi Presisi</h3>
                <p>Didirikan sebagai laboratorium riset mekanis khusus (*boutique research lab*). Memenangkan penghargaan desain motor servo paling efisien di Eropa.</p>
              </motion.div>
            </div>

            <div className="timeline-row right">
              <motion.div className="timeline-box" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span className="timeline-year">2018</span>
                <h3 className="font-serif">Ekspansi Manufaktur</h3>
                <p>Merilis seri robot industri pertama kami, "Titanium Line". Diadopsi secara eksklusif oleh 3 pabrikan otomotif premium Eropa dan Jepang.</p>
              </motion.div>
            </div>

            <div className="timeline-row left">
              <motion.div className="timeline-box" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span className="timeline-year">2022</span>
                <h3 className="font-serif">Era Kolaboratif (Cobot)</h3>
                <p>Memperkenalkan lini V-Cobot Harmony dengan kulit sensor kapasitif pertama di dunia, menembus batas keselamatan interaksi manusia-mesin.</p>
              </motion.div>
            </div>
            
            <div className="timeline-row right">
              <motion.div className="timeline-box" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span className="timeline-year">2026</span>
                <h3 className="font-serif">Otonomi Ekosistem Penuh</h3>
                <p>Meluncurkan sistem integrasi logistik otonom cerdas berbasis AI. Menyediakan solusi otomatisasi end-to-end tanpa sentuhan tangan.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact Grid */}
      <section className="impact-section">
        <div className="container">
          <div className="impact-grid">
            <motion.div className="impact-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Globe size={40} className="impact-icon" strokeWidth={1} />
              <h3 className="font-serif">Jejak Global</h3>
              <p>Kantor cabang teknis dan pusat riset kami tersebar di Frankfurt, Tokyo, Singapura, dan Silicon Valley untuk dukungan instan.</p>
            </motion.div>
            
            <motion.div className="impact-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <Award size={40} className="impact-icon" strokeWidth={1} />
              <h3 className="font-serif">Sertifikasi Tertinggi</h3>
              <p>Semua produk kami bersertifikasi ISO 9001, ISO 14001, dan mematuhi regulasi keamanan TUV Rheinland paling ketat di industri.</p>
            </motion.div>

            <motion.div className="impact-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.4 }}>
              <TrendingUp size={40} className="impact-icon" strokeWidth={1} />
              <h3 className="font-serif">Investasi Jangka Panjang</h3>
              <p>Mesin kami dirancang untuk siklus hidup operasional hingga 25 tahun, memberikan ROI terukur dan keberlanjutan tak tertandingi.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta text-center">
        <div className="container">
          <motion.h2 className="font-serif section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Bergabunglah dengan Masa Depan
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
             <Link to="/products" className="btn btn-primary">Lihat Koleksi Sistem Kami <ArrowRight size={16} style={{marginLeft: '8px'}}/></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
