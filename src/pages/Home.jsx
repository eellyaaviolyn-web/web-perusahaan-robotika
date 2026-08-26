import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Cpu, Shield, Zap, Star, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Particles from '../components/Particles';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.2
    } 
  }
};

const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export default function Home() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const homeData = t('home');

  return (
    <div className="home">
      {/* 1. Cinematic Full-Screen Hero */}
      <section className="hero-section">
        <div className="hero-bg">
          <motion.img 
            src="/building.jpg" 
            alt="Vin Robotik Headquarters" 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content-centered">
          <motion.div 
            variants={staggerContainer}
            initial="hidden" 
            animate="visible" 
          >
            <motion.span variants={fadeUp} className="hero-kicker">{homeData.hero.kicker}</motion.span>
            <motion.h1 variants={fadeUp} className="hero-title font-serif">
              {homeData.hero.title1}<br/>
              <span className="italic">{homeData.hero.title2}</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Floating Actions */}
        <div className="booking-bar-wrapper container">
          <motion.div 
            className="hero-actions"
            style={{ justifyContent: 'center', marginTop: '2rem' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link to="/contact" className="btn btn-primary hover-target">{homeData.hero.consult} <ArrowRight size={18} className="ml-2" /></Link>
            <Link to="/collection" className="btn btn-outline hover-target" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>{homeData.hero.system}</Link>
          </motion.div>
        </div>
      </section>

      {/* Client Logo Marquee */}
      <section className="client-marquee-section">
        <div className="marquee-container">
          <div className="marquee-track">
            {Array(2).fill([
              "AERO DYNAMICS", "QUANTUM TECH", "NEURAL AUTO", "STEELWORKS", "GLOBAL MED", "VANGUARD"
            ]).flat().map((logo, index) => (
              <div key={index} className="marquee-item font-serif">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {homeData.stats.map((stat, i) => (
              <motion.div
                key={i}
                className="stat-item"
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
              >
                <span className="stat-number font-serif">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            {[
              { icon: <Cpu size={32} />, item: homeData.features[0] },
              { icon: <Zap size={32} />, item: homeData.features[1] },
              { icon: <Shield size={32} />, item: homeData.features[2] }
            ].map((feat, i) => (
              <motion.div key={i} className="feature-card" variants={staggerChild}>
                <div className="feature-icon">{feat.icon}</div>
                <h3 className="font-serif">{feat.item.title}</h3>
                <p>{feat.item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. Philosophy Section (Boutique Layout) */}
      <section className="philosophy-section">
        <div className="container">
          <div className="boutique-grid">
            <motion.div 
              className="boutique-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="section-title" style={{ textAlign: 'left' }}>{homeData.philosophy.title1} <br/><span className="italic">{homeData.philosophy.title2}</span></h2>
              <p>
                {homeData.philosophy.p1}
              </p>
              <p>
                <span dangerouslySetInnerHTML={{__html: homeData.philosophy.p2.replace('zero downtime', '<em>zero downtime</em>')}}></span>
              </p>
              <Link to="/about" className="btn-link">
                {homeData.philosophy.link} <ArrowRight size={16} />
              </Link>
            </motion.div>
            
            <motion.div 
              className="boutique-image-container"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
            >
              <div className="boutique-image">
                <img src="/home_efficiency.jpg" alt="Efisiensi Robotika" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 3. Exclusive Collection */}
      <section className="collection-section">
        <div className="container">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="section-title">{homeData.collection.title1} <span className="italic">{homeData.collection.title2}</span></h2>
            <p className="section-subtitle">{homeData.collection.subtitle}</p>
          </motion.div>

          <motion.div 
            className="collection-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { img: "/robot-black.jpg", item: homeData.collection.items[0] },
              { img: "/robot-green.png", item: homeData.collection.items[1] },
              { img: "/robot-boxy.png", item: homeData.collection.items[2] }
            ].map((col, i) => (
              <motion.div key={i} className="collection-card" variants={fadeUp}>
                <div className="card-image-wrapper">
                  <motion.img 
                    whileHover={{ scale: 1.1 }} 
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={col.img} alt={col.item.title} className="image-placeholder" style={{ objectFit: 'cover' }} />
                </div>
                <div className="card-content">
                  <h3 className="font-serif">{col.item.title}</h3>
                  <p>{col.item.desc}</p>
                  <Link to="/products" className="discover-link">{homeData.collection.link} <ArrowRight size={16}/></Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. The Experience */}
      <section className="experience-section">
        <div className="container">
          <div className="experience-layout">
            <motion.div 
              className="experience-image"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
               <img src="/building.jpg" alt="Vin Robotik Experience" />
            </motion.div>
            <motion.div 
              className="experience-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="section-title" style={{ textAlign: 'left' }}>{homeData.experience.title1} <span className="italic">{homeData.experience.title2}</span></h2>
              <ul className="luxury-list">
                {[
                  { icon: <Star size={24} className="text-primary"/>, item: homeData.experience.items[0] },
                  { icon: <Shield size={24} className="text-primary"/>, item: homeData.experience.items[1] },
                  { icon: <Clock size={24} className="text-primary"/>, item: homeData.experience.items[2] }
                ].map((exp, i) => (
                  <li key={i}>
                    {exp.icon}
                    <div>
                      <h4 className="font-serif">{exp.item.title}</h4>
                      <p>{exp.item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Immersive CTA */}
      <section className="cta-immersive">
        <div className="cta-overlay"></div>
        <div className="container cta-content">
          <motion.h2 className="font-serif" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {homeData.cta.title1} <br/><span className="italic">{homeData.cta.title2}</span>
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {homeData.cta.desc}
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Link to="/contact" className="btn btn-primary">{homeData.cta.btn}</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
