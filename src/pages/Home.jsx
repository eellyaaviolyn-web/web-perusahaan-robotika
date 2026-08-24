import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Cpu, Shield, Zap, Star, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Particles from '../components/Particles';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.2
    } 
  }
};

const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* 1. Cinematic Full-Screen Hero */}
      <section className="hero-section">
        <div className="hero-bg">
          <motion.img 
            src="/building.jpg" 
            alt="Vin Robotik Headquarters" 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content-centered">
          <motion.div 
            variants={staggerContainer}
            initial="hidden" 
            animate="visible" 
          >
            <motion.span variants={fadeUp} className="hero-kicker">SELAMAT DATANG DI ERA BARU</motion.span>
            <motion.h1 variants={fadeUp} className="hero-title font-serif">
              Revolusi Otomasi<br/>
              <span className="italic">Vin Robotik</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Floating Actions */}
        <div className="booking-bar-wrapper container">
          <motion.div 
            className="hero-actions"
            style={{ justifyContent: 'center', marginTop: '2rem' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link to="/contact" className="btn btn-primary hover-target">Konsultasi Pakar <ArrowRight size={18} className="ml-2" /></Link>
            <Link to="/collection" className="btn btn-outline hover-target" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>Lihat Sistem Kami</Link>
          </motion.div>
        </div>
      </section>

      {/* Client Logo Marquee */}
      <section className="client-marquee-section">
        <div className="marquee-container">
          <div className="marquee-track">
            {Array(2).fill([
              "AERO DYNAMICS", "QUANTUM TECH", "NEURAL AUTO", "STEELWORKS", "GLOBAL MED", "VANGUARD"
            ]).flat().map((logo, index) => (
              <div key={index} className="marquee-item font-serif">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {[
              { number: '200+', label: 'Klien Enterprise' },
              { number: '99.9%', label: 'Tingkat Uptime' },
              { number: '12', label: 'Negara Beroperasi' },
              { number: '<0.01%', label: 'Rasio Downtime/Tahun' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat-item"
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
              >
                <span className="stat-number font-serif">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            {[
              { icon: <Cpu size={32} />, title: "Intelijen Adaptif", desc: "Sistem kami belajar dan mengoptimalkan diri secara mandiri, beradaptasi dengan perubahan jalur perakitan." },
              { icon: <Zap size={32} />, title: "Kecepatan Mikrosekon", desc: "Mengurangi waktu siklus produksi (cycle time) hingga 60% tanpa mengorbankan tingkat presisi struktural." },
              { icon: <Shield size={32} />, title: "Keandalan Militer", desc: "Beroperasi 24/7 di lingkungan paling ekstrem dengan rasio downtime kurang dari 0.01% per tahun." }
            ].map((feat, i) => (
              <motion.div key={i} className="feature-card" variants={staggerChild}>
                <div className="feature-icon">{feat.icon}</div>
                <h3 className="font-serif">{feat.title}</h3>
                <p>{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. Philosophy Section (Boutique Layout) */}
      <section className="philosophy-section">
        <div className="container">
          <div className="boutique-grid">
            <motion.div 
              className="boutique-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="section-title" style={{ textAlign: 'left' }}>Mendefinisikan Ulang <br/><span className="italic">Efisiensi</span></h2>
              <p>
                Seperti sebuah karya seni yang dirancang dengan presisi, ekosistem robotika kami memadukan kekuatan mekanis dengan kecerdasan buatan. Kami menolak kompromi dalam hal kualitas dan keandalan.
              </p>
              <p>
                Vin Robotik merancang masa depan di mana lini produksi Anda beroperasi dengan <em>zero downtime</em>, akurasi absolut, dan harmoni yang sempurna.
              </p>
              <Link to="/about" className="btn-link">
                Temukan Kisah Kami <ArrowRight size={16} />
              </Link>
            </motion.div>
            
            <motion.div 
              className="boutique-image-container"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
            >
              <div className="boutique-image">
                <img src="/home_efficiency.jpg" alt="Efisiensi Robotika" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 3. Exclusive Collection */}
      <section className="collection-section">
        <div className="container">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="section-title">Koleksi <span className="italic">Eksklusif</span></h2>
            <p className="section-subtitle">Rangkaian mahakarya rekayasa mekanis kami, dirancang khusus untuk memenuhi standar industri presisi tertinggi.</p>
          </motion.div>

          <motion.div 
            className="collection-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="collection-card" variants={fadeUp}>
              <div className="card-image-wrapper">
                <motion.img 
                  whileHover={{ scale: 1.1 }} 
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src="/robot-black.jpg" alt="Titanium Arm" className="image-placeholder" style={{ objectFit: 'cover' }} />
              </div>
              <div className="card-content">
                <h3 className="font-serif">Titanium Arm Series</h3>
                <p>Presisi mikroskopis untuk perakitan semikonduktor dan elektronik kelas atas.</p>
                <Link to="/products" className="discover-link">Jelajahi Solusi <ArrowRight size={16}/></Link>
              </div>
            </motion.div>

            <motion.div className="collection-card" variants={fadeUp}>
              <div className="card-image-wrapper">
                <motion.img 
                  whileHover={{ scale: 1.1 }} 
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src="/robot-green.png" alt="V-Cobot Harmony" className="image-placeholder" style={{ objectFit: 'cover' }} />
              </div>
              <div className="card-content">
                <h3 className="font-serif">V-Cobot Harmony</h3>
                <p>Robot kolaboratif bersertifikasi aman untuk bekerja berdampingan dengan tenaga ahli Anda.</p>
                <Link to="/products" className="discover-link">Jelajahi Solusi <ArrowRight size={16}/></Link>
              </div>
            </motion.div>

            <motion.div className="collection-card" variants={fadeUp}>
              <div className="card-image-wrapper">
                <motion.img 
                  whileHover={{ scale: 1.1 }} 
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src="/robot-boxy.png" alt="Aero AMR Fleet" className="image-placeholder" style={{ objectFit: 'cover' }} />
              </div>
              <div className="card-content">
                <h3 className="font-serif">Aero AMR Fleet</h3>
                <p>Armada logistik otonom berkelas enterprise untuk manajemen gudang tanpa henti.</p>
                <Link to="/products" className="discover-link">Jelajahi Solusi <ArrowRight size={16}/></Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. The Experience */}
      <section className="experience-section">
        <div className="container">
          <div className="experience-layout">
            <motion.div 
              className="experience-image"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
               <img src="/building.jpg" alt="Vin Robotik Experience" />
            </motion.div>
            <motion.div 
              className="experience-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="section-title" style={{ textAlign: 'left' }}>Layanan <span className="italic">VVIP</span></h2>
              <ul className="luxury-list">
                <li>
                  <Star size={24} className="text-primary"/>
                  <div>
                    <h4 className="font-serif">Integrasi Tanpa Gangguan</h4>
                    <p>Tim ahli kami memastikan transisi sistem dilakukan tanpa menghentikan lini produksi Anda sedikit pun, menjaga alur kerja tetap prima.</p>
                  </div>
                </li>
                <li>
                  <Shield size={24} className="text-primary"/>
                  <div>
                    <h4 className="font-serif">Proteksi Elite</h4>
                    <p>Garansi perangkat keras seumur hidup yang didukung dengan sistem pemantauan prediktif berbasis AI selama 24 jam penuh setiap harinya.</p>
                  </div>
                </li>
                <li>
                  <Clock size={24} className="text-primary"/>
                  <div>
                    <h4 className="font-serif">Dukungan Concierge</h4>
                    <p>Layanan purna jual khusus layaknya concierge hotel bintang lima, siap merespons setiap kebutuhan operasional Anda secara instan.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Immersive CTA */}
      <section className="cta-immersive">
        <div className="cta-overlay"></div>
        <div className="container cta-content">
          <motion.h2 className="font-serif" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Siap Memasuki Era <br/><span className="italic">Kesempurnaan?</span>
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Jadwalkan konsultasi eksklusif dengan Principal Engineer kami hari ini.
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Link to="/contact" className="btn btn-primary">Reservasi Konsultasi</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
