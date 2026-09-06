import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { LayoutDashboard, Inbox, Briefcase, FileDown, LogOut, Loader2, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="spin" size={48} color="var(--primary)" /></div>;
  }

  if (!session) return null;

  const navItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/inbox', icon: <Inbox size={20} />, label: 'Pesan Masuk' },
    { path: '/admin/careers', icon: <Briefcase size={20} />, label: 'Pelamar Karir' },
    { path: '/admin/downloads', icon: <FileDown size={20} />, label: 'Unduhan PDF' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a' }}>
      
      {/* Sidebar */}
      <div style={{ 
        width: sidebarOpen ? '260px' : '0px', 
        background: 'rgba(15,15,15,0.95)', 
        borderRight: '1px solid rgba(255,255,255,0.05)',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 50
      }}>
        <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px' }}></div>
          <span className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap' }}>Vin Admin</span>
        </div>

        <div style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', borderRadius: '8px',
                color: location.pathname === item.path ? 'var(--primary)' : 'var(--text-muted)',
                background: location.pathname === item.path ? 'rgba(200,170,110,0.1)' : 'transparent',
                textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
            >
              {item.icon}
              <span style={{ fontSize: '0.95rem', fontWeight: location.pathname === item.path ? '600' : '400' }}>{item.label}</span>
            </Link>
          ))}
        </div>

        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={handleLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', borderRadius: '8px', transition: 'background 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={20} />
            <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: sidebarOpen ? '260px' : '0px', transition: 'margin-left 0.3s ease', display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '70px', background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 40 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{session.user.email}</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(200,170,110,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>
              {session.user.email.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

    </div>
  );
}
