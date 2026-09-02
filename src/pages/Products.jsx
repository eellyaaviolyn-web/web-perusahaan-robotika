import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Products.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const PRODUCTS_META = [
  { slug: 'titanium-arm', image: '/robot-black.jpg', categories: ['Industrial', 'Manufacturing'] },
  { slug: 'v-cobot',      image: '/robot-green.png', categories: ['Industrial', 'Hospitality'] },
  { slug: 'aero-amr',    image: '/robot-boxy.png',  categories: ['Logistics', 'Security'] },
];

export default function Products() {
  const { t } = useLanguage();
  const productsData = t('products');

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['All', 'Industrial', 'Manufacturing', 'Hospitality', 'Logistics', 'Security'];

  const enriched = productsData.items.map((item, i) => ({
    ...item,
    ...PRODUCTS_META[i],
    index: i,
  }));

  const filtered = enriched.filter((p) => {
    const matchesFilter = activeFilter === 'All' || p.categories.includes(activeFilter);
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

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

      {/* ── SEARCH & FILTER BAR ── */}
      <section className="products-filter-bar">
        <div className="container">
          <motion.div
            className="filter-controls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}
          >
            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`filter-tab ${activeFilter === tab ? 'active' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="product-search-wrap">
              <Search size={16} className="product-search-icon" />
              <input
                type="text"
                placeholder="Cari produk..."
                className="product-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="product-gallery">
        <div className="container">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              filtered.map((product, idx) => (
                <motion.div
                  key={product.slug}
                  className={`product-showcase ${idx % 2 !== 0 ? 'reverse' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  layout
                >
                  {idx % 2 === 0 ? (
                    <>
                      <motion.div className="product-image" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {/* Category badges on image */}
                        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {product.categories.map(c => (
                            <span key={c} style={{ background: 'rgba(0,0,0,0.6)', color: '#00ff88', padding: '3px 10px', borderRadius: '20px', fontSize: '0.7rem', border: '1px solid rgba(0,255,136,0.4)', backdropFilter: 'blur(4px)' }}>{c}</span>
                          ))}
                        </div>
                      </motion.div>
                      <motion.div className="product-details" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <h4 className="product-category">{product.category}</h4>
                        <h2 className="font-serif product-name">{product.name}</h2>
                        <p className="product-desc">{product.desc}</p>
                        <ul className="product-specs">
                          {product.specs.map((spec, i) => (<li key={i}><span>{spec.label}</span> : {spec.value}</li>))}
                        </ul>
                        <Link to={`/products/${product.slug}`} className="discover-link mt-4">{product.link} <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div className="product-details" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <h4 className="product-category">{product.category}</h4>
                        <h2 className="font-serif product-name">{product.name}</h2>
                        <p className="product-desc">{product.desc}</p>
                        <ul className="product-specs">
                          {product.specs.map((spec, i) => (<li key={i}><span>{spec.label}</span> : {spec.value}</li>))}
                        </ul>
                        <Link to={`/products/${product.slug}`} className="discover-link mt-4">{product.link} <ArrowRight size={16} style={{marginLeft: '8px'}} /></Link>
                      </motion.div>
                      <motion.div className="product-image" style={{ position: 'relative' }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {product.categories.map(c => (
                            <span key={c} style={{ background: 'rgba(0,0,0,0.6)', color: '#00ff88', padding: '3px 10px', borderRadius: '20px', fontSize: '0.7rem', border: '1px solid rgba(0,255,136,0.4)', backdropFilter: 'blur(4px)' }}>{c}</span>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-muted"
                style={{ padding: '6rem 0' }}
              >
                <p style={{ fontSize: '1.2rem' }}>Produk tidak ditemukan untuk pencarian "<strong>{searchQuery}</strong>"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
