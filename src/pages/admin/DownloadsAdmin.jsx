import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Loader2, FileDown, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function DownloadsAdmin() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloads();
  }, []);

  async function fetchDownloads() {
    try {
      const { data, error } = await supabase
        .from('pdf_downloads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDownloads(data || []);
    } catch (error) {
      toast.error('Gagal mengambil data unduhan: ' + error.message);
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
          <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Data Unduhan PDF</h1>
          <p style={{ color: 'var(--text-muted)' }}>Prospek (Leads) dari halaman Jurnal / Studi Kasus</p>
        </div>
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          Total: <strong>{downloads.length}</strong> unduhan
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}><Loader2 className="spin" size={32} style={{ marginRight: '1rem' }} /> Memuat data...</div>
      ) : downloads.length === 0 ? (
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '4rem', textAlign: 'center', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <FileDown size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Belum ada unduhan</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {downloads.map((dl, idx) => (
            <motion.div 
              key={dl.id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: '500' }}>
                <FileDown size={16} /> {dl.dokumen}
              </div>
              
              <h3 className="font-serif" style={{ fontSize: '1.2rem', marginBottom: '0.3rem', color: '#fff' }}>{dl.nama_lengkap}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                <Mail size={14} /> {dl.email}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#777', fontSize: '0.8rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Clock size={12} /> Diunduh pada: {formatDate(dl.created_at)}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
