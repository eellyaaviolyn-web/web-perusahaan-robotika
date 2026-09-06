import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Users, Mail, Briefcase, FileDown, TrendingUp, Loader2, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Admin.css';

export default function Dashboard() {
  const [stats, setStats] = useState({ contacts: 0, careers: 0, downloads: 0 });
  const [loading, setLoading] = useState(true);
  const [recentContacts, setRecentContacts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resC, resCa, resDl, resRecent] = await Promise.all([
          supabase.from('contacts').select('*', { count: 'exact', head: true }),
          supabase.from('job_applications').select('*', { count: 'exact', head: true }),
          supabase.from('pdf_downloads').select('*', { count: 'exact', head: true }),
          supabase.from('contacts').select('nama_lengkap, email, created_at').order('created_at', { ascending: false }).limit(5),
        ]);
        setStats({ contacts: resC.count || 0, careers: resCa.count || 0, downloads: resDl.count || 0 });
        setRecentContacts(resRecent.data || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    fetchData();
  }, []);

  const statCards = [
    { title: 'Pesan Masuk', count: stats.contacts, icon: <Mail size={20} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', link: '/admin/inbox', suffix: 'pesan baru' },
    { title: 'Pelamar Karir', count: stats.careers, icon: <Briefcase size={20} />, color: '#10b981', bg: 'rgba(16,185,129,0.12)', link: '/admin/careers', suffix: 'kandidat' },
    { title: 'Unduhan PDF', count: stats.downloads, icon: <FileDown size={20} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', link: '/admin/downloads', suffix: 'unduhan' },
    { title: 'Total Interaksi', count: stats.contacts + stats.careers + stats.downloads, icon: <Activity size={20} />, color: '#c8aa6e', bg: 'rgba(200,170,110,0.12)', link: null, suffix: 'total' },
  ];

  const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: '1rem', color: '#777' }}>
      <Loader2 className="spin" size={36} color="#c8aa6e" />
      <span>Memuat data...</span>
    </div>
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard Overview</h1>
          <p className="admin-page-sub">Selamat datang kembali di Command Center Vin Robotik</p>
        </div>
        <div className="admin-live-badge">
          <span className="admin-live-dot" />
          <span>Live</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="admin-stat-card"
          >
            <div className="admin-stat-top">
              <span className="admin-stat-label">{card.title}</span>
              <div className="admin-stat-icon-wrap" style={{ background: card.bg, color: card.color }}>
                {card.icon}
              </div>
            </div>
            <div className="admin-stat-number" style={{ color: card.color }}>{card.count}</div>
            <div className="admin-stat-bottom">
              <span className="admin-stat-suffix">{card.suffix}</span>
              {card.link && (
                <Link to={card.link} className="admin-stat-link">
                  Lihat detail <ArrowUpRight size={12} />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="admin-recent-card"
      >
        <div className="admin-recent-header">
          <h3 className="admin-section-title">Pesan Terbaru</h3>
          <Link to="/admin/inbox" className="admin-see-all">Lihat Semua <ArrowUpRight size={14} /></Link>
        </div>
        {recentContacts.length === 0 ? (
          <div className="admin-empty-state">
            <Mail size={40} style={{ opacity: 0.3 }} />
            <p>Belum ada pesan masuk</p>
          </div>
        ) : (
          <div className="admin-recent-list">
            {recentContacts.map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.06 }}
                className="admin-recent-item"
              >
                <div className="admin-recent-avatar">{c.nama_lengkap?.charAt(0).toUpperCase()}</div>
                <div className="admin-recent-info">
                  <span className="admin-recent-name">{c.nama_lengkap}</span>
                  <span className="admin-recent-email">{c.email}</span>
                </div>
                <span className="admin-recent-date">{formatDate(c.created_at)}</span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
