import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleResetSubmit(e) {
    e.preventDefault();
    setResetError('');
    setResetMessage('');
    setResetLoading(true);
    try {
      await resetPassword(resetEmail);
      setResetMessage('Password reset link sent! Check your email inbox.');
    } catch (err) {
      setResetError('Could not send reset email. Please check the address.');
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-600/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-md w-full glass rounded-2xl shadow-glow-lg p-8 relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src="/logo.png" alt="FashionIQ" className="h-16 w-auto" />
        </div>

        {!showReset ? (
          <>
            <p className="text-center text-ink-400 mb-6 text-sm">Login to your account</p>

            {error && (
              <div className="bg-red-500/10 text-red-400 border border-red-500/20 text-sm rounded-lg px-3 py-2 mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink-100 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-ink-800 border border-ink-800 text-white placeholder-ink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-ink-100">Password</label>
                  <button
                    type="button"
                    onClick={() => { setShowReset(true); setResetEmail(email); setResetMessage(''); setResetError(''); }}
                    className="text-xs text-primary-400 hover:text-primary-300 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-ink-800 border border-ink-800 text-white placeholder-ink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="text-center text-sm text-ink-400 mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-400 font-medium hover:text-primary-300">
                Register
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="text-center text-ink-400 mb-6 text-sm">Reset your password</p>

            {resetMessage && (
              <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm rounded-lg px-3 py-2 mb-4">
                {resetMessage}
              </div>
            )}
            {resetError && (
              <div className="bg-red-500/10 text-red-400 border border-red-500/20 text-sm rounded-lg px-3 py-2 mb-4">
                {resetError}
              </div>
            )}

            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink-100 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-ink-800 border border-ink-800 text-white placeholder-ink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50"
              >
                {resetLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="text-center text-sm text-ink-400 mt-4">
              <button onClick={() => setShowReset(false)} className="text-primary-400 font-medium hover:text-primary-300">
                ← Back to Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}