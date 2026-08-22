import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './Contact.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function Contact() {
  const location = useLocation();
  const [industry, setIndustry] = useState('Otomotif & Manufaktur Berat');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (location.state) {
      if (location.state.industry) setIndustry(location.state.industry);
      
      if (location.state.fromPdf) {
        setDetails('[SUMBER: PDF SIMULATOR] Mohon kirimkan salinan Laporan Proyeksi ROI (PDF) berdasarkan simulasi yang baru saja saya lakukan ke email bisnis ini.');
      } else if (location.state.solution || location.state.timeline) {
        setDetails(`[SUMBER: JURNAL INOVASI] Saya tertarik dengan solusi ${location.state.solution || 'robotika'} untuk diimplementasikan pada ${location.state.timeline || 'waktu dekat'}. Mohon informasikan ketersediaan tim engineer Anda.`);
      } else {
        setDetails('[SUMBER: KONTAK UMUM] Saya ingin berdiskusi mengenai...');
      }
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const namaLengkap = formData.get("nama_lengkap");
    const jabatan = formData.get("jabatan");
    const emailBisnis = formData.get("email_bisnis");
    
    const notionPayload = {
      parent: { database_id: "3becd578414980c78adbe286226c07bc" },
      properties: {
        "Nama Lengkap": {
          title: [{ text: { content: namaLengkap } }]
        },
        "Email Bisnis": {
          email: emailBisnis
        },
        "Jabatan": {
          rich_text: [{ text: { content: jabatan } }]
        },
        "Sektor Industri": {
          multi_select: [{ name: industry }]
        },
        "Detail Kebutuhan": {
          rich_text: [{ text: { content: details } }]
        }
      }
    };
    
    try {
      const response = await fetch("/api/notion/v1/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(notionPayload)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setDetails('');
        e.target.reset();
        // Remove ugly native alert
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        console.error("Notion Error:", errorData);
        alert(`Gagal: ${errorData.message}`);
      }
    } catch (error) {
      alert("Koneksi gagal. Silakan periksa internet Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper contact-page">
      <section className="page-hero">
        <div className="container">
          <motion.h1 className="font-serif page-title" initial="hidden" animate="visible" variants={fadeUp}>
            {location.state?.fromPdf ? (
              <>Unduh Laporan <span className="italic">PDF</span></>
            ) : (
              <>Reservasi <span className="italic">Konsultasi</span></>
            )}
          </motion.h1>
          <motion.p className="page-subtitle" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            {location.state?.fromPdf 
              ? "Silakan lengkapi profil perusahaan Anda. Sistem kami akan segera mengirimkan laporan proyeksi ROI ke email bisnis Anda."
              : "Silakan hubungi kami untuk mendiskusikan transformasi otomatisasi fasilitas Anda."}
          </motion.p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className={`contact-layout ${location.state?.fromPdf ? 'pdf-layout' : ''}`}>
            
            {!location.state?.fromPdf && (
              <motion.div className="contact-info" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-serif">Kantor Pusat Global</h2>
              <p className="info-desc">Bagi klien VVIP kami, kunjungan langsung ke fasilitas pusat perakitan Vin Robotik dapat dijadwalkan melalui undangan khusus.</p>
              
              <ul className="info-list">
                <li>
                  <MapPin size={24} className="text-primary"/>
                  <div>
                    <h4>Vin Robotik Tower</h4>
                    <p>Jl. Jend. Sudirman Kav 20, SCBD<br/>Jakarta Selatan, Indonesia 12190</p>
                  </div>
                </li>
                <li>
                  <Phone size={24} className="text-primary"/>
                  <div>
                    <h4>Direct Line</h4>
                    <p>+62 811-2233-4455</p>
                  </div>
                </li>
                <li>
                  <Mail size={24} className="text-primary"/>
                  <div>
                    <h4>Enterprise Inquiry</h4>
                    <p>corporate@vinrobotik.com</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            )}

            <motion.div className={`contact-form-container ${location.state?.fromPdf ? 'centered-form' : ''}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    className="luxury-form" 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input type="text" name="nama_lengkap" className="luxury-input" placeholder="contoh: Vinzkie" required />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Jabatan</label>
                        <input type="text" name="jabatan" className="luxury-input" placeholder="contoh: Plant Manager" required />
                      </div>
                      <div className="form-group">
                        <label>Email Bisnis</label>
                        <input type="email" name="email_bisnis" className="luxury-input" placeholder="nama@perusahaan.com" required />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Sektor Industri</label>
                      <select className="luxury-input" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                        <option value="Otomotif & Manufaktur Berat">Otomotif & Manufaktur Berat</option>
                        <option value="Elektronik & Semikonduktor">Elektronik & Semikonduktor</option>
                        <option value="Logistik & Pergudangan">Logistik & Pergudangan</option>
                        <option value="Farmasi & F&B">Farmasi & F&B</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Detail Kebutuhan Proyek</label>
                      <textarea 
                        className="luxury-input" 
                        rows="4" 
                        placeholder="Jelaskan secara singkat tantangan di lini produksi Anda..."
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? "MENGIRIM..." : (location.state?.fromPdf ? "KIRIMKAN PDF KE EMAIL SAYA" : "KIRIM PERMINTAAN")} <ArrowRight size={16} style={{marginLeft: '8px'}} />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    className="success-state text-center" 
                    style={{ padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    >
                      <CheckCircle size={72} className="text-primary" style={{ marginBottom: '1.5rem' }} />
                    </motion.div>
                    <h3 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Permintaan Terkirim</h3>
                    <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto' }}>
                      {location.state?.fromPdf 
                        ? "Terima kasih! Dokumen Laporan Proyeksi ROI (PDF) sedang diproses dan akan segera mendarat di kotak masuk (inbox) email bisnis Anda dalam beberapa menit." 
                        : "Terima kasih atas ketertarikan Anda. Tim Principal Engineer kami telah menerima data Anda dan akan segera menghubungi Anda untuk menjadwalkan sesi konsultasi eksklusif."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
