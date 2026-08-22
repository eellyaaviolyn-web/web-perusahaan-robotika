import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import './FAQ.css';

export default function FAQ() {
  const faqs = [
    {
      question: 'Berapa lama estimasi pengembalian modal (ROI) investasi robotika ini?',
      answer: 'Rata-rata klien kami mencapai pemulihan investasi (ROI) dalam kurun waktu 12 hingga 24 bulan, tergantung skala integrasi dan jam operasional pabrik.'
    },
    {
      question: 'Apakah robot dapat dioperasikan oleh karyawan yang tidak memiliki latar belakang pemrograman?',
      answer: 'Ya. Robot seri Cobot dan AMR kami dilengkapi dengan antarmuka grafis yang intuitif (GUI) dan fitur drag-and-drop, serta dukungan pelatihan dari tim kami.'
    },
    {
      question: 'Bagaimana jika terjadi kendala teknis pada mesin robot?',
      answer: 'Kami menyediakan modul diagnostik jarak jauh (remote diagnostics) untuk penanganan instan, serta dukungan teknisi lapangan langsung untuk perbaikan fisik.'
    }
  ];

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
          <h1 className="section-title">Pusat Bantuan <span className="italic">Terpadu</span></h1>
          <p className="section-subtitle">Temukan jawaban teknis atau hubungi concierge VVIP kami secara langsung.</p>
          
          <div className="faq-search-container">
            <Search size={20} className="search-icon text-muted" />
            <input 
              type="text" 
              className="faq-search-input font-serif" 
              placeholder="Cari topik (contoh: instalasi, keamanan, garansi...)" 
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
                <p>Topik tidak ditemukan. Silakan hubungi Concierge kami.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Floating Chat Button Mockup */}
      <div className="floating-chat" onClick={() => alert("Menghubungkan ke VVIP Concierge...")}>
        <MessageCircle size={28} />
      </div>
    </div>
  );
}
