import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './PasswordReset.css';
import { apiUrl } from '../../config/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Please enter your email!' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(apiUrl('/api/auth/forgot-password'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        Swal.fire({ icon: 'success', title: 'Sent!', text: data.message });
      } else {
        Swal.fire({ icon: 'error', title: 'Failed', text: data.message || 'Something went wrong' });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Server connection error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pr-body">
      <div className="pr-card">
        <h1>Forgot Password?</h1>
        <p>No worries, we'll send you reset instructions to your registered email.</p>
        <form className="pr-form" onSubmit={handleForgotSubmit}>
          <div className="pr-input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="pr-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="pr-link" onClick={() => navigate('/auth')}>
          &larr; Back to Login
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
