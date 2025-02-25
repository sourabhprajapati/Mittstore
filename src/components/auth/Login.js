import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, IconButton, Link } from "@mui/material";
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setCaptcha(generateCaptcha());
  }, []);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaValue = '';
    for (let i = 0; i < 6; i++) {
      captchaValue += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captchaValue;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs
    if (!email || !password || !captchaInput) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Validate captcha
    if (captchaInput !== captcha) {
      setError('Invalid CAPTCHA. Please try again.');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
        switch (data.user.role) {
          case 'student':
            navigate('/student-profile');
            break;
          case 'se':
            navigate('/se-profile');
            break;
          case 'school':
            navigate('/school-profile');
            break;
          default:
            setError('Unknown user type.');
        }
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
        setCaptcha(generateCaptcha());
        setCaptchaInput('');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container-login">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="new-email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="new-password"
              required
            />
          </div>
          <div className="captcha-container">
            <div className="captcha">{captcha}</div>
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="captcha-input"
              placeholder="Enter CAPTCHA"
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button 
            type="submit" 
            className="login-btn-login1"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="links">
          <Link href="/forgetpass" className="forgot-password">
            Forgot Password?
          </Link>
          <p>
            Don't have an account? <Link href="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;