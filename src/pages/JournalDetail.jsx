import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './JournalDetail.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function JournalDetail() {
  const { id } = useParams();
  const { t } = useLanguage();
  const journalData = t('journalDetail');
  
  const article = journalData.data[id] || journalData.data['automotive']; // Fallback to automotive if not found

  return (
    <div className="page-wrapper journal-detail-page">
      <section className="article-header">
        <div className="container">
          <Link to="/casestudies" className="back-link">
            <ArrowLeft size={16} style={{marginRight: '8px'}} /> {journalData.backBtn}
          </Link>
          
          <motion.div className="article-meta" initial="hidden" animate="visible" variants={fadeUp}>
            <span>{article.meta}</span>
          </motion.div>
          
          <motion.h1 className="font-serif article-title" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }}>
            {article.title}
          </motion.h1>
          
          <motion.p className="article-lead" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            {article.lead}
          </motion.p>
        </div>
      </section>

      <section className="article-hero-image">
        <motion.img 
          src={article.image} 
          alt={article.title} 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </section>

      <section className="article-body">
        <div className="container article-container">
          {article.content.map((section, index) => (
            <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="font-serif">{section.heading}</h3>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              
              {section.quote && (
                <blockquote className="article-quote font-serif">
                  "{section.quote}"
                </blockquote>
              )}

              {section.list && (
                <ul className="article-list">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {section.conclusion && (
                <p><em>{section.conclusion}</em></p>
              )}
            </motion.div>
          ))}
          
          <div className="article-footer">
            <Link to="/contact" className="btn btn-primary">{journalData.cta}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
