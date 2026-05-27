import React from 'react';

// ─── DatePill ─────────────────────────────────────────────────
export function DatePill({ date, selected, onSelect }) {
  const [hovered, setHovered] = React.useState(false);
  const isSelected = selected;

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(date)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        padding: '12px 16px', minWidth: '60px', flexShrink: 0,
        background: isSelected
          ? 'linear-gradient(135deg, var(--gold-dark), var(--gold))'
          : hovered ? 'var(--obsidian-4)' : 'var(--obsidian-3)',
        border: isSelected ? '1px solid var(--gold-light)' : `1px solid ${hovered ? 'var(--border-gold)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isSelected ? '0 4px 20px #c9a96e40' : 'none',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600,
        color: isSelected ? 'var(--obsidian)' : 'var(--text-muted)',
        letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        {date.dayName}
      </span>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600,
        color: isSelected ? 'var(--obsidian)' : 'var(--text-primary)',
        lineHeight: 1,
      }}>
        {date.dayNum}
      </span>
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: '10px',
        color: isSelected ? 'var(--obsidian)80' : 'var(--text-muted)',
      }}>
        {date.month}
      </span>
      {date.isToday && (
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: isSelected ? 'var(--obsidian)' : 'var(--gold)',
          marginTop: '2px',
        }} />
      )}
    </button>
  );
}

// ─── TimeSlot ─────────────────────────────────────────────────
export function TimeSlot({ slot, selected, onSelect }) {
  const [hovered, setHovered] = React.useState(false);
  const isSelected = selected;
  const isAvailable = slot.available;

  return (
    <button
      onClick={() => isAvailable && onSelect(slot)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={!isAvailable}
      style={{
        padding: '10px 18px',
        background: isSelected
          ? 'linear-gradient(135deg, var(--gold-dark), var(--gold))'
          : isAvailable && hovered ? 'var(--obsidian-4)' : 'var(--obsidian-3)',
        border: isSelected
          ? '1px solid var(--gold-light)'
          : isAvailable
            ? `1px solid ${hovered ? 'var(--border-gold)' : 'var(--border)'}`
            : '1px solid transparent',
        borderRadius: 'var(--radius-sm)',
        cursor: isAvailable ? 'pointer' : 'not-allowed',
        opacity: isAvailable ? 1 : 0.3,
        transition: 'all 0.2s ease',
        boxShadow: isSelected ? '0 4px 16px #c9a96e35' : 'none',
        transform: isSelected ? 'translateY(-1px)' : 'none',
        position: 'relative',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 400,
        color: isSelected ? 'var(--obsidian)' : isAvailable ? 'var(--text-primary)' : 'var(--text-muted)',
        letterSpacing: '0.03em',
      }}>
        {slot.time}
      </span>

      {!isAvailable && (
        <div style={{
          position: 'absolute', top: '50%', left: 0, right: 0,
          height: '1px', background: 'var(--text-muted)',
          transform: 'translateY(-50%)', opacity: 0.3,
        }} />
      )}
    </button>
  );
}
