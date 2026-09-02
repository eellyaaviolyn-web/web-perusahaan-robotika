import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function LegalPage({ type }) {
  const { language } = useLanguage();
  
  const isId = language === 'id';
  
  const content = {
    privacy: {
      title: isId ? "Kebijakan Privasi" : "Privacy Policy",
      date: isId ? "Terakhir diperbarui: 2 September 2026" : "Last updated: September 2, 2026",
      body: isId ? 
        "Vin Robotik menghargai privasi Anda. Kami mengumpulkan data (seperti nama, email, perusahaan) saat Anda mengisi formulir kontak, karir, atau mengunduh dokumen. Data ini hanya digunakan untuk tujuan komunikasi bisnis dan tidak akan pernah dijual kepada pihak ketiga tanpa izin eksplisit Anda. Seluruh data disimpan dengan aman menggunakan infrastruktur kelas enterprise (Supabase/PostgreSQL) dengan perlindungan Row Level Security (RLS)."
        : "Vin Robotik respects your privacy. We collect data (such as name, email, company) when you fill out contact, careers, or document download forms. This data is used solely for business communication purposes and will never be sold to third parties without your explicit permission. All data is securely stored using enterprise-grade infrastructure (Supabase/PostgreSQL) with Row Level Security (RLS) protection."
    },
    terms: {
      title: isId ? "Syarat dan Ketentuan" : "Terms of Service",
      date: isId ? "Terakhir diperbarui: 2 September 2026" : "Last updated: September 2, 2026",
      body: isId ?
        "Dengan mengakses dan menggunakan situs web Vin Robotik, Anda setuju untuk mematuhi syarat dan ketentuan kami. Seluruh konten, desain, dan informasi produk di situs ini adalah hak kekayaan intelektual Vin Robotik. Kami berhak mengubah spesifikasi produk dan layanan tanpa pemberitahuan sebelumnya. Penggunaan logo dan materi website untuk keperluan komersial tanpa izin tertulis dilarang keras."
        : "By accessing and using the Vin Robotik website, you agree to comply with our terms and conditions. All content, design, and product information on this site are the intellectual property of Vin Robotik. We reserve the right to change product specifications and services without prior notice. Use of logos and website materials for commercial purposes without written permission is strictly prohibited."
    }
  };

  const current = content[type];

  return (
    <div className="page-wrapper" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="glass-panel" style={{ padding: '3rem' }}>
          <h1 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{current.title}</h1>
          <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>{current.date}</p>
          
          <div style={{ lineHeight: '1.8', color: 'var(--text-color)' }}>
            <p>{current.body}</p>
            <br />
            <p>
              {isId ? "Jika Anda memiliki pertanyaan tentang kebijakan ini, silakan hubungi kami di " : "If you have any questions regarding these policies, please contact us at "}
              <a href="mailto:corporate@vinrobotik.com" style={{ color: 'var(--primary)' }}>corporate@vinrobotik.com</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
