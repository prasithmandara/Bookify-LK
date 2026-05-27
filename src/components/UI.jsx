import React from 'react';

// ─── Button ───────────────────────────────────────────────────
export function Button({ children, variant = 'primary', size = 'md', onClick, disabled, fullWidth, style }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: '8px', fontFamily: 'var(--font-body)', fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer', border: 'none',
    borderRadius: 'var(--radius-sm)', transition: 'var(--transition)',
    width: fullWidth ? '100%' : 'auto', opacity: disabled ? 0.5 : 1,
    letterSpacing: '0.02em', whiteSpace: 'nowrap',
  };

  const sizes = {
    sm: { padding: '8px 16px', fontSize: '13px' },
    md: { padding: '12px 24px', fontSize: '14px' },
    lg: { padding: '16px 36px', fontSize: '15px' },
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-light) 100%)',
      color: 'var(--obsidian)',
      boxShadow: '0 4px 20px #c9a96e30',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--gold)',
      border: '1px solid var(--gold)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border)',
    },
    danger: {
      background: 'transparent',
      color: 'var(--error)',
      border: '1px solid var(--error)40',
    },
    success: {
      background: 'var(--success)15',
      color: 'var(--success)',
      border: '1px solid var(--success)40',
    },
  };

  const hoverMap = {
    primary: { filter: 'brightness(1.1)', transform: 'translateY(-1px)', boxShadow: '0 8px 30px #c9a96e40' },
    secondary: { background: 'var(--gold-muted)', transform: 'translateY(-1px)' },
    ghost: { borderColor: 'var(--text-muted)', color: 'var(--text-primary)' },
    danger: { background: 'var(--error)15', transform: 'translateY(-1px)' },
    success: { background: 'var(--success)25', transform: 'translateY(-1px)' },
  };

  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...base,
        ...sizes[size],
        ...variants[variant],
        ...(hovered && !disabled ? hoverMap[variant] : {}),
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ─── StatusBadge ──────────────────────────────────────────────
export function StatusBadge({ status }) {
  const map = {
    Pending: { bg: '#d4a84b18', color: '#d4a84b', border: '#d4a84b40', dot: '#d4a84b' },
    Confirmed: { bg: '#5cb88a18', color: '#5cb88a', border: '#5cb88a40', dot: '#5cb88a' },
    Completed: { bg: '#9a949018', color: '#9a9490', border: '#9a949040', dot: '#9a9490' },
    Cancelled: { bg: '#e05c5c18', color: '#e05c5c', border: '#e05c5c40', dot: '#e05c5c' },
  };

  const s = map[status] || map.Pending;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '4px 12px', borderRadius: '100px',
      background: s.bg, color: s.color,
      border: `1px solid ${s.border}`,
      fontSize: '12px', fontWeight: 500, fontFamily: 'var(--font-body)',
      letterSpacing: '0.04em',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────
export function Card({ children, style, onClick, hoverable }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{
        background: 'var(--obsidian-3)',
        border: `1px solid ${hovered ? 'var(--border-gold)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        transition: 'var(--transition)',
        cursor: onClick ? 'pointer' : 'default',
        transform: hovered && hoverable ? 'translateY(-2px)' : 'none',
        boxShadow: hovered && hoverable ? 'var(--shadow-gold)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────
export function GoldDivider({ style }) {
  return (
    <div style={{
      height: '1px',
      background: 'linear-gradient(90deg, transparent, var(--gold-dark), var(--gold), var(--gold-dark), transparent)',
      opacity: 0.4,
      ...style,
    }} />
  );
}

// ─── Input ────────────────────────────────────────────────────
export function Input({ label, placeholder, value, onChange, type = 'text', icon }) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {label && (
        <label style={{
          fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
          color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{
            position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)', fontSize: '16px', pointerEvents: 'none',
          }}>
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%', padding: icon ? '12px 16px 12px 42px' : '12px 16px',
            background: 'var(--obsidian-4)',
            border: `1px solid ${focused ? 'var(--gold)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '14px',
            outline: 'none', transition: 'var(--transition)',
            boxShadow: focused ? '0 0 0 3px var(--gold-muted)' : 'none',
          }}
        />
      </div>
    </div>
  );
}

// ─── Logo ─────────────────────────────────────────────────────
export function Logo({ size = 'md' }) {
  const sizes = { sm: { f: 18, s: 11 }, md: { f: 24, s: 13 }, lg: { f: 36, s: 16 } };
  const s = sizes[size];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: s.f + 8, height: s.f + 8,
        background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
        borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width={s.f - 4} height={s.f - 4} viewBox="0 0 20 20" fill="none">
          <rect x="3" y="5" width="14" height="13" rx="2" stroke="var(--obsidian)" strokeWidth="1.5"/>
          <path d="M7 3v4M13 3v4" stroke="var(--obsidian)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 11h8M6 14h5" stroke="var(--obsidian)" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: `${s.f}px`, fontWeight: 600, color: 'var(--gold-light)', lineHeight: 1 }}>
          Bookify
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: `${s.s}px`, color: 'var(--gold-dark)', letterSpacing: '0.15em', lineHeight: 1.2 }}>
          LK
        </div>
      </div>
    </div>
  );
}
