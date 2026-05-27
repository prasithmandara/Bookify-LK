import React, { useState } from 'react';
import './index.css';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { Logo, Button } from './components/UI';

// Landing / nav switcher
function LandingNav({ onGoBooking, onGoAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--obsidian)', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 60% 20%, #c9a96e0a 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 10% 80%, #c9a96e06 0%, transparent 60%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Nav */}
      <nav style={{
        padding: '20px 60px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--obsidian-2)',
      }}>
        <Logo size="md" />
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="ghost" size="sm" onClick={onGoAdmin}>Admin Login</Button>
          <Button variant="primary" size="sm" onClick={onGoBooking}>Book Now</Button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: 'calc(100vh - 73px)',
        padding: '60px 40px', textAlign: 'center',
        animation: 'fadeUp 0.8s ease forwards',
      }}>
        {/* Decorative ring */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700, height: 700, borderRadius: '50%',
          border: '1px solid var(--border-gold)', opacity: 0.08,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500, height: 500, borderRadius: '50%',
          border: '1px solid var(--border-gold)', opacity: 0.12,
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '7px 18px', borderRadius: '100px', marginBottom: '32px',
          background: 'var(--gold-muted)', border: '1px solid var(--border-gold)',
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)' }} />
          <span style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.1em', fontWeight: 500, textTransform: 'uppercase' }}>
            SaaS Booking Platform · Sri Lanka
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: '72px', fontWeight: 300,
          color: 'var(--text-primary)', lineHeight: 1.05, marginBottom: '24px', maxWidth: '800px',
        }}>
          Appointments,{' '}
          <span className="gold-shimmer">reimagined</span>
          <br />for Sri Lanka
        </h1>

        <p style={{
          fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '520px',
          lineHeight: 1.7, marginBottom: '48px',
        }}>
          A luxury booking experience for salons, clinics, and tuition studios — built for Sri Lankan service businesses.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="primary" size="lg" onClick={onGoBooking}>
            Try Customer Booking →
          </Button>
          <Button variant="secondary" size="lg" onClick={onGoAdmin}>
            Admin Dashboard
          </Button>
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '64px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            'Multi-Tenant SaaS', 'JWT Auth', 'Real-Time Status', 'LKR Currency',
            'Admin Approval Flow', 'PostgreSQL', 'React + Tailwind',
          ].map(f => (
            <span key={f} style={{
              padding: '6px 14px', borderRadius: '100px',
              background: 'var(--obsidian-3)', border: '1px solid var(--border)',
              fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.04em',
            }}>
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const VIEWS = { landing: 'landing', booking: 'booking', confirmation: 'confirmation', adminLogin: 'adminLogin', adminDash: 'adminDash' };

export default function App() {
  const [view, setView] = useState(VIEWS.landing);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  return (
    <div className="grain-overlay">
      {view === VIEWS.landing && (
        <LandingNav
          onGoBooking={() => setView(VIEWS.booking)}
          onGoAdmin={() => setView(VIEWS.adminLogin)}
        />
      )}
          {view === VIEWS.booking && (
      <BookingPage
        onBack={() => setView(VIEWS.landing)}
        onConfirm={(booking) => {
          setConfirmedBooking(booking);
          setView(VIEWS.confirmation);
        }}
      />
    )}
    {view === VIEWS.confirmation && (
      <ConfirmationPage
        booking={confirmedBooking}
        onBack={() => setView(VIEWS.booking)}
        onNewBooking={() => {
          setConfirmedBooking(null);
          setView(VIEWS.booking);
        }}
      />
    )}
    {view === VIEWS.adminLogin && (
      <AdminLogin
        onBack={() => setView(VIEWS.landing)}
        onLogin={() => setView(VIEWS.adminDash)}
      />
    )}
    {view === VIEWS.adminDash && (
      <AdminDashboard onLogout={() => setView(VIEWS.adminLogin)} />
    )}
    </div>
  );
}
