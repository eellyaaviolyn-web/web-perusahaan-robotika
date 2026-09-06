import { useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { LayoutDashboard, Inbox, Briefcase, FileDown, LogOut, Loader2, Menu, X, Bell, ChevronRight, Mail, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import './Admin.css';

export default function AdminLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [recentMessages, setRecentMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) navigate('/admin/login');
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate('/admin/login');
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    async function fetchNotifs() {
      const { data } = await supabase
        .from('contacts')
        .select('id, nama_lengkap, email, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) {
        setRecentMessages(data);
        setUnreadCount(data.length);
      }
    }
    if (session) fetchNotifs();
  }, [session]);

  // Close notif dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Berhasil logout');
    navigate('/admin/login');
  };

  const handleNotifClick = () => {
    setNotifOpen(!notifOpen);
    setUnreadCount(0);
  };

  const formatRelative = (dateStr) => {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return `${Math.floor(diff / 86400)} hari lalu`;
  };

  if (loading) return (
    <div className="admin-loading-screen">
      <Loader2 className="spin" size={40} color="#c8aa6e" />
      <p>Memuat sistem...</p>
    </div>
  );

  if (!session) return null;

  const navItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { path: '/admin/inbox', icon: <Inbox size={18} />, label: 'Pesan Masuk' },
    { path: '/admin/careers', icon: <Briefcase size={18} />, label: 'Pelamar Karir' },
    { path: '/admin/downloads', icon: <FileDown size={18} />, label: 'Unduhan PDF' },
  ];

  const initials = session.user.email.charAt(0).toUpperCase();

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo"><span>VR</span></div>
          {sidebarOpen && <span className="admin-brand-text">Vin Admin</span>}
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
              <span className="admin-nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="admin-nav-label">{item.label}</span>}
              {sidebarOpen && location.pathname === item.path && <ChevronRight size={14} className="admin-nav-chevron" />}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          {sidebarOpen && (
            <div className="admin-user-info">
              <div className="admin-user-avatar">{initials}</div>
              <div className="admin-user-details">
                <span className="admin-user-role">Administrator</span>
                <span className="admin-user-email">{session.user.email}</span>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="admin-logout-btn" title="Logout">
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={`admin-main ${sidebarOpen ? 'with-sidebar' : ''}`}>
        <header className="admin-topbar">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="admin-toggle-btn">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="admin-topbar-breadcrumb">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="active">{navItems.find(n => location.pathname === n.path)?.label || 'Dashboard'}</span>
          </div>

          <div className="admin-topbar-right">
            {/* Notification Bell */}
            <div className="admin-notif-wrap" ref={notifRef}>
              <button className="admin-notification-btn" onClick={handleNotifClick} title="Notifikasi Pesan">
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="admin-notif-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="admin-notif-dropdown"
                  >
                    <div className="admin-notif-header">
                      <span className="admin-notif-title">Pesan Masuk</span>
                      <span className="admin-notif-count">{recentMessages.length} pesan</span>
                    </div>
                    <div className="admin-notif-list">
                      {recentMessages.length === 0 ? (
                        <div className="admin-notif-empty">
                          <Mail size={24} style={{ opacity: 0.3 }} />
                          <p>Belum ada pesan</p>
                        </div>
                      ) : (
                        recentMessages.map((msg, idx) => (
                          <div key={idx} className="admin-notif-item" onClick={() => { navigate('/admin/inbox'); setNotifOpen(false); }}>
                            <div className="admin-notif-avatar">{msg.nama_lengkap?.charAt(0).toUpperCase()}</div>
                            <div className="admin-notif-info">
                              <span className="admin-notif-name">{msg.nama_lengkap}</span>
                              <span className="admin-notif-email">{msg.email}</span>
                            </div>
                            <div className="admin-notif-time">
                              <Clock size={11} />
                              {formatRelative(msg.created_at)}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="admin-notif-footer" onClick={() => { navigate('/admin/inbox'); setNotifOpen(false); }}>
                      Lihat Semua Pesan <ChevronRight size={14} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="admin-topbar-avatar">{initials}</div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
