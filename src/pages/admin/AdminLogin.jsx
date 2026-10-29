import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2, Eye, EyeOff, ShieldAlert, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import './Admin.css';

// Whitelist email yang diizinkan mengakses Admin
export const ALLOWED_ADMIN_EMAILS = [
  'vinrobotik@gmail.com'
];

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 detik

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const navigate = useNavigate();

  // Cek status lockout dari localStorage saat komponen dibuka
  useEffect(() => {
    const checkLockout = () => {
      const storedUntil = localStorage.getItem('vr_admin_lockout_until');
      const storedAttempts = parseInt(localStorage.getItem('vr_admin_attempts') || '0', 10);
      setFailedAttempts(storedAttempts);

      if (storedUntil) {
        const remainingMs = parseInt(storedUntil, 10) - Date.now();
        if (remainingMs > 0) {
          setLockoutSeconds(Math.ceil(remainingMs / 1000));
        } else {
          localStorage.removeItem('vr_admin_lockout_until');
          localStorage.removeItem('vr_admin_attempts');
          setLockoutSeconds(0);
          setFailedAttempts(0);
        }
      }
    };

    checkLockout();
  }, []);

  // Timer hitung mundur lockout
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          localStorage.removeItem('vr_admin_lockout_until');
          localStorage.removeItem('vr_admin_attempts');
          setFailedAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();

      // Autentikasi dengan Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (error) throw error;

      // Verifikasi peran Administrator (RBAC Whitelist)
      if (!ALLOWED_ADMIN_EMAILS.includes(cleanEmail)) {
        await supabase.auth.signOut();
        toast.error('Akses Ditolak: Akun Anda tidak memiliki hak akses Administrator.', { duration: 5000 });
        setIsLoading(false);
        return;
      }

      // Berhasil: Bersihkan data proteksi brute-force
      localStorage.removeItem('vr_admin_lockout_until');
      localStorage.removeItem('vr_admin_attempts');
      setFailedAttempts(0);

      toast.success('Verifikasi Berhasil! Selamat datang.', { icon: '🔐' });
      navigate('/admin/dashboard');
    } catch (error) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      localStorage.setItem('vr_admin_attempts', newAttempts.toString());

      if (newAttempts >= MAX_FAILED_ATTEMPTS) {
        const lockUntil = Date.now() + LOCKOUT_DURATION_MS;
        localStorage.setItem('vr_admin_lockout_until', lockUntil.toString());
        setLockoutSeconds(60);
        toast.error('Keamanan: Terlalu banyak percobaan gagal. Akses login dikunci selama 60 detik!', {
          duration: 6000,
          icon: '🛡️'
        });
      } else {
        const sisa = MAX_FAILED_ATTEMPTS - newAttempts;
        toast.error(`Email atau password salah. (Sisa ${sisa}x percobaan)`, { duration: 4000 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isLocked = lockoutSeconds > 0;

  return (
    <div className="admin-login-bg">
      {/* Animated background grid */}
      <div className="admin-login-grid" />

      {/* Glow orbs */}
      <div className="admin-orb admin-orb-1" />
      <div className="admin-orb admin-orb-2" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="admin-login-card"
      >
        {/* Logo & Header */}
        <div className="admin-login-header">
          <motion.div
            className="admin-login-logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="admin-logo-hex">
              <Lock size={22} color="#0a0a0a" />
            </div>
          </motion.div>
          <h1 className="admin-login-title">Vin Robotik</h1>
          <p className="admin-login-subtitle">Admin Command Center</p>
          <div className="admin-login-divider" />
        </div>

        {/* Security Warning / Lockout Banner */}
        {isLocked ? (
          <div className="admin-lockout-alert">
            <ShieldAlert size={20} />
            <span>
              <strong>Sistem Dikunci:</strong> Terdeteksi aktivitas mencurigakan. Coba lagi dalam <strong>{lockoutSeconds} detik</strong>.
            </span>
          </div>
        ) : failedAttempts >= 3 ? (
          <div className="admin-lockout-alert warning">
            <AlertTriangle size={18} />
            <span>
              Peringatan Keamanan: {failedAttempts} kali gagal. Form akan terkunci jika mencapai {MAX_FAILED_ATTEMPTS} kali.
            </span>
          </div>
        ) : null}

        {/* Form */}
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-field">
            <label className="admin-label">Email Admin</label>
            <div className="admin-input-wrap">
              <Mail size={16} className="admin-input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLocked || isLoading}
                className="admin-input"
                placeholder="vinrobotik@gmail.com"
              />
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-label">Password</label>
            <div className="admin-input-wrap">
              <Lock size={16} className="admin-input-icon" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLocked || isLoading}
                className="admin-input"
                style={{ paddingRight: '3rem' }}
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="admin-eye-btn"
                disabled={isLocked}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isLocked}
            className="admin-login-btn"
          >
            {isLoading ? (
              <><Loader2 className="spin" size={18} /> Memverifikasi...</>
            ) : isLocked ? (
              <><ShieldAlert size={18} /> Terkunci ({lockoutSeconds}s)</>
            ) : (
              <><span>Masuk ke Dashboard</span><ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <p className="admin-login-footer">Dilindungi oleh Proteksi Anti Brute-Force & Enkripsi Supabase</p>
      </motion.div>
    </div>
  );
}
