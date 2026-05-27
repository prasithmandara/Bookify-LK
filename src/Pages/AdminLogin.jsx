import React, { useState } from 'react';
import { Logo, Input, Button } from '../components/UI';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleLogin = () => {
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1400);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--obsidian)',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Left decorative panel */}
      <div style={{
        width: '45%', minHeight: '100vh',
        background: 'linear-gradient(160deg, var(--obsidian-3) 0%, var(--obsidian-2) 100%)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '48px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Geometric decoration */}
        <div style={{
          position: 'absolute', bottom: -80, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          border: '1px solid var(--border-gold)', opacity: 0.25,
        }} />
        <div style={{
          position: 'absolute', bottom: 40, right: -160,
          width: 300, height: 300, borderRadius: '50%',
          border: '1px solid var(--border-gold)', opacity: 0.15,
        }} />
        <div style={{
          position: 'absolute', top: 120, right: 40,
          width: 1, height: 200,
          background: 'linear-gradient(180deg, transparent, var(--gold-dark), transparent)',
          opacity: 0.4,
        }} />

        <Logo size="lg" />

        <div>
          <div style={{
            display: 'inline-block',
            padding: '6px 14px', marginBottom: '24px',
            background: 'var(--gold-muted)', borderRadius: '100px',
            fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.1em',
            textTransform: 'uppercase', fontWeight: 500,
          }}>
            Admin Portal
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 300,
            color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '16px',
          }}>
            Manage your<br />
            <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>bookings</span> with ease
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '320px' }}>
            Access your complete dashboard to approve appointments, manage your services, and track revenue in real-time.
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '32px' }}>
          {[
            { value: '1,247', label: 'Customers' },
            { value: '98%', label: 'Satisfaction' },
            { value: '4.9★', label: 'Rating' },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--gold)', fontWeight: 500 }}>
                {item.value}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right login panel */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px',
      }}>
        <div style={{
          width: '100%', maxWidth: '380px',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
        }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 400,
              color: 'var(--text-primary)', marginBottom: '8px',
            }}>
              Welcome back
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              Sign in to your admin dashboard
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
            <Input
              label="Email Address"
              placeholder="admin@elitewellness.lk"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              icon="✉"
            />
            <Input
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              icon="🔒"
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--gold)' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Remember me</span>
              </label>
              <span style={{ fontSize: '13px', color: 'var(--gold)', cursor: 'pointer' }}>
                Forgot password?
              </span>
            </div>
          </div>

          {error && (
            <div style={{
              padding: '12px 16px', marginBottom: '20px',
              background: 'var(--error)15', border: '1px solid var(--error)40',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px', color: 'var(--error)',
            }}>
              ⚠ {error}
            </div>
          )}

          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  width: 16, height: 16, borderRadius: '50%',
                  border: '2px solid var(--obsidian)40',
                  borderTopColor: 'var(--obsidian)',
                  animation: 'spin 0.7s linear infinite',
                  display: 'inline-block',
                }} />
                Signing in...
              </span>
            ) : 'Sign In →'}
          </Button>

          <div style={{
            marginTop: '28px', padding: '14px', textAlign: 'center',
            background: 'var(--obsidian-3)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Demo credentials</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)' }}>
              Any email + any password
            </div>
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
            Protected by Bookify LK · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
