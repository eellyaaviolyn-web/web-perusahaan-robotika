import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Users, Mail, Briefcase, FileDown, TrendingUp, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    careers: 0,
    downloads: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [resContacts, resCareers, resDownloads] = await Promise.all([
          supabase.from('contacts').select('*', { count: 'exact', head: true }),
          supabase.from('job_applications').select('*', { count: 'exact', head: true }),
          supabase.from('pdf_downloads').select('*', { count: 'exact', head: true })
        ]);

        setStats({
          contacts: resContacts.count || 0,
          careers: resCareers.count || 0,
          downloads: resDownloads.count || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) return <div style={{display:'flex', gap:'10px', alignItems:'center'}}><Loader2 className="spin" /> Memuat data...</div>;

  const statCards = [
    { title: 'Total Pesan Masuk', count: stats.contacts, icon: <Mail size={24} />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    { title: 'Total Pelamar Kerja', count: stats.careers, icon: <Briefcase size={24} />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    { title: 'Unduhan Katalog PDF', count: stats.downloads, icon: <FileDown size={24} />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    { title: 'Total Interaksi', count: stats.contacts + stats.careers + stats.downloads, icon: <TrendingUp size={24} />, color: 'var(--primary)', bg: 'rgba(200, 170, 110, 0.1)' },
  ];

  return (
    <div>
      <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Ringkasan data interaksi website Vin Robotik</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {statCards.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
          >
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{card.title}</p>
              <h2 className="font-serif" style={{ fontSize: '2.5rem', m: 0, color: '#fff' }}>{card.count}</h2>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {card.icon}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div style={{ marginTop: '3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '2rem' }}>
        <h3 className="font-serif" style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Panduan Admin</h3>
        <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
          <li>Gunakan menu navigasi di sebelah kiri untuk melihat detail data dari setiap tabel.</li>
          <li>Data ditampilkan secara langsung (real-time) dari server Supabase perusahaan Anda.</li>
          <li>Ingat untuk melakukan <strong>Logout</strong> jika mengakses halaman ini dari perangkat publik.</li>
        </ul>
      </div>
    </div>
  );
}
