import React, { useEffect, useState } from 'react';
import { Logo, Button, GoldDivider } from '../components/UI';

export default function ConfirmationPage({ booking, onNewBooking, onBack }) {
  const [visible, setVisible] = useState(false);
  const formatPrice = (p) => p ? `LKR ${p.toLocaleString('en-LK')}` : '';

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--obsidian)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #c9a96e10 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Decorative rings */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400, height: 400, borderRadius: '50%',
        border: '1px solid var(--border-gold)',
        opacity: 0.2, animation: 'fadeIn 1s ease 0.5s both',
      }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        border: '1px solid var(--border-gold)',
        opacity: 0.1, animation: 'fadeIn 1s ease 0.7s both',
      }} />

      {/* Star field */}
    {[...Array(24)].map((_, i) => (
      <div key={i} style={{
        position: 'fixed',
        top: `${Math.sin(i * 137.5) * 50 + 50}%`,
        left: `${Math.cos(i * 137.5) * 50 + 50}%`,
        width: i % 4 === 0 ? 2 : 1,
        height: i % 4 === 0 ? 2 : 1,
        borderRadius: '50%',
        background: 'var(--gold)',
        opacity: 0.08 + (i % 5) * 0.04,
        pointerEvents: 'none',
        animation: `fadeIn ${1 + (i % 3) * 0.5}s ease ${i * 0.1}s both`,
      }} />
    ))}

      <div style={{
        maxWidth: '520px', width: '100%',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <Logo size="lg" />
        </div>

        {/* Success Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 60px #c9a96e50',
            animation: 'fadeIn 0.5s ease 0.3s both',
          }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M8 18l7 7 13-13"
                stroke="var(--obsidian)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '44px', fontWeight: 300,
            color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '12px',
          }}>
            Booking{' '}
            <span className="gold-shimmer">Received</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Your appointment request has been submitted successfully.<br />
            We'll notify you via SMS and email once confirmed.
          </p>
        </div>

        {/* Booking Card */}
        <div style={{
          background: 'var(--obsidian-3)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '28px',
        }}>
          {/* Reference Header */}
          <div style={{
            padding: '18px 28px',
            background: 'linear-gradient(135deg, var(--obsidian-4), var(--obsidian-3))',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Reference ID
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 500,
              color: 'var(--gold)', letterSpacing: '0.08em',
            }}>
              #{booking?.id}
            </div>
          </div>

          <div style={{ padding: '28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Service</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', color: 'var(--text-primary)' }}>
                  {booking?.service?.name}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Amount</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', color: 'var(--gold)' }}>
                  {formatPrice(booking?.service?.price)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Date</div>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                  {booking?.date?.dayName}, {booking?.date?.dayNum} {booking?.date?.month}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Time</div>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {booking?.time?.time}
                </div>
              </div>
            </div>

            <GoldDivider style={{ marginBottom: '20px' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Name</div>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{booking?.customer?.name}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Status</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--pending)' }} />
                  <span style={{ fontSize: '14px', color: 'var(--pending)', fontWeight: 500 }}>Awaiting Confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Steps */}
        <div style={{
          padding: '20px 24px',
          background: 'var(--obsidian-3)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '32px',
        }}>
          {[
            { icon: '📱', text: 'You\'ll receive an SMS confirmation shortly' },
            { icon: '✉', text: `Confirmation email sent to ${booking?.customer?.email}` },
            { icon: '⏰', text: 'Arrive 10 minutes early for your appointment' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 0',
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="ghost" size="lg" onClick={onBack} fullWidth>
            ← Go Home
          </Button>
          <Button variant="ghost" size="lg" onClick={onNewBooking} fullWidth>
            Book Another
          </Button>
          <Button variant="primary" size="lg" onClick={() => window.print()} fullWidth>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
