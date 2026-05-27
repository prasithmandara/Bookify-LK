import React, { useState } from 'react';
import { mockBookings, stats, services } from '../data/mockData';
import { BookingRow } from '../components/BookingRow';
import { StatusBadge, Button, Card, GoldDivider, Logo } from '../components/UI';

function StatCard({ label, value, sub, icon, accent }) {
  return (
    <div style={{
      background: 'var(--obsidian-3)',
      border: `1px solid ${accent ? 'var(--border-gold)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '22px 24px',
      position: 'relative', overflow: 'hidden',
      boxShadow: accent ? 'var(--shadow-gold)' : 'none',
    }}>
      {accent && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light))',
        }} />
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
          {label}
        </div>
        <div style={{ fontSize: '20px', opacity: 0.7 }}>{icon}</div>
      </div>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 500,
        color: accent ? 'var(--gold)' : 'var(--text-primary)', lineHeight: 1, marginBottom: '6px',
      }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sub}</div>}
    </div>
  );
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '◈' },
  { id: 'bookings', label: 'Bookings', icon: '◇' },
  { id: 'services', label: 'Services', icon: '✦' },
  { id: 'customers', label: 'Customers', icon: '◉' },
  { id: 'settings', label: 'Settings', icon: '◎' },
];

export default function AdminDashboard({ onLogout }) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [bookings, setBookings] = useState(mockBookings);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const updateStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const filtered = bookings.filter(b => {
    const matchStatus = filterStatus === 'All' || b.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || b.customer.name.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q) || b.service.name.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const pendingCount = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--obsidian)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px', minHeight: '100vh', flexShrink: 0,
        background: 'var(--obsidian-2)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        padding: '28px 0',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        <div style={{ padding: '0 24px', marginBottom: '36px' }}>
          <Logo size="sm" />
        </div>

        <nav style={{ flex: 1 }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 24px', border: 'none', cursor: 'pointer',
                background: activeNav === item.id ? 'linear-gradient(90deg, var(--gold-muted), transparent)' : 'transparent',
                borderLeft: activeNav === item.id ? '2px solid var(--gold)' : '2px solid transparent',
                color: activeNav === item.id ? 'var(--gold)' : 'var(--text-muted)',
                fontSize: '14px', fontFamily: 'var(--font-body)', fontWeight: activeNav === item.id ? 500 : 400,
                transition: 'all 0.2s ease', textAlign: 'left',
                position: 'relative',
              }}
            >
              <span style={{ fontSize: '16px', opacity: 0.8 }}>{item.icon}</span>
              {item.label}
              {item.id === 'bookings' && pendingCount > 0 && (
                <span style={{
                  marginLeft: 'auto', minWidth: 20, height: 20,
                  borderRadius: '100px', padding: '0 6px',
                  background: 'var(--gold)', color: 'var(--obsidian)',
                  fontSize: '11px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--obsidian)',
            }}>
              EW
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>Elite Wellness</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Administrator</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{
              width: '100%', padding: '9px', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', background: 'transparent',
              color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'var(--font-body)',
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--error)'; e.currentTarget.style.color = 'var(--error)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '36px', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '36px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Thursday, 4 June 2026
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Good morning, <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Admin</span>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {pendingCount > 0 && (
              <div style={{
                padding: '10px 16px', borderRadius: 'var(--radius-sm)',
                background: 'var(--pending)15', border: '1px solid var(--pending)40',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--pending)', animation: 'pulse-gold 2s infinite' }} />
                <span style={{ fontSize: '13px', color: 'var(--pending)', fontWeight: 500 }}>
                  {pendingCount} pending approval{pendingCount > 1 ? 's' : ''}
                </span>
              </div>
            )}
            <Button variant="primary" size="sm">
              + New Booking
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '36px',
        }}>
          <StatCard label="Today's Bookings" value={stats.todayBookings} sub={`${stats.completedToday} completed`} icon="📅" accent />
          <StatCard label="Pending Approvals" value={pendingCount} sub="Awaiting review" icon="⏳" />
          <StatCard label="Monthly Revenue" value={`LKR ${(stats.monthlyRevenue / 1000).toFixed(0)}K`} sub="June 2026" icon="💰" />
          <StatCard label="Total Customers" value={stats.totalCustomers.toLocaleString()} sub="All time" icon="👥" />
          <StatCard label="Avg. Rating" value={`${stats.avgRating}★`} sub="Based on 312 reviews" icon="⭐" />
          <StatCard label="Active Services" value={services.filter(s => s.available).length} sub={`of ${services.length} total`} icon="✦" />
        </div>

        <GoldDivider style={{ marginBottom: '36px' }} />

        {/* Bookings Table */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 400, color: 'var(--text-primary)' }}>
              Appointments
            </h2>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search by name, ID, or service..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    padding: '9px 14px 9px 36px', width: '240px',
                    background: 'var(--obsidian-4)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none',
                  }}
                />
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '14px' }}>
                  🔍
                </span>
              </div>

              {/* Filter pills */}
              {['All', 'Pending', 'Confirmed', 'Completed'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  style={{
                    padding: '8px 14px', borderRadius: '100px',
                    background: filterStatus === status ? 'var(--gold-muted)' : 'transparent',
                    border: filterStatus === status ? '1px solid var(--gold)' : '1px solid var(--border)',
                    color: filterStatus === status ? 'var(--gold)' : 'var(--text-muted)',
                    fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                    transition: 'all 0.2s ease', fontFamily: 'var(--font-body)',
                  }}
                >
                  {status}
                  {status === 'Pending' && pendingCount > 0 && (
                    <span style={{ marginLeft: '6px', color: 'var(--pending)' }}>({pendingCount})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{
            background: 'var(--obsidian-3)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '44px 1fr 1fr 120px 110px 160px',
              gap: '16px',
              padding: '12px 20px',
              background: 'var(--obsidian-2)',
              borderBottom: '1px solid var(--border)',
            }}>
              {['', 'Customer', 'Service', 'Date & Time', 'Reference', 'Status'].map(h => (
                <div key={h} style={{
                  fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            {filtered.length > 0 ? (
              filtered.map(booking => (
                <BookingRow key={booking.id} booking={booking} onUpdateStatus={updateStatus} />
              ))
            ) : (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  No bookings found
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Try adjusting your filters or search query
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'right' }}>
            Showing {filtered.length} of {bookings.length} bookings
          </div>
        </div>
      </main>
    </div>
  );
}
