import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Zap, Globe, Heart, X, CheckCircle, Upload, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../supabaseClient';
import './Careers.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function Careers() {
  const { t } = useLanguage();
  const careersData = t('careers');
  const jobs = careersData.jobs.list;

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
    
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .insert([
          { 
            posisi: posisi,
            nama_lengkap: namaLengkap,
            email: email,
            portofolio_url: portofolioUrl,
            cv_url: cvResumeLink
          }
        ]);

      if (error) throw error;

      setIsSubmitted(true);
      setTimeout(() => {
        setSelectedJob(null);
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error("Supabase Error:", error);
      alert(`${careersData.messages.failApi} ${error.message}`);
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
            {careersData.hero.title1} <span className="italic">{careersData.hero.title2}</span>
          </motion.h1>
          <motion.p className="page-subtitle" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            {careersData.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. Culture Grid */}
      <section className="culture-section">
        <div className="container">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="section-title">{careersData.culture.title1} <span className="italic">{careersData.culture.title2}</span></h2>
            <p className="section-subtitle">{careersData.culture.subtitle}</p>
          </motion.div>

          <div className="culture-grid">
            <motion.div className="culture-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Zap size={32} className="text-primary culture-icon" />
              <h3 className="font-serif">{careersData.culture.items[0].title}</h3>
              <p>{careersData.culture.items[0].desc}</p>
            </motion.div>
            <motion.div className="culture-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
              <Users size={32} className="text-primary culture-icon" />
              <h3 className="font-serif">{careersData.culture.items[1].title}</h3>
              <p>{careersData.culture.items[1].desc}</p>
            </motion.div>
            <motion.div className="culture-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <Globe size={32} className="text-primary culture-icon" />
              <h3 className="font-serif">{careersData.culture.items[2].title}</h3>
              <p>{careersData.culture.items[2].desc}</p>
            </motion.div>
            <motion.div className="culture-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.3 }}>
              <Heart size={32} className="text-primary culture-icon" />
              <h3 className="font-serif">{careersData.culture.items[3].title}</h3>
              <p>{careersData.culture.items[3].desc}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Open Positions */}
      <section className="jobs-section" style={{ padding: '8rem 0' }}>
        <div className="container">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="section-title">{careersData.jobs.title1} <span className="italic">{careersData.jobs.title2}</span></h2>
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
                  {careersData.jobs.applyBtn} <ArrowRight size={16} style={{marginLeft: '8px'}} />
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: '4rem' }}>
            <p className="text-muted">{careersData.jobs.notMatch} <strong>careers@vinrobotik.com</strong></p>
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
                  <h3 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{careersData.modal.title}</h3>
                  <p className="text-muted" style={{ marginBottom: '2rem' }}>
                    {careersData.modal.position} <strong>{selectedJob.title}</strong>
                  </p>
                  
                  <form onSubmit={handleSubmit} className="application-form">
                    <input type="hidden" name="posisi" value={selectedJob.title} />
                    
                    <div className="form-group">
                      <label>{careersData.modal.name}</label>
                      <input type="text" name="nama_lengkap" className="app-input" required placeholder={careersData.modal.namePlace} />
                    </div>
                    
                    <div className="form-group">
                      <label>{careersData.modal.email}</label>
                      <input type="email" name="email" className="app-input" required placeholder={careersData.modal.emailPlace} />
                    </div>
                    
                    <div className="form-group">
                      <label>{careersData.modal.portofolio}</label>
                      <input type="url" name="portofolio_url" className="app-input" placeholder={careersData.modal.portofolioPlace} />
                    </div>
                    
                    <div className="form-group">
                      <label>{careersData.modal.cv}</label>
                      <input type="url" name="cv_resume_link" className="app-input" required placeholder={careersData.modal.cvPlace} />
                      <small className="text-muted" style={{display: 'block', marginTop: '0.5rem', fontSize: '0.8rem'}}>
                        {careersData.modal.cvNote}
                      </small>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                          <Loader2 size={16} className="spin" /> {careersData.modal.btnSending}
                        </span>
                      ) : careersData.modal.btnSubmit}
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
                  <h3 className="font-serif">{careersData.modal.successTitle}</h3>
                  <p className="text-muted" style={{ marginTop: '1rem' }}>
                    {careersData.modal.successDesc}
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
