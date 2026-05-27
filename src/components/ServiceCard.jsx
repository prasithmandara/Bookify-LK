import React from 'react';
import { Button } from './UI';

const categoryIcons = {
  Skincare: '✦',
  Wellness: '◈',
  Beauty: '◇',
  'Nail Care': '◉',
  Hair: '◎',
};

export function ServiceCard({ service, selected, onSelect }) {
  const [hovered, setHovered] = React.useState(false);

  const formatPrice = (p) => `LKR ${p.toLocaleString('en-LK')}`;
  const formatDuration = (d) => d >= 60 ? `${Math.floor(d / 60)}h ${d % 60 > 0 ? `${d % 60}m` : ''}`.trim() : `${d}m`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: selected ? 'linear-gradient(135deg, var(--obsidian-4), var(--obsidian-3))' : 'var(--obsidian-3)',
        border: selected ? '1px solid var(--gold)' : hovered ? '1px solid var(--border-gold)' : '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '22px',
        cursor: service.available ? 'pointer' : 'default',
        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered && service.available ? 'translateY(-2px)' : 'none',
        boxShadow: selected ? '0 0 30px #c9a96e20, inset 0 0 30px #c9a96e06' : hovered ? '0 8px 24px #00000050' : 'none',
        opacity: service.available ? 1 : 0.5,
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={() => service.available && onSelect(service)}
    >
      {/* Selection indicator */}
      {selected && (
        <div style={{
          position: 'absolute', top: 14, right: 14,
          width: 22, height: 22, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="var(--obsidian)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* Popular tag */}
      {service.popular && !selected && (
        <div style={{
          position: 'absolute', top: 14, right: 14,
          padding: '3px 10px', borderRadius: '100px',
          background: 'var(--gold-muted)', border: '1px solid var(--border-gold)',
          fontSize: '10px', fontWeight: 500, color: 'var(--gold)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          Popular
        </div>
      )}

      {/* Corner accent */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 60, height: 60,
        background: selected ? 'radial-gradient(circle at bottom right, var(--gold-muted), transparent)' : 'transparent',
        transition: 'var(--transition)',
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Category + Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px', color: 'var(--gold)', opacity: 0.8 }}>
            {categoryIcons[service.category] || '◆'}
          </span>
          <span style={{
            fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            {service.category}
          </span>
        </div>

        {/* Name */}
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 500,
          color: selected ? 'var(--gold-light)' : 'var(--text-primary)', lineHeight: 1.2,
        }}>
          {service.name}
        </div>

        {/* Description */}
        <p style={{
          fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {service.description}
        </p>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '12px', borderTop: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, color: 'var(--gold)' }}>
              {formatPrice(service.price)}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              ⏱ {formatDuration(service.duration)}
            </span>
          </div>

          {!service.available && (
            <span style={{ fontSize: '12px', color: 'var(--error)', border: '1px solid var(--error)40', padding: '4px 10px', borderRadius: '100px' }}>
              Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
