import React, { useState } from 'react'
import './Login.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../api/api';

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');

    } catch (error) {
      setError('Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-page'>
      <div className='login-container'>

        <div className='login-brand'>
          <span>◉</span>
          <h2>Reliability</h2>
        </div>

        <div className='login-header'>
          <h1>Welcome back</h1>
          <p>Sign in to access your reliability platform.</p>
        </div>

        <form className='login-form' onSubmit={handleLogin}>

          <div className='form-group'>
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder='you@example.com'
              required
            />
          </div>

          <div className='form-group'>

            <div className='password-label'>
              <label>Password</label>

              <button type='button'>
                Forgot password?
              </button>
            </div>

            <input
              type="password"
              name="password"
              placeholder='Enter your password'
              required
            />

          </div>

          {
            error && (
              <p className='login-error'>
                {error}
              </p>
            )
          }

          <button
            type='submit'
            className='login-submit'
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

        </form>

        <div className='login-divider'>
          <span>or</span>
        </div>

        <button className='demo-login'>
          Continue with Demo
        </button>

        <p className='back-to-home'>
          <button onClick={() => navigate('/')}>
            ← Back to home
          </button>
        </p>

      </div>
    </div>
  )
}

export default Login;