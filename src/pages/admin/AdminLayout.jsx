import { useEffect, useState } from 'react';
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { LayoutDashboard, Inbox, Briefcase, FileDown, LogOut, Loader2, Menu, X, Bell, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import './Admin.css';

export default function AdminLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Berhasil logout');
    navigate('/admin/login');
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
  const emailDisplay = session.user.email;

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">
            <span>VR</span>
          </div>
          {sidebarOpen && <span className="admin-brand-text">Vin Admin</span>}
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="admin-nav-label">{item.label}</span>}
              {sidebarOpen && location.pathname === item.path && (
                <ChevronRight size={14} className="admin-nav-chevron" />
              )}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          {sidebarOpen && (
            <div className="admin-user-info">
              <div className="admin-user-avatar">{initials}</div>
              <div className="admin-user-details">
                <span className="admin-user-role">Administrator</span>
                <span className="admin-user-email">{emailDisplay}</span>
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
        {/* Topbar */}
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
            <div className="admin-notification-btn">
              <Bell size={18} />
              <span className="admin-notif-dot" />
            </div>
            <div className="admin-topbar-avatar">{initials}</div>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
