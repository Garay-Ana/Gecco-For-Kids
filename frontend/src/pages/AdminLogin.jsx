import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await axios.post('https://gecco-for-kids.onrender.com/api/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      navigate('/admin/panel');
    } catch (err) {
      setMsg('Credenciales incorrectas. Intente nuevamente.');
    }
  };

  return (
    <div className="adminlogin-bg-gradient">
      <div className="adminlogin-center-container" style={{ position: 'relative' }}>
        <div className="adminlogin-card">
          <div className="adminlogin-icon-circle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke="currentColor" className="adminlogin-main-icon">
              <circle cx="24" cy="24" r="22" stroke="#4f46e5" strokeWidth="2" fill="#f5f7ff" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 18V16a4 4 0 118 0v2m-8 0a4 4 0 108 0m-9 12a4 4 0 1010 0m-10 0c0-2.21 3.134-4 5-4s5 1.79 5 4" stroke="#4f46e5" />
            </svg>
          </div>
          <h1 className="adminlogin-title">Panel Administrativo</h1>
          <p className="adminlogin-subtitle">Acceso exclusivo para administradores</p>
          <form onSubmit={handleLogin} className="adminlogin-form">
            <div className="adminlogin-input-group">
              <label htmlFor="email" className="adminlogin-label">Correo electrónico</label>
              <input
                id="email"
                type="email"
                className="adminlogin-input"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="adminlogin-input-group">
              <label htmlFor="password" className="adminlogin-label">Contraseña</label>
              <div className="adminlogin-password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="adminlogin-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span onClick={() => setShowPassword(!showPassword)} className="adminlogin-eye-icon">
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </span>
              </div>
            </div>
            <div className="adminlogin-options">
              <div className="adminlogin-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Recordarme</label>
              </div>
              <a href="#" className="adminlogin-forgot">¿Olvidó su contraseña?</a>
            </div>
            {msg && (
              <div className="adminlogin-message-error">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#ef4444" style={{marginRight:8}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"/></svg>
                {msg}
              </div>
            )}
            <button
              type="submit"
              className="adminlogin-button"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="adminlogin-footer">
            <p>¿Necesita ayuda? <a href="#">Contacte al soporte</a></p>
            <p style={{marginTop: '0.7em'}}>
              ¿No tienes cuenta?{' '}
              <span
                style={{ color: '#6366f1', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                onClick={() => navigate('/admin/register')}
              >
                Regístrate
              </span>
            </p>
          </div>
        </div>

        {/* ← Botón de regresar fijo, fuera del card */}
        <span
          className="back-home-arrow"
          onClick={() => navigate('/privateadmin')}
          title="Volver al inicio"
        >
          &#8592;
        </span>
      </div>
    </div>
  );
}
