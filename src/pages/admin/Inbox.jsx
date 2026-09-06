import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Loader2, Mail, Building, Clock, ChevronRight, Search, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import './Admin.css';

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchMessages(); }, []);

  async function fetchMessages() {
    try {
      const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      toast.error('Gagal mengambil data pesan');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const filtered = messages.filter(m =>
    !search || m.nama_lengkap?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase()) ||
    m.nama_perusahaan?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Pesan Masuk</h1>
          <p className="admin-page-sub">Prospek dan pertanyaan dari halaman Hubungi Kami</p>
        </div>
        <span className="admin-count-badge" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.25)' }}>
          {messages.length} Pesan
        </span>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: '400px' }}>
        <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
        <input
          type="text"
          placeholder="Cari nama, email, perusahaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input"
          style={{ paddingLeft: '2.8rem', width: '100%', boxSizing: 'border-box' }}
        />
      </div>

      {loading ? (
        <div className="admin-empty-state"><Loader2 className="spin" size={36} color="#c8aa6e" /><span>Memuat data...</span></div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty-state">
          <MessageSquare size={48} style={{ opacity: 0.3 }} />
          <p>{search ? 'Tidak ada pesan yang cocok' : 'Belum ada pesan masuk'}</p>
        </div>
      ) : (
        <div className="admin-msg-list">
          {filtered.map((msg, idx) => (
            <motion.div key={msg.id || idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="admin-msg-card">
              <div>
                <div className="admin-msg-sender-name">{msg.nama_lengkap}</div>
                <div className="admin-msg-meta"><Mail size={13} />{msg.email}</div>
                {msg.nama_perusahaan && <div className="admin-msg-company"><Building size={13} />{msg.nama_perusahaan}</div>}
              </div>
              <div className="admin-msg-body">
                {msg.pesan ? `"${msg.pesan}"` : <span style={{ fontStyle: 'italic', color: '#555' }}>Tanpa pesan teks</span>}
              </div>
              <div className="admin-msg-actions">
                <div className="admin-msg-date"><Clock size={12} />{formatDate(msg.created_at)}</div>
                <a href={`mailto:${msg.email}?subject=Balasan dari Vin Robotik`} className="admin-reply-btn">
                  Balas Email <ChevronRight size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
