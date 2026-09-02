import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../supabaseClient';
import './Contact.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function Contact() {
  const location = useLocation();
  const { t, language } = useLanguage();
  const contactData = t('contact');
  
  const [industry, setIndustry] = useState(contactData.form.ind1);
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIndustry(contactData.form.ind1);
  }, [language]);

  useEffect(() => {
    if (location.state) {
      if (location.state.industry) setIndustry(location.state.industry);
      
      if (location.state.fromPdf) {
        setDetails(contactData.messages.pdfDetails);
      } else if (location.state.solution || location.state.timeline) {
        let text = contactData.messages.journalDetails;
        text = text.replace('{solution}', location.state.solution || 'robotika');
        text = text.replace('{timeline}', location.state.timeline || 'waktu dekat');
        setDetails(text);
      } else {
        setDetails(contactData.messages.generalDetails);
      }
    }
  }, [location, language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const namaLengkap = formData.get("nama_lengkap");
    const jabatan = formData.get("jabatan");
    const emailBisnis = formData.get("email_bisnis");
    
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          { 
            nama_lengkap: namaLengkap,
            email: emailBisnis,
            nama_perusahaan: industry,
            pesan: `Jabatan: ${jabatan}\n\nDetail:\n${details}`
          }
        ]);

      if (error) throw error;

      setIsSubmitted(true);
      setDetails('');
      e.target.reset();
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (error) {
      console.error("Supabase Error:", error);
      alert(`${contactData.messages.failApi} ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper contact-page">
      <section className="page-hero">
        <div className="container">
          <motion.h1 className="font-serif page-title" initial="hidden" animate="visible" variants={fadeUp}>
            {location.state?.fromPdf ? (
              <>{contactData.hero.pdfTitle1} <span className="italic">{contactData.hero.pdfTitle2}</span></>
            ) : (
              <>{contactData.hero.title1} <span className="italic">{contactData.hero.title2}</span></>
            )}
          </motion.h1>
          <motion.p className="page-subtitle" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            {location.state?.fromPdf 
              ? contactData.hero.pdfSubtitle
              : contactData.hero.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className={`contact-layout ${location.state?.fromPdf ? 'pdf-layout' : ''}`}>
            
            {!location.state?.fromPdf && (
              <motion.div className="contact-info" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-serif">{contactData.info.title}</h2>
              <p className="info-desc">{contactData.info.desc}</p>
              
              <ul className="info-list">
                <li>
                  <MapPin size={24} className="text-primary"/>
                  <div>
                    <h4>{contactData.info.hq}</h4>
                    <p>{contactData.info.address1}<br/>{contactData.info.address2}</p>
                  </div>
                </li>
                <li>
                  <Phone size={24} className="text-primary"/>
                  <div>
                    <h4>{contactData.info.phone}</h4>
                    <p>+62 811-2233-4455</p>
                  </div>
                </li>
                <li>
                  <Mail size={24} className="text-primary"/>
                  <div>
                    <h4>{contactData.info.email}</h4>
                    <p>corporate@vinrobotik.com</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            )}

            <motion.div className={`contact-form-container ${location.state?.fromPdf ? 'centered-form' : ''}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    className="luxury-form" 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="form-group">
                      <label>{contactData.form.name}</label>
                      <input type="text" name="nama_lengkap" className="luxury-input" placeholder={contactData.form.namePlace} required />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>{contactData.form.role}</label>
                        <input type="text" name="jabatan" className="luxury-input" placeholder={contactData.form.rolePlace} required />
                      </div>
                      <div className="form-group">
                        <label>{contactData.form.email}</label>
                        <input type="email" name="email_bisnis" className="luxury-input" placeholder={contactData.form.emailPlace} required />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>{contactData.form.industry}</label>
                      <select className="luxury-input" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                        <option value={contactData.form.ind1}>{contactData.form.ind1}</option>
                        <option value={contactData.form.ind2}>{contactData.form.ind2}</option>
                        <option value={contactData.form.ind3}>{contactData.form.ind3}</option>
                        <option value={contactData.form.ind4}>{contactData.form.ind4}</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>{contactData.form.details}</label>
                      <textarea 
                        className="luxury-input" 
                        rows="4" 
                        placeholder={contactData.form.detailsPlace}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <><Loader2 size={16} className="spin" style={{marginRight: '8px'}} /> {contactData.form.btnSending}</>
                      ) : (
                        <>{location.state?.fromPdf ? contactData.form.btnPdf : contactData.form.btnSubmit} <ArrowRight size={16} style={{marginLeft: '8px'}} /></>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    className="success-state text-center" 
                    style={{ padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    >
                      <CheckCircle size={72} className="text-primary" style={{ marginBottom: '1.5rem' }} />
                    </motion.div>
                    <h3 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{contactData.messages.successTitle}</h3>
                    <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto' }}>
                      {location.state?.fromPdf 
                        ? contactData.messages.successPdf 
                        : contactData.messages.successGeneral}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
