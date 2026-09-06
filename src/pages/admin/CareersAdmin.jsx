import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Loader2, Briefcase, Mail, Link as LinkIcon, Download, Clock, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import './Admin.css';

export default function CareersAdmin() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchApps(); }, []);

  async function fetchApps() {
    try {
      const { data, error } = await supabase.from('job_applications').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setApps(data || []);
    } catch (error) {
      toast.error('Gagal mengambil data pelamar');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  const filtered = apps.filter(a =>
    !search || a.nama_lengkap?.toLowerCase().includes(search.toLowerCase()) ||
    a.email?.toLowerCase().includes(search.toLowerCase()) ||
    a.posisi?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Pelamar Karir</h1>
          <p className="admin-page-sub">Kandidat dari halaman Careers Vin Robotik</p>
        </div>
        <span className="admin-count-badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
          {apps.length} Pelamar
        </span>
      </div>

      <div style={{ position: 'relative', maxWidth: '400px' }}>
        <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
        <input type="text" placeholder="Cari nama, email, posisi..." value={search} onChange={(e) => setSearch(e.target.value)} className="admin-input" style={{ paddingLeft: '2.8rem', width: '100%', boxSizing: 'border-box' }} />
      </div>

      {loading ? (
        <div className="admin-empty-state"><Loader2 className="spin" size={36} color="#c8aa6e" /><span>Memuat data...</span></div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty-state">
          <Briefcase size={48} style={{ opacity: 0.3 }} />
          <p>{search ? 'Tidak ada kandidat yang cocok' : 'Belum ada pelamar'}</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kandidat</th>
                <th>Posisi</th>
                <th>Dokumen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, idx) => (
                <motion.tr key={app.id || idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                  <td style={{ color: '#555', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />{formatDate(app.created_at)}
                  </td>
                  <td>
                    <div style={{ fontWeight: '600', color: '#ddd', marginBottom: '3px' }}>{app.nama_lengkap}</div>
                    <div style={{ fontSize: '0.8rem', color: '#555', display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} />{app.email}</div>
                  </td>
                  <td>
                    <span className="admin-badge" style={{ background: 'rgba(200,170,110,0.1)', color: '#c8aa6e' }}>{app.posisi}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {app.cv_url && (
                        <a href={app.cv_url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 10px', background: 'rgba(255,255,255,0.07)', borderRadius: '6px', color: '#ccc', textDecoration: 'none', fontSize: '0.8rem', transition: 'background 0.2s' }}>
                          <Download size={13} /> CV
                        </a>
                      )}
                      {app.portofolio_url && (
                        <a href={app.portofolio_url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#ccc', textDecoration: 'none', fontSize: '0.8rem' }}>
                          <LinkIcon size={13} /> Portfolio
                        </a>
                      )}
                      {!app.cv_url && !app.portofolio_url && <span style={{ color: '#444', fontSize: '0.8rem' }}>—</span>}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
