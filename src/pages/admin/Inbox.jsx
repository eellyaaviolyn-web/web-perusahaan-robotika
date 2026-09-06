import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Loader2, Mail, Building, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      toast.error('Gagal mengambil data pesan: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Pesan Masuk</h1>
          <p style={{ color: 'var(--text-muted)' }}>Menampilkan daftar prospek dari halaman Contact Us</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', color: '#fff' }}>
          Total: <strong>{messages.length}</strong> pesan
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          <Loader2 className="spin" size={32} style={{ marginRight: '1rem' }} /> Memuat data dari server...
        </div>
      ) : messages.length === 0 ? (
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '4rem', textAlign: 'center', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Mail size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Belum ada pesan</h3>
          <p style={{ color: 'var(--text-muted)' }}>Pesan dari calon klien akan muncul di sini.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg, idx) => (
            <motion.div 
              key={msg.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '2rem', alignItems: 'center' }}
            >
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.2rem', marginBottom: '0.3rem', color: '#fff' }}>{msg.nama_lengkap}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                  <Mail size={14} /> {msg.email}
                </div>
                {msg.nama_perusahaan && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.85rem' }}>
                    <Building size={14} /> {msg.nama_perusahaan}
                  </div>
                )}
              </div>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.02)', fontSize: '0.9rem', color: '#ddd', lineHeight: '1.5' }}>
                {msg.pesan ? `"${msg.pesan}"` : <span style={{ fontStyle: 'italic', color: '#777' }}>Tanpa pesan teks</span>}
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', justifyContent: 'flex-end' }}>
                  <Clock size={12} /> {formatDate(msg.created_at)}
                </div>
                <a 
                  href={`mailto:${msg.email}?subject=Balasan dari Vin Robotik`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(200,170,110,0.1)', color: 'var(--primary)', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500', transition: 'background 0.2s', marginTop: 'auto' }}
                >
                  Balas Email <ChevronRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
