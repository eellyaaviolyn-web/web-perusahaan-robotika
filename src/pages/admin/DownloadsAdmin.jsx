import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Loader2, FileDown, Mail, Clock, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import './Admin.css';

export default function DownloadsAdmin() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchDownloads(); }, []);

  async function fetchDownloads() {
    try {
      const { data, error } = await supabase.from('pdf_downloads').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setDownloads(data || []);
    } catch (error) {
      toast.error('Gagal mengambil data unduhan');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const filtered = downloads.filter(d =>
    !search || d.nama_lengkap?.toLowerCase().includes(search.toLowerCase()) ||
    d.email?.toLowerCase().includes(search.toLowerCase()) ||
    d.dokumen?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Unduhan PDF</h1>
          <p className="admin-page-sub">Leads dari fitur unduhan katalog & jurnal</p>
        </div>
        <span className="admin-count-badge" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' }}>
          {downloads.length} Unduhan
        </span>
      </div>

      <div style={{ position: 'relative', maxWidth: '400px' }}>
        <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
        <input type="text" placeholder="Cari nama, email, dokumen..." value={search} onChange={(e) => setSearch(e.target.value)} className="admin-input" style={{ paddingLeft: '2.8rem', width: '100%', boxSizing: 'border-box' }} />
      </div>

      {loading ? (
        <div className="admin-empty-state"><Loader2 className="spin" size={36} color="#c8aa6e" /><span>Memuat data...</span></div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty-state">
          <FileDown size={48} style={{ opacity: 0.3 }} />
          <p>{search ? 'Tidak ada unduhan yang cocok' : 'Belum ada data unduhan'}</p>
        </div>
      ) : (
        <div className="admin-dl-grid">
          {filtered.map((dl, idx) => (
            <motion.div key={dl.id || idx} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.06 }} className="admin-dl-card">
              <div className="admin-dl-badge"><FileDown size={13} />{dl.dokumen}</div>
              <div className="admin-dl-name">{dl.nama_lengkap}</div>
              <div className="admin-dl-email"><Mail size={13} />{dl.email}</div>
              <div className="admin-dl-date"><Clock size={12} />Diunduh: {formatDate(dl.created_at)}</div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
