import { motion } from 'framer-motion';
import { Settings, Shield, Zap, Target, PenTool, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
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
  const { t } = useLanguage();
  const servicesData = t('services');

  return (
    <div className="page-wrapper services-page">
      {/* 1. Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.h1 className="font-serif page-title" initial="hidden" animate="visible" variants={fadeUp}>
            {servicesData.hero.title1} <span className="italic">{servicesData.hero.title2}</span>
          </motion.h1>
          <motion.p className="page-subtitle" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            {servicesData.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. Core Services */}
      <section className="services-list-section">
        <div className="container">
          <motion.div className="services-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            
            <motion.div className="service-card" variants={fadeUp}>
              <div className="service-icon"><Zap size={40} strokeWidth={1} /></div>
              <h3 className="font-serif">{servicesData.core[0].title}</h3>
              <p>{servicesData.core[0].desc}</p>
            </motion.div>

            <motion.div className="service-card" variants={fadeUp}>
              <div className="service-icon"><Settings size={40} strokeWidth={1} /></div>
              <h3 className="font-serif">{servicesData.core[1].title}</h3>
              <p>{servicesData.core[1].desc}</p>
            </motion.div>

            <motion.div className="service-card" variants={fadeUp}>
              <div className="service-icon"><Shield size={40} strokeWidth={1} /></div>
              <h3 className="font-serif">{servicesData.core[2].title}</h3>
              <p>{servicesData.core[2].desc}</p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 3. Methodology */}
      <section className="methodology-section">
        <div className="container">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h2 className="section-title">{servicesData.methodology.title1} <span className="italic">{servicesData.methodology.title2}</span></h2>
            <p className="section-subtitle">{servicesData.methodology.subtitle}</p>
          </motion.div>

          <div className="methodology-timeline">
            <div className="timeline-line"></div>
            
            {[
              { icon: <Target size={32} className="step-icon" />, num: "01" },
              { icon: <PenTool size={32} className="step-icon" />, num: "02" },
              { icon: <Zap size={32} className="step-icon" />, num: "03" },
              { icon: <CheckCircle size={32} className="step-icon" />, num: "04" }
            ].map((step, i) => (
              <motion.div key={i} className="timeline-step" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="step-number">{step.num}</div>
                <div className="step-content">
                  {step.icon}
                  <h3 className="font-serif">{servicesData.methodology.steps[i].title}</h3>
                  <p>{servicesData.methodology.steps[i].desc}</p>
                </div>
              </motion.div>
            ))}
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
            <h2 className="font-serif">{servicesData.sla.title1} <span className="italic">{servicesData.sla.title2}</span></h2>
            <p>
              {servicesData.sla.desc}
            </p>
            <div className="sla-stats">
              <div>
                <h4>{servicesData.sla.stat1}</h4>
                <span>{servicesData.sla.stat1Desc}</span>
              </div>
              <div className="divider"></div>
              <div>
                <h4>{servicesData.sla.stat2}</h4>
                <span>{servicesData.sla.stat2Desc}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="services-cta text-center">
        <div className="container">
          <motion.h2 className="font-serif section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {servicesData.cta.title}
          </motion.h2>
          <motion.p className="section-subtitle" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
            {servicesData.cta.subtitle}
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
             <Link to="/contact" className="btn btn-primary">{servicesData.cta.btn} <ArrowRight size={16} style={{marginLeft: '8px'}}/></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
