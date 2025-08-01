import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './seller.css';

export default function SellerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await axios.post('https://gecco-for-kids.onrender.com/api/sellers/login', {
        email,
        password,
      });
      localStorage.setItem('sellerToken', res.data.token);
      navigate('/seller/panel');
    } catch (err) {
      setMsg('Correo o contraseña incorrectos');
    }
  };

  // Si el usuario no tiene token y viene de /privatevendor, permanece en login
  const handleBack = () => {
    const token = localStorage.getItem('sellerToken');
    if (token) {
      navigate('/privatevendor');
    } else {
      navigate('/seller/login');
    }
  };

  return (
    <div className="sellerlogin-bg-gradient">
      <div className="sellerlogin-center-container" style={{ position: 'relative' }}>
        <span
          className="back-home-arrow"
          onClick={handleBack}
          title="Volver al inicio"
        >
          &#8592;
        </span>
        <div className="sellerlogin-card">
          <div className="sellerlogin-icon-circle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke="currentColor" className="sellerlogin-main-icon">
              <circle cx="24" cy="24" r="22" stroke="#10b981" strokeWidth="2" fill="#f5f7ff" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 32c0-4 8-4 8-8s-8-4-8-8 8-4 8-8" stroke="#10b981" />
            </svg>
          </div>
          <h1 className="sellerlogin-title">Panel de Vendedor</h1>
          <p className="sellerlogin-subtitle">Acceso exclusivo para vendedores</p>
          <form onSubmit={handleLogin} className="sellerlogin-form">
            <div className="sellerlogin-input-group">
              <label htmlFor="email" className="sellerlogin-label">Correo electrónico</label>
              <input
                id="email"
                type="email"
                className="sellerlogin-input"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="sellerlogin-input-group">
              <label htmlFor="password" className="sellerlogin-label">Contraseña</label>
              <div className="sellerlogin-password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="sellerlogin-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span onClick={() => setShowPassword(!showPassword)} className="sellerlogin-eye-icon">
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </span>
              </div>
            </div>
            {msg && (
              <div className="sellerlogin-message-error">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#ef4444" style={{marginRight:8}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"/></svg>
                {msg}
              </div>
            )}
            <button
              type="submit"
              className="sellerlogin-button"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="sellerlogin-footer">
            <p>¿No tienes cuenta?{' '}
              <span
                style={{ color: '#10b981', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                onClick={() => navigate('/seller/register')}
              >
                Regístrate
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
