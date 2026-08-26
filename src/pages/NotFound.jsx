import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './NotFound.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function NotFound() {
  const { t } = useLanguage();
  const nfData = t('notFound');
  return (
    <div className="notfound-page">
      <motion.div
        className="notfound-content"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.span className="notfound-code font-serif" variants={fadeUp}>404</motion.span>
        <motion.h1 className="font-serif" variants={fadeUp}>
          {nfData.title1}<br /><span className="italic">{nfData.title2}</span>
        </motion.h1>
        <motion.p variants={fadeUp} style={{ whiteSpace: 'pre-line' }}>
          {nfData.desc}
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link to="/" className="btn btn-primary">
            {nfData.btn} <ArrowRight size={16} style={{ marginLeft: 8 }} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
