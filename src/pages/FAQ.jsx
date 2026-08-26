import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './FAQ.css';

export default function FAQ() {
  const { t } = useLanguage();
  const faqData = t('faq');
  const faqs = faqData.list;

  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-wrapper faq-page">
      <section className="faq-hero">
        <div className="container text-center">
          <h1 className="section-title">{faqData.hero.title1} <span className="italic">{faqData.hero.title2}</span></h1>
          <p className="section-subtitle">{faqData.hero.subtitle}</p>
          
          <div className="faq-search-container">
            <Search size={20} className="search-icon text-muted" />
            <input 
              type="text" 
              className="faq-search-input font-serif" 
              placeholder={faqData.hero.placeholder} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="faq-content">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="accordion">
            {filteredFaqs.length > 0 ? filteredFaqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                className={`accordion-item glass-panel ${activeIndex === idx ? 'active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div 
                  className="accordion-header"
                  onClick={() => toggleAccordion(idx)}
                >
                  <h3>{faq.question}</h3>
                  <div className={`accordion-icon ${activeIndex === idx ? 'rotated' : ''}`}>
                    <ChevronDown size={24} />
                  </div>
                </div>
                
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div 
                      className="accordion-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="accordion-content">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )) : (
              <div className="text-center text-muted" style={{padding: '3rem 0'}}>
                <p>{faqData.notFound}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Floating Chat Button Mockup */}
      <div className="floating-chat" onClick={() => alert(faqData.chatAlert)}>
        <MessageCircle size={28} />
      </div>
    </div>
  );
}
