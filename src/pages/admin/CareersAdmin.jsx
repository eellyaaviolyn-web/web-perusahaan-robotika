import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Loader2, Briefcase, Mail, Link as LinkIcon, Download, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function CareersAdmin() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
  }, []);

  async function fetchApps() {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApps(data || []);
    } catch (error) {
      toast.error('Gagal mengambil data pelamar: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Pelamar Karir</h1>
          <p style={{ color: 'var(--text-muted)' }}>Daftar kandidat dari halaman Careers</p>
        </div>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          Total: <strong>{apps.length}</strong> pelamar
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}><Loader2 className="spin" size={32} style={{ marginRight: '1rem' }} /> Memuat data...</div>
      ) : apps.length === 0 ? (
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '4rem', textAlign: 'center', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Briefcase size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Belum ada pelamar</h3>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.9rem' }}>Tanggal</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.9rem' }}>Kandidat</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.9rem' }}>Posisi</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.9rem' }}>Dokumen</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app, idx) => (
                <motion.tr 
                  key={app.id || idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                >
                  <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#aaa', whiteSpace: 'nowrap' }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} /> {formatDate(app.created_at)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600', color: '#fff', marginBottom: '4px' }}>{app.nama_lengkap}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> {app.email}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(200,170,110,0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500' }}>
                      {app.posisi}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {app.cv_url && (
                        <a href={app.cv_url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', textDecoration: 'none', fontSize: '0.8rem', transition: 'background 0.2s' }}>
                          <Download size={14} /> CV
                        </a>
                      )}
                      {app.portofolio_url && (
                        <a href={app.portofolio_url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', color: '#fff', textDecoration: 'none', fontSize: '0.8rem' }}>
                          <LinkIcon size={14} /> Portofolio
                        </a>
                      )}
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
