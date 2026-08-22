import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, Download, Mail, X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CaseStudies.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function CaseStudies() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDownloadClick = (paperName) => {
    setSelectedPaper(paperName);
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedPaper !== 'Proyeksi Otomasi 2030') {
      alert(`Mohon maaf, dokumen "${selectedPaper}" saat ini sedang dalam pembaruan tim riset kami dan akan segera tersedia.`);
      setShowModal(false);
      return;
    }

    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const namaLengkap = formData.get("nama_lengkap");
    const emailPerusahaan = formData.get("email");

    const notionPayload = {
      parent: { database_id: "3bfcd578414980318422d426c0fab3d4" },
      properties: {
        "Nama Lengkap": {
          title: [{ text: { content: namaLengkap } }]
        },
        "Email": {
          email: emailPerusahaan
        },
        "Dokumen": {
          rich_text: [{ text: { content: selectedPaper } }]
        }
      }
    };
    
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
          setShowModal(false);
          // reset state after modal finishes animating out
          setTimeout(() => setIsSubmitted(false), 500);
        }, 4000);
      } else {
        const errorData = await response.json();
        console.error("Notion Error:", errorData);
        alert(`Gagal menyimpan data: ${errorData.message}`);
      }
    } catch (error) {
      alert("Koneksi gagal. Silakan periksa internet Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper journal-page">
      {/* 1. Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.h1 className="font-serif page-title" initial="hidden" animate="visible" variants={fadeUp}>
            Jurnal <span className="italic">Inovasi</span>
          </motion.h1>
          <motion.p className="page-subtitle" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            Kisah nyata transformasi di balik pintu pabrik-pabrik terbesar di dunia.
          </motion.p>
        </div>
      </section>

      {/* 2. Journal Grid (Featured + 4 Articles) */}
      <section className="journal-section">
        <div className="container">
          <div className="journal-grid">
            
            {/* Featured */}
            <motion.article className="journal-card featured" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <div className="journal-image-container">
                <img src="/car_assembly.jpg" alt="Manufaktur Otomotif" className="journal-image" />
              </div>
              <div className="journal-content">
                <span className="journal-meta">MANUFAKTUR OTOMOTIF • 2025</span>
                <h2 className="font-serif">Mereduksi Biaya Scrap Hingga 94% dalam Kuartal Pertama</h2>
                <p>Bagaimana integrasi 40 unit Titanium Arm di lini perakitan EV (Electric Vehicle) berhasil mengeliminasi cacat pengelasan mikro sepenuhnya dan mempercepat output produksi sebesar 40%.</p>
                <Link to="/casestudies/automotive" className="read-more">Baca Jurnal <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
              </div>
            </motion.article>

            {/* Standard 1 */}
            <motion.article className="journal-card" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <div className="journal-image-container">
                <img src="/micro_chip.jpg" alt="Era Baru Perakitan Mikro" className="journal-image" />
              </div>
              <div className="journal-content">
                <span className="journal-meta">ELEKTRONIK • 2026</span>
                <h3 className="font-serif">Era Baru Perakitan Mikro</h3>
                <p>Presisi ±0.01mm V-Cobot Harmony dalam merakit sirkuit semikonduktor tanpa ruang debu berlebih.</p>
                <Link to="/casestudies/electronics" className="read-more">Baca Jurnal <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
              </div>
            </motion.article>

            {/* Standard 2 */}
            <motion.article className="journal-card" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <div className="journal-image-container">
                <img src="/warehouse_amr.jpg" alt="Manajemen Gudang Otonom" className="journal-image" />
              </div>
              <div className="journal-content">
                <span className="journal-meta">LOGISTIK • 2026</span>
                <h3 className="font-serif">Manajemen Gudang Otonom</h3>
                <p>Deploy 100+ Aero AMR yang meningkatkan volume pengiriman harian sebesar 300% pada fasilitas e-commerce.</p>
                <Link to="/casestudies/logistics" className="read-more">Baca Jurnal <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
              </div>
            </motion.article>

            {/* Standard 3 */}
            <motion.article className="journal-card" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <div className="journal-image-container">
                <img src="/factory_luxury.jpg" alt="Farmasi & Medis" className="journal-image" />
              </div>
              <div className="journal-content">
                <span className="journal-meta">FARMASI & MEDIS • 2025</span>
                <h3 className="font-serif">Sterilisasi 100% dengan Cobot</h3>
                <p>Otomatisasi pengemasan vaksin menggunakan lengan robot berbahan titanium khusus medis yang tahan terhadap korosi kimia murni.</p>
                <Link to="/casestudies/medical" className="read-more">Baca Jurnal <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
              </div>
            </motion.article>

            {/* Standard 4 */}
            <motion.article className="journal-card" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <div className="journal-image-container">
                <img src="/jet_turbine_robot.jpg" alt="Aviasi & Dirgantara" className="journal-image" />
              </div>
              <div className="journal-content">
                <span className="journal-meta">DIRGANTARA • 2024</span>
                <h3 className="font-serif">Presisi Turbin Jet Masa Depan</h3>
                <p>Kalibrasi pemasangan bilah turbin pesawat terbang komersial yang membutuhkan tingkat toleransi nol kesalahan menggunakan sensor AI kami.</p>
                <Link to="/casestudies/aerospace" className="read-more">Baca Jurnal <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
              </div>
            </motion.article>

          </div>
        </div>
      </section>

      {/* 3. Whitepapers & Research Reports */}
      <section className="whitepapers-section">
        <div className="container">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h2 className="section-title">Laporan <span className="italic">Riset</span></h2>
            <p className="section-subtitle">Unduh whitepaper teknis dan laporan analisis tren industri terbaru yang dipublikasikan oleh tim riset Vin Robotik.</p>
          </motion.div>

          <div className="whitepaper-grid">
            <motion.div className="whitepaper-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <FileText size={40} className="wp-icon" strokeWidth={1} />
              <h4>Proyeksi Otomasi 2030</h4>
              <p>Analisis komprehensif mengenai pergeseran tenaga kerja dan integrasi AI dalam dekade mendatang.</p>
              <button className="btn btn-outline" onClick={() => handleDownloadClick('Proyeksi Otomasi 2030')}><Download size={16} style={{marginRight: '8px'}}/> Unduh PDF</button>
            </motion.div>

            <motion.div className="whitepaper-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <FileText size={40} className="wp-icon" strokeWidth={1} />
              <h4>Keamanan Cobot ISO/TS 15066</h4>
              <p>Panduan teknis mendalam tentang regulasi interaksi fisik antara mesin industri dan manusia.</p>
              <button className="btn btn-outline" onClick={() => handleDownloadClick('Keamanan Cobot ISO/TS 15066')}><Download size={16} style={{marginRight: '8px'}}/> Unduh PDF</button>
            </motion.div>

            <motion.div className="whitepaper-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.4 }}>
              <FileText size={40} className="wp-icon" strokeWidth={1} />
              <h4>Arsitektur Digital Twin</h4>
              <p>Bagaimana simulasi pabrik virtual (Digital Twin) mampu mereduksi biaya trial-and-error hingga 80%.</p>
              <button className="btn btn-outline" onClick={() => handleDownloadClick('Arsitektur Digital Twin')}><Download size={16} style={{marginRight: '8px'}}/> Unduh PDF</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Newsletter */}
      <section className="newsletter-section text-center">
        <div className="container">
          <motion.div className="newsletter-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Mail size={48} className="newsletter-icon" strokeWidth={1} />
            <h2 className="font-serif">Wawasan Industri Eksklusif</h2>
            <p>Berlangganan untuk menerima pembaruan teknologi, studi kasus, dan undangan ke webinar tertutup kami.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Alamat Email Perusahaan" required />
              <button type="submit" className="btn btn-primary">Berlangganan</button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Lead Generation Modal */}
      {createPortal(
        <AnimatePresence>
          {showModal && (
            <motion.div 
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <motion.div 
                className="download-modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", bounce: 0.4 }}
                style={{ position: 'relative', zIndex: 10000, pointerEvents: 'auto' }}
              >
                <button className="close-modal" onClick={() => setShowModal(false)}>
                  <X size={24} />
                </button>
                
                <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div 
                    key="form-content"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{ width: '100%' }}
                  >
                    <div className="modal-header">
                      <FileText size={40} className="modal-icon text-primary" strokeWidth={1} />
                      <h3 className="font-serif">Akses Laporan Eksklusif</h3>
                      <p>Anda akan mengunduh: <strong>{selectedPaper}</strong></p>
                    </div>
                    
                    <form className="modal-form" onSubmit={handleFormSubmit}>
                      <p className="modal-instruction">Silakan masukkan email perusahaan Anda. Tautan unduhan PDF akan dikirimkan secara instan.</p>
                      <div className="form-group">
                        <input type="text" name="nama_lengkap" placeholder="Nama Lengkap" required className="luxury-input" />
                      </div>
                      <div className="form-group">
                        <input type="email" name="email" placeholder="Email Perusahaan" required className="luxury-input" />
                      </div>
                      <button type="submit" className="btn btn-primary w-100" style={{width: '100%', marginTop: '1rem'}} disabled={isSubmitting}>
                        {isSubmitting ? "MENYIAPKAN DOKUMEN..." : "Unduh Sekarang"}
                      </button>
                      <span className="privacy-note">Informasi Anda aman bersama kami.</span>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success-content"
                    className="success-state text-center" 
                    style={{ padding: '3rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    >
                      <CheckCircle size={64} className="text-primary" style={{ marginBottom: '1.5rem' }} />
                    </motion.div>
                    <h3 className="font-serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Permintaan Diterima</h3>
                    <p className="text-muted" style={{ fontSize: '1rem', maxWidth: '350px', margin: '0 auto' }}>
                      Terima kasih! Dokumen teknis <strong>{selectedPaper}</strong> akan segera dikirimkan ke Email Perusahaan Anda setelah proses verifikasi tim kami selesai.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
