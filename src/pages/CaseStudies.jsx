import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, Download, Mail, X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './CaseStudies.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function CaseStudies() {
  const { t, language } = useLanguage();
  const journalData = t('journal');
  
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
    
    // In original code, the logic was bound to the exact string 'Proyeksi Otomasi 2030'.
    // We check against both ID and EN titles for the first report.
    if (selectedPaper !== journalData.whitepapers.list[0].title) {
      alert(journalData.modal.alertUpdates);
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
            {journalData.hero.title1} <span className="italic">{journalData.hero.title2}</span>
          </motion.h1>
          <motion.p className="page-subtitle" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            {journalData.hero.subtitle}
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
                <img src="/car_assembly.jpg" alt={journalData.featured.title} className="journal-image" />
              </div>
              <div className="journal-content">
                <span className="journal-meta">{journalData.featured.meta}</span>
                <h2 className="font-serif">{journalData.featured.title}</h2>
                <p>{journalData.featured.desc}</p>
                <Link to="/casestudies/automotive" className="read-more">{journalData.featured.btn} <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
              </div>
            </motion.article>

            {/* Standard Items */}
            {journalData.items.map((item, index) => (
              <motion.article key={index} className="journal-card" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} transition={{ delay: index % 2 === 0 ? 0 : 0.2 }}>
                <div className="journal-image-container">
                  <img src={index === 0 ? "/micro_chip.jpg" : index === 1 ? "/warehouse_amr.jpg" : index === 2 ? "/factory_luxury.jpg" : "/jet_turbine_robot.jpg"} alt={item.title} className="journal-image" />
                </div>
                <div className="journal-content">
                  <span className="journal-meta">{item.meta}</span>
                  <h3 className="font-serif">{item.title}</h3>
                  <p>{item.desc}</p>
                  <Link to={`/casestudies/${item.link}`} className="read-more">{journalData.featured.btn} <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
                </div>
              </motion.article>
            ))}

          </div>
        </div>
      </section>

      {/* 3. Whitepapers & Research Reports */}
      <section className="whitepapers-section">
        <div className="container">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h2 className="section-title">{journalData.whitepapers.title1} <span className="italic">{journalData.whitepapers.title2}</span></h2>
            <p className="section-subtitle">{journalData.whitepapers.subtitle}</p>
          </motion.div>

          <div className="whitepaper-grid">
            {journalData.whitepapers.list.map((wp, index) => (
              <motion.div key={index} className="whitepaper-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.2 }}>
                <FileText size={40} className="wp-icon" strokeWidth={1} />
                <h4>{wp.title}</h4>
                <p>{wp.desc}</p>
                <button className="btn btn-outline" onClick={() => handleDownloadClick(wp.title)}><Download size={16} style={{marginRight: '8px'}}/> {journalData.whitepapers.btn}</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Newsletter */}
      <section className="newsletter-section text-center">
        <div className="container">
          <motion.div className="newsletter-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Mail size={48} className="newsletter-icon" strokeWidth={1} />
            <h2 className="font-serif">{journalData.newsletter.title}</h2>
            <p>{journalData.newsletter.desc}</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder={journalData.newsletter.placeholder} required />
              <button type="submit" className="btn btn-primary">{journalData.newsletter.btn}</button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Lead Generation Modal */}
      {typeof document !== 'undefined' && createPortal(
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
                      <h3 className="font-serif">{journalData.modal.title}</h3>
                      <p>{journalData.modal.downloading} <strong>{selectedPaper}</strong></p>
                    </div>
                    
                    <form className="modal-form" onSubmit={handleFormSubmit}>
                      <p className="modal-instruction">{journalData.modal.instruction}</p>
                      <div className="form-group">
                        <input type="text" name="nama_lengkap" placeholder={journalData.modal.namePlace} required className="luxury-input" />
                      </div>
                      <div className="form-group">
                        <input type="email" name="email" placeholder={journalData.modal.emailPlace} required className="luxury-input" />
                      </div>
                      <button type="submit" className="btn btn-primary w-100" style={{width: '100%', marginTop: '1rem'}} disabled={isSubmitting}>
                        {isSubmitting ? journalData.modal.btnSending : journalData.modal.btnSubmit}
                      </button>
                      <span className="privacy-note">{journalData.modal.privacy}</span>
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
                    <h3 className="font-serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{journalData.modal.successTitle}</h3>
                    <p className="text-muted" style={{ fontSize: '1rem', maxWidth: '350px', margin: '0 auto' }}>
                      {journalData.modal.successDesc}
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
