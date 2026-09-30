import { motion } from 'framer-motion';
import { ArrowRight, Globe, Award, TrendingUp, Eye, Target, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function About() {
  const { t } = useLanguage();
  const aboutData = t('about');

  return (
    <div className="page-wrapper about-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.h1 className="font-serif page-title" initial="hidden" animate="visible" variants={fadeUp}>
            {aboutData.hero.title1} <br/><span className="italic">{aboutData.hero.title2}</span>
          </motion.h1>
          <motion.p className="page-subtitle" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            {aboutData.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="visi-misi-section">
        <div className="container">
          <motion.div className="text-center visi-misi-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-serif section-title">{aboutData.visiMisi.sectionTitle1} <span className="italic">{aboutData.visiMisi.sectionTitle2}</span></h2>
            <p className="section-subtitle">{aboutData.visiMisi.sectionSubtitle}</p>
          </motion.div>

          <div className="visi-misi-grid">
            {/* Visi */}
            <motion.div className="visi-card" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="vm-card-header">
                <div className="vm-icon-wrap vm-icon-visi">
                  <Eye size={28} />
                </div>
                <span className="vm-label">{aboutData.visiMisi.visiLabel}</span>
              </div>
              <h3 className="font-serif vm-title">{aboutData.visiMisi.visiTitle}</h3>
              <p className="vm-desc">{aboutData.visiMisi.visiDesc}</p>
            </motion.div>

            {/* Misi */}
            <motion.div className="misi-card" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="vm-card-header">
                <div className="vm-icon-wrap vm-icon-misi">
                  <Target size={28} />
                </div>
                <span className="vm-label">{aboutData.visiMisi.misiLabel}</span>
              </div>
              <h3 className="font-serif vm-title">{aboutData.visiMisi.misiTitle}</h3>
              <ul className="vm-misi-list">
                {aboutData.visiMisi.misiItems.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3 }}>
                    <CheckCircle size={16} className="vm-check-icon" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy & Research (Zig-Zag) */}

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <motion.div className="about-text" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-serif">{aboutData.philosophy.title}</h2>
              <p>{aboutData.philosophy.p1}</p>
              <p>{aboutData.philosophy.p2}</p>
            </motion.div>
            <motion.div className="about-image" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="placeholder-image relative-container">
                <img src="/factory_luxury.jpg" alt="Fasilitas Manufaktur Vin Robotik" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
            </motion.div>
          </div>

          <div className="about-grid reverse-grid mt-8">
            <motion.div className="about-image" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="placeholder-image relative-container">
                <img src="/micro_chip.jpg" alt="Riset dan Inovasi Robotika" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
            </motion.div>
            <motion.div className="about-text" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-serif">{aboutData.research.title}</h2>
              <p>{aboutData.research.p1}</p>
              <p dangerouslySetInnerHTML={{__html: aboutData.research.p2}}></p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Quote */}
      <section className="quote-section">
        <div className="container text-center">
          <motion.div className="quote-box" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="font-serif quote-text">
              {aboutData.quote.text}
            </p>
            <div className="quote-author">
              <h4 className="font-serif">{aboutData.quote.author}</h4>
              <span>{aboutData.quote.role}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="section-title">{aboutData.timeline.title1} <span className="italic">{aboutData.timeline.title2}</span></h2>
            <p className="section-subtitle">{aboutData.timeline.subtitle}</p>
          </motion.div>

          <div className="timeline-wrapper">
            <div className="timeline-center-line"></div>
            
            {aboutData.timeline.items.map((item, index) => (
              <div key={index} className={`timeline-row ${index % 2 === 0 ? 'left' : 'right'}`}>
                <motion.div className="timeline-box" initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="font-serif">{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Grid */}
      <section className="impact-section">
        <div className="container">
          <div className="impact-grid">
            {[
              { icon: <Globe size={40} className="impact-icon" strokeWidth={1} />, item: aboutData.impact[0], delay: 0 },
              { icon: <Award size={40} className="impact-icon" strokeWidth={1} />, item: aboutData.impact[1], delay: 0.2 },
              { icon: <TrendingUp size={40} className="impact-icon" strokeWidth={1} />, item: aboutData.impact[2], delay: 0.4 }
            ].map((impact, i) => (
              <motion.div key={i} className="impact-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: impact.delay }}>
                {impact.icon}
                <h3 className="font-serif">{impact.item.title}</h3>
                <p>{impact.item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta text-center">
        <div className="container">
          <motion.h2 className="font-serif section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {aboutData.cta.title}
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
             <Link to="/products" className="btn btn-primary">{aboutData.cta.btn} <ArrowRight size={16} style={{marginLeft: '8px'}}/></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
