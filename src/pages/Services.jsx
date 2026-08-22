import { motion } from 'framer-motion';
import { Settings, Shield, Zap, Target, PenTool, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Services() {
  return (
    <div className="page-wrapper services-page">
      {/* 1. Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.h1 className="font-serif page-title" initial="hidden" animate="visible" variants={fadeUp}>
            Dukungan <span className="italic">Eksklusif</span>
          </motion.h1>
          <motion.p className="page-subtitle" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            Fasilitas layanan rekayasa layaknya concierge bintang lima untuk menjamin operasi tanpa henti.
          </motion.p>
        </div>
      </section>

      {/* 2. Core Services */}
      <section className="services-list-section">
        <div className="container">
          <motion.div className="services-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            
            <motion.div className="service-card" variants={fadeUp}>
              <div className="service-icon"><Zap size={40} strokeWidth={1} /></div>
              <h3 className="font-serif">Instalasi Presisi Tinggi</h3>
              <p>Tim spesialis kami akan diturunkan langsung ke fasilitas Anda. Memastikan setiap baut dan kalibrasi perangkat lunak dipasang dengan standar penyimpangan nol mikron.</p>
            </motion.div>

            <motion.div className="service-card" variants={fadeUp}>
              <div className="service-icon"><Settings size={40} strokeWidth={1} /></div>
              <h3 className="font-serif">Pelatihan Tenaga Ahli</h3>
              <p>Kami tidak hanya menjual mesin, kami mentransfer pengetahuan. Operator Anda akan dilatih dalam program intensif bersertifikasi internasional mengenai manajemen robotika.</p>
            </motion.div>

            <motion.div className="service-card" variants={fadeUp}>
              <div className="service-icon"><Shield size={40} strokeWidth={1} /></div>
              <h3 className="font-serif">Prediktif Maintenance AI</h3>
              <p>Layanan pantau jarak jauh 24/7. AI kami mendeteksi keausan komponen mekanis berbulan-bulan sebelum kegagalan terjadi, memastikan downtime tetap berada di angka 0%.</p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 3. Methodology */}
      <section className="methodology-section">
        <div className="container">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h2 className="section-title">Metodologi <span className="italic">Integrasi</span></h2>
            <p className="section-subtitle">Pendekatan sistematis kami memastikan transisi ke otomasi berjalan sempurna tanpa mengganggu jadwal produksi Anda saat ini.</p>
          </motion.div>

          <div className="methodology-timeline">
            <div className="timeline-line"></div>
            
            <motion.div className="timeline-step" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="step-number">01</div>
              <div className="step-content">
                <Target size={32} className="step-icon" />
                <h3 className="font-serif">Audit & Analisis</h3>
                <p>Kami melakukan pemindaian 3D pada fasilitas Anda dan menganalisis bottleneck operasional untuk menentukan arsitektur robotika yang paling tepat guna.</p>
              </div>
            </motion.div>

            <motion.div className="timeline-step" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="step-number">02</div>
              <div className="step-content">
                <PenTool size={32} className="step-icon" />
                <h3 className="font-serif">Custom Blueprint</h3>
                <p>Tim insinyur kami mensimulasikan lingkungan produksi di ruang virtual (Digital Twin), menguji ribuan skenario untuk mengamankan efisiensi tertinggi.</p>
              </div>
            </motion.div>

            <motion.div className="timeline-step" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="step-number">03</div>
              <div className="step-content">
                <Zap size={32} className="step-icon" />
                <h3 className="font-serif">Deployment & Kalibrasi</h3>
                <p>Pemasangan dilakukan pada akhir pekan atau di luar jam sibuk. Robot dikalibrasi hingga akurasi mikrometer untuk bekerja sinkron dengan mesin lama Anda.</p>
              </div>
            </motion.div>

            <motion.div className="timeline-step" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="step-number">04</div>
              <div className="step-content">
                <CheckCircle size={32} className="step-icon" />
                <h3 className="font-serif">Lifetime Concierge</h3>
                <p>Setelah sistem menyala, Anda mendapatkan akses eksklusif ke jalur VVIP kami. Pantauan 24/7 dan penggantian suku cadang preventif secara otomatis.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. SLA Banner */}
      <section className="sla-banner">
        <div className="sla-bg">
          <img src="/robotic_joint.jpg" alt="Precision Robotics Uptime" />
          <div className="sla-overlay"></div>
        </div>
        <div className="container sla-content">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-serif">Garansi 99.9% <span className="italic">Uptime</span></h2>
            <p>
              Perjanjian Tingkat Layanan (SLA) kami bukan sekadar janji. Ini adalah komitmen tertulis bahwa jika sistem Anda berhenti di luar jadwal perawatan, kami akan menanggung kerugian produksi Anda. Kami percaya penuh pada keandalan sistem kami.
            </p>
            <div className="sla-stats">
              <div>
                <h4>&lt; 15 Menit</h4>
                <span>Waktu Respons Insiden</span>
              </div>
              <div className="divider"></div>
              <div>
                <h4>24/7/365</h4>
                <span>Monitoring Aktif AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="services-cta text-center">
        <div className="container">
          <motion.h2 className="font-serif section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Diskusikan Kebutuhan Anda
          </motion.h2>
          <motion.p className="section-subtitle" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
            Setiap fasilitas memiliki keunikannya masing-masing. Mari rancang solusi yang paling sempurna untuk Anda.
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
             <Link to="/contact" className="btn btn-primary">Mulai Konsultasi <ArrowRight size={16} style={{marginLeft: '8px'}}/></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
