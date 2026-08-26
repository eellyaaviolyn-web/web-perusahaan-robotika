import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Products.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function Products() {
  const { t } = useLanguage();
  const productsData = t('products');

  return (
    <div className="page-wrapper products-page">
      <section className="page-hero">
        <div className="container">
          <motion.h1 className="font-serif page-title" initial="hidden" animate="visible" variants={fadeUp}>
            {productsData.hero.title1} <span className="italic">{productsData.hero.title2}</span>
          </motion.h1>
          <motion.p className="page-subtitle" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            {productsData.hero.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="product-gallery">
        <div className="container">
          {productsData.items.map((product, index) => (
            <div className={`product-showcase ${index % 2 !== 0 ? 'reverse' : ''}`} key={index}>
              {index % 2 === 0 ? (
                <>
                  <motion.div className="product-image" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                    <img src={index === 0 ? "/robot-black.jpg" : index === 1 ? "/robot-green.png" : "/robot-boxy.png"} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                  <motion.div className="product-details" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <h4 className="product-category">{product.category}</h4>
                    <h2 className="font-serif product-name">{product.name}</h2>
                    <p className="product-desc">{product.desc}</p>
                    <ul className="product-specs">
                      {product.specs.map((spec, i) => (
                        <li key={i}><span>{spec.label}</span> : {spec.value}</li>
                      ))}
                    </ul>
                    <Link to={`/products/${index}`} className="discover-link mt-4">{product.link} <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div className="product-details" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <h4 className="product-category">{product.category}</h4>
                    <h2 className="font-serif product-name">{product.name}</h2>
                    <p className="product-desc">{product.desc}</p>
                    <ul className="product-specs">
                      {product.specs.map((spec, i) => (
                        <li key={i}><span>{spec.label}</span> : {spec.value}</li>
                      ))}
                    </ul>
                    <Link to={`/products/${index}`} className="discover-link mt-4">{product.link} <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
                  </motion.div>
                  <motion.div className="product-image" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                    <img src={index === 0 ? "/robot-black.jpg" : index === 1 ? "/robot-green.png" : "/robot-boxy.png"} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
