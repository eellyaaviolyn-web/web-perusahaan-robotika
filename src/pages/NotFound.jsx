import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './NotFound.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function NotFound() {
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
          Halaman Tidak<br /><span className="italic">Ditemukan</span>
        </motion.h1>
        <motion.p variants={fadeUp}>
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan.<br />
          Kembali ke halaman utama dan lanjutkan eksplorasi.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link to="/" className="btn btn-primary">
            Kembali ke Beranda <ArrowRight size={16} style={{ marginLeft: 8 }} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
