import React, { useState } from 'react';
import { Drawer, IconButton, Link } from "@mui/material";

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sendOTP = async () => {
    setError('');
    const response = await fetch('http://localhost:5000/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (response.ok) {
      setStep(2);
      setMessage(data.message);
    } else {
      setError(data.message || 'Failed to send OTP');
    }
  };

  const resetPassword = async () => {
    setError('');
    const response = await fetch('http://localhost:5000/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      setStep(3);
    } else {
      setError(data.message || 'Failed to reset password');
    }
  };

  return (
    <div className="container-login">
      <div className="login-box">
        <h2>Forgot Password</h2>
        {step === 1 && (
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendOTP}>Send OTP</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={resetPassword}>Reset Password</button>
          </div>
        )}
        {step === 3 && <p>Password reset successfully!<Link href="/user/login">  You can now log in.</Link></p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default ForgetPassword;