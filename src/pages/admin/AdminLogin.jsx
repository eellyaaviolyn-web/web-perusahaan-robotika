import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import './Admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Selamat datang kembali!', { icon: '🔐' });
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Email atau password salah.');
    } finally {
      setIsLoading(false);
    }
  };

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
                className="admin-input"
                placeholder="admin@vinrobotik.com"
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
                className="admin-input"
                style={{ paddingRight: '3rem' }}
                placeholder="••••••••••"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="admin-eye-btn">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="admin-login-btn">
            {isLoading ? (
              <><Loader2 className="spin" size={18} /> Memverifikasi...</>
            ) : (
              <><span>Masuk ke Dashboard</span><ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <p className="admin-login-footer">Akses terbatas untuk staf Vin Robotik</p>
      </motion.div>
    </div>
  );
}
