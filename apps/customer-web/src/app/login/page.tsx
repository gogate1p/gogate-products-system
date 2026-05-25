'use client';

import { useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const path = mode === 'login' ? '/auth/login' : '/auth/register';
    const body =
      mode === 'login'
        ? { email, password }
        : { email, password, role: 'CUSTOMER', profile: { fullName: email.split('@')[0] } };
    const res = await fetch(`${API}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.accessToken) {
      localStorage.setItem('gp_token', data.accessToken);
      window.location.href = '/account/orders';
    } else {
      alert(data.message || 'Auth failed');
    }
  }

  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: 400 }}>
      <h1>{mode === 'login' ? 'Login' : 'Sign up'}</h1>
      <form onSubmit={submit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">{mode === 'login' ? 'Login' : 'Create account'}</button>
      </form>
      <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login'}
      </button>
    </div>
  );
}
