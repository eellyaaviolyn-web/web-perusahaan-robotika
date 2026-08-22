import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Zap, Globe, Heart, X, CheckCircle, Upload } from 'lucide-react';
import './Careers.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function Careers() {
  const jobs = [
    { title: "Senior AI Vision Engineer", location: "Jakarta, ID / Hybrid", type: "Full-Time" },
    { title: "Robotics Mechatronics Lead", location: "Jakarta, ID", type: "Full-Time" },
    { title: "B2B Enterprise Account Executive", location: "Singapore, SG", type: "Full-Time" },
    { title: "Embedded Systems Developer", location: "Remote (APAC)", type: "Contract" },
  ];

  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsSubmitted(false);
    setFileName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const namaLengkap = formData.get("nama_lengkap");
    const email = formData.get("email");
    const posisi = formData.get("posisi");
    const portofolioUrl = formData.get("portofolio_url") || "";
    const cvResumeLink = formData.get("cv_resume_link");
    
    setIsSubmitting(true);
    
    const notionPayload = {
      parent: { database_id: "3becd5784149806e9a5ee76f1d5f2beb" },
      properties: {
        "Nama Lengkap": {
          title: [{ text: { content: namaLengkap } }]
        },
        "Email": {
          email: email
        },
        "Posisi": {
          rich_text: [{ text: { content: posisi } }]
        },
        "Link CV": {
          url: cvResumeLink
        }
      }
    };

    if (portofolioUrl) {
      notionPayload.properties["Portofolio"] = { url: portofolioUrl };
    }
    
    try {
      const response = await fetch("/api/notion/v1/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(notionPayload)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setSelectedJob(null);
          setIsSubmitted(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Notion Error:", errorData);
        alert(`Gagal: ${errorData.message}`);
      }
    } catch (error) {
      alert("Koneksi gagal. Silakan periksa internet Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper careers-page">
      {/* 1. Hero */}
      <section className="page-hero">
        <div className="container text-center">
          <motion.h1 className="font-serif page-title" initial="hidden" animate="visible" variants={fadeUp}>
            Bentuk Masa Depan <span className="italic">Otomasi</span>
          </motion.h1>
          <motion.p className="page-subtitle" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            Bergabunglah dengan pemikir terbaik di bidang AI dan Mekatronika untuk mendefinisikan ulang batas kemampuan industri.
          </motion.p>
        </div>
      </section>

      {/* 2. Culture Grid */}
      <section className="culture-section">
        <div className="container">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="section-title">Kultur <span className="italic">Vin Robotik</span></h2>
            <p className="section-subtitle">Kami tidak hanya membangun mesin; kami membangun ekosistem intelektual tempat ide-ide radikal direalisasikan.</p>
          </motion.div>

          <div className="culture-grid">
            <motion.div className="culture-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Zap size={32} className="text-primary culture-icon" />
              <h3 className="font-serif">Kecepatan & Presisi</h3>
              <p>Kami bergerak layaknya mesin yang kami buat. Cepat dalam bereksperimen, presisi dalam mengeksekusi.</p>
            </motion.div>
            <motion.div className="culture-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
              <Users size={32} className="text-primary culture-icon" />
              <h3 className="font-serif">Kolaborasi Radikal</h3>
              <p>Tidak ada dinding antara divisi hardware dan software. Semuanya melebur demi menciptakan karya seni mekanis.</p>
            </motion.div>
            <motion.div className="culture-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <Globe size={32} className="text-primary culture-icon" />
              <h3 className="font-serif">Dampak Skala Global</h3>
              <p>Kode yang Anda tulis hari ini akan mengendalikan lini produksi pabrik-pabrik raksasa di berbagai benua esok hari.</p>
            </motion.div>
            <motion.div className="culture-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.3 }}>
              <Heart size={32} className="text-primary culture-icon" />
              <h3 className="font-serif">Kesejahteraan Holistik</h3>
              <p>Asuransi premium kelas dunia, kebebasan waktu fleksibel, dan ruang santai untuk me-reset kreativitas Anda.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Open Positions */}
      <section className="jobs-section" style={{ padding: '8rem 0' }}>
        <div className="container">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="section-title">Posisi <span className="italic">Terbuka</span></h2>
          </motion.div>

          <div className="jobs-list">
            {jobs.map((job, index) => (
              <motion.div 
                key={index} 
                className="job-row"
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                transition={{ delay: index * 0.1 }}
              >
                <div className="job-info">
                  <h3 className="font-serif">{job.title}</h3>
                  <div className="job-meta">
                    <span>{job.location}</span>
                    <span className="dot">•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <button className="btn btn-outline job-btn" onClick={() => handleApply(job)}>
                  Klik Untuk Melamar <ArrowRight size={16} style={{marginLeft: '8px'}} />
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: '4rem' }}>
            <p className="text-muted">Tidak menemukan posisi yang cocok? Kirimkan CV Anda ke <strong>careers@vinrobotik.com</strong></p>
          </div>
        </div>
      </section>

      {/* Application Modal via Portal to avoid CSS transform containing block bugs */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
        {selectedJob && (
          <motion.div 
            className="application-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="application-modal glass-panel"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button className="modal-close-btn" onClick={() => setSelectedJob(null)}>
                <X size={24} />
              </button>

              {!isSubmitted ? (
                <>
                  <h3 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Kirim Lamaran</h3>
                  <p className="text-muted" style={{ marginBottom: '2rem' }}>
                    Posisi: <strong>{selectedJob.title}</strong>
                  </p>
                  
                  <form onSubmit={handleSubmit} className="application-form">
                    <input type="hidden" name="posisi" value={selectedJob.title} />
                    
                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input type="text" name="nama_lengkap" className="app-input" required placeholder="Cth: John Doe" />
                    </div>
                    
                    <div className="form-group">
                      <label>Alamat Email</label>
                      <input type="email" name="email" className="app-input" required placeholder="john@example.com" />
                    </div>
                    
                    <div className="form-group">
                      <label>URL LinkedIn / Portofolio</label>
                      <input type="url" name="portofolio_url" className="app-input" placeholder="https://linkedin.com/in/..." />
                    </div>
                    
                    <div className="form-group">
                      <label>Link Google Drive CV / Resume</label>
                      <input type="url" name="cv_resume_link" className="app-input" required placeholder="https://drive.google.com/file/d/..." />
                      <small className="text-muted" style={{display: 'block', marginTop: '0.5rem', fontSize: '0.8rem'}}>
                        *Pastikan akses link Google Drive Anda sudah diatur ke "Anyone with the link" (Siapa saja yang memiliki tautan).
                      </small>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isSubmitting}>
                      {isSubmitting ? "Mengirim..." : "Kirim Lamaran Sekarang"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="success-state text-center">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle size={64} className="text-primary" style={{ margin: '0 auto 1.5rem auto' }} />
                  </motion.div>
                  <h3 className="font-serif">Lamaran Berhasil Dikirim!</h3>
                  <p className="text-muted" style={{ marginTop: '1rem' }}>
                    Terima kasih atas ketertarikan Anda. Tim rekrutmen kami akan meninjau profil Anda dan segera menghubungi Anda kembali.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
