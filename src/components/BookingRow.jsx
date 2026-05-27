import React from 'react';
import { StatusBadge, Button } from './UI';

export function BookingRow({ booking, onUpdateStatus }) {
  const [expanded, setExpanded] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const formatPrice = (p) => `LKR ${p.toLocaleString('en-LK')}`;

  const initials = booking.customer.name
    .split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: '44px 1fr 1fr 120px 110px 160px',
          alignItems: 'center',
          gap: '16px',
          padding: '16px 20px',
          background: hovered ? 'var(--obsidian-4)' : 'transparent',
          borderBottom: '1px solid var(--border)',
          transition: 'background 0.2s ease',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
          color: 'var(--obsidian)', flexShrink: 0,
        }}>
          {initials}
        </div>

        {/* Customer */}
        <div>
          <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
            {booking.customer.name}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {booking.customer.phone}
          </div>
        </div>

        {/* Service */}
        <div>
          <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{booking.service.name}</div>
          <div style={{ fontSize: '12px', color: 'var(--gold)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
            {formatPrice(booking.service.price)}
          </div>
        </div>

        {/* Date / Time */}
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          <div>{booking.date}</div>
          <div style={{ color: 'var(--text-muted)' }}>{booking.time}</div>
        </div>

        {/* ID */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '12px',
          color: 'var(--gold-dark)', letterSpacing: '0.08em',
        }}>
          #{booking.id}
        </div>

        {/* Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <StatusBadge status={booking.status} />
          <div style={{
            marginLeft: 'auto', fontSize: '14px', color: 'var(--text-muted)',
            transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease',
          }}>
            ▾
          </div>
        </div>
      </div>

      {/* Expanded row */}
      {expanded && (
        <div style={{
          padding: '16px 20px 20px',
          background: 'var(--obsidian-2)',
          borderBottom: '1px solid var(--border)',
          display: 'grid', gridTemplateColumns: '1fr auto',
          gap: '20px', alignItems: 'end',
          animation: 'fadeIn 0.2s ease',
        }}>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Email</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{booking.customer.email}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Duration</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{booking.service.duration} minutes</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Booked On</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{booking.createdAt}</div>
            </div>
            {booking.notes && (
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Notes</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{booking.notes}"</div>
              </div>
            )}
          </div>

          {booking.status === 'Pending' && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="danger" size="sm" onClick={() => onUpdateStatus(booking.id, 'Cancelled')}>
                Decline
              </Button>
              <Button variant="success" size="sm" onClick={() => onUpdateStatus(booking.id, 'Confirmed')}>
                ✓ Confirm
              </Button>
            </div>
          )}
          {booking.status === 'Confirmed' && (
            <Button variant="ghost" size="sm" onClick={() => onUpdateStatus(booking.id, 'Completed')}>
              Mark Complete
            </Button>
          )}
        </div>
      )}
    </>
  );
}
