import React, { useState } from 'react';
import { services, timeSlots, generateDates, business } from '../data/mockData';
import { ServiceCard } from '../components/ServiceCard';
import { DatePill, TimeSlot } from '../components/DateTimeSlots';
import { Button, GoldDivider, Input, Logo } from '../components/UI';

const STEPS = ['Service', 'Date & Time', 'Your Details', 'Review'];

function StepIndicator({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '48px' }}>
      {STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: i < current ? 'linear-gradient(135deg, var(--gold-dark), var(--gold))' :
                          i === current ? 'transparent' : 'var(--obsidian-4)',
              border: i === current ? '2px solid var(--gold)' : i < current ? 'none' : '2px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: i === current ? '0 0 16px var(--gold-muted)' : 'none',
            }}>
              {i < current ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3 3 6-6" stroke="var(--obsidian)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500,
                  color: i === current ? 'var(--gold)' : 'var(--text-muted)',
                }}>
                  {i + 1}
                </span>
              )}
            </div>
            <span style={{
              fontSize: '11px', fontWeight: 500,
              color: i === current ? 'var(--gold)' : i < current ? 'var(--text-secondary)' : 'var(--text-muted)',
              letterSpacing: '0.05em', whiteSpace: 'nowrap',
              transition: 'color 0.3s ease',
            }}>
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{
              flex: 1, height: '2px', marginBottom: '20px',
              background: i < current
                ? 'linear-gradient(90deg, var(--gold-dark), var(--gold))'
                : 'var(--border)',
              transition: 'background 0.4s ease',
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function BookingPage({ onConfirm, onBack }) {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const dates = generateDates();

  const formatPrice = (p) => `LKR ${p.toLocaleString('en-LK')}`;

  const canNext = () => {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!selectedDate && !!selectedTime;
    if (step === 2) return form.name && form.phone && form.email;
    return true;
  };

  const handleSubmit = () => {
    const booking = {
      id: `BKF-${Math.floor(1000 + Math.random() * 9000)}`,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      customer: form,
    };
    onConfirm(booking);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--obsidian)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Page background */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(ellipse 70% 50% at 80% 10%, #c9a96e0d 0%, transparent 55%),
          radial-gradient(ellipse 50% 70% at 5% 90%, #c9a96e08 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 50% 50%, #c9a96e04 0%, transparent 60%)
        `,
      }} />
      {/* Geometric grid lines */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        opacity: 0.3,
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
      }} />
      
      {/* Header */}
      <header style={{
        padding: '20px 40px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--obsidian-2)',
        backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onBack} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'transparent', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', padding: '7px 14px',
            color: 'var(--text-muted)', fontFamily: 'var(--font-body)',
            fontSize: '13px', cursor: 'pointer', transition: 'var(--transition)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            ← Back
          </button>
          <Logo />
        </div>
      </header>

      {/* Hero Banner */}
      {step === 0 && (
        <div style={{
          padding: '60px 40px 48px',
          background: 'linear-gradient(135deg, var(--obsidian-2) 0%, var(--obsidian) 100%)',
          borderBottom: '1px solid var(--border)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute', top: -60, right: -60, width: 300, height: 300,
            borderRadius: '50%', border: '1px solid var(--border-gold)', opacity: 0.3,
          }} />
          <div style={{
            position: 'absolute', top: -20, right: -20, width: 180, height: 180,
            borderRadius: '50%', border: '1px solid var(--border-gold)', opacity: 0.2,
          }} />

          <div style={{ maxWidth: '700px', animation: 'fadeUp 0.7s ease forwards' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '100px',
              background: 'var(--gold-muted)', border: '1px solid var(--border-gold)',
              marginBottom: '20px',
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', animation: 'pulse-gold 2s infinite' }} />
              <span style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.08em', fontWeight: 500 }}>
                Available Today — Book Instantly
              </span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: '52px', fontWeight: 300,
              color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '16px',
            }}>
              Reserve Your{' '}
              <span className="gold-shimmer">Perfect Experience</span>
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.7 }}>
              {business.description}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <StepIndicator current={step} />

        {/* STEP 0: Service Selection */}
        {step === 0 && (
          <div style={{ animation: 'fadeUp 0.5s ease forwards' }}>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Select a Service
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                Choose from our curated menu of {services.filter(s => s.available).length} premium treatments
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '16px',
            }}>
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={selectedService?.id === service.id}
                  onSelect={setSelectedService}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Date & Time */}
        {step === 1 && (
          <div style={{ animation: 'fadeUp 0.5s ease forwards' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Choose Date & Time
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                All times are in Sri Lanka Standard Time (SLST, GMT+5:30)
              </p>
            </div>

            {/* Selected service recap */}
            <div style={{
              padding: '16px 20px', marginBottom: '32px',
              background: 'var(--obsidian-3)', border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Selected Service</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--gold-light)' }}>
                  {selectedService?.name}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--gold)' }}>
                  {formatPrice(selectedService?.price)}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {selectedService?.duration} min
                </div>
              </div>
            </div>

            {/* Date Picker */}
            <div style={{ marginBottom: '36px' }}>
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Select Date
              </div>
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
                {dates.map(d => (
                  <DatePill
                    key={d.id}
                    date={d}
                    selected={selectedDate?.id === d.id}
                    onSelect={setSelectedDate}
                  />
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Available Times
                {selectedDate && (
                  <span style={{ marginLeft: '10px', color: 'var(--gold)', textTransform: 'none', letterSpacing: 'normal', fontSize: '13px' }}>
                    — {selectedDate.dayName}, {selectedDate.dayNum} {selectedDate.month}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {timeSlots.map(slot => (
                  <TimeSlot
                    key={slot.id}
                    slot={slot}
                    selected={selectedTime?.id === slot.id}
                    onSelect={setSelectedTime}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Customer Details */}
        {step === 2 && (
          <div style={{ animation: 'fadeUp 0.5s ease forwards', maxWidth: '560px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Your Details
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                We'll send your confirmation and reminders to these contacts
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Input
                label="Full Name"
                placeholder="e.g. Anika Perera"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                icon="👤"
              />
              <Input
                label="Phone Number"
                placeholder="+94 77 000 0000"
                value={form.phone}
                type="tel"
                onChange={e => setForm({ ...form, phone: e.target.value })}
                icon="📞"
              />
              <Input
                label="Email Address"
                placeholder="your@email.com"
                value={form.email}
                type="email"
                onChange={e => setForm({ ...form, email: e.target.value })}
                icon="✉"
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
                  color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  Special Notes <span style={{ color: 'var(--text-muted)', textTransform: 'none', fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Any allergies, preferences, or special requests..."
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'var(--obsidian-4)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)', fontSize: '14px',
                    outline: 'none', resize: 'vertical', lineHeight: 1.6,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Review */}
        {step === 3 && (
          <div style={{ animation: 'fadeUp 0.5s ease forwards', maxWidth: '600px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Review & Confirm
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                Please review your booking before confirming
              </p>
            </div>

            <div style={{
              background: 'var(--obsidian-3)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
            }}>
              {/* Booking ref header */}
              <div style={{
                padding: '20px 28px',
                background: 'linear-gradient(135deg, var(--obsidian-4), var(--obsidian-3))',
                borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--gold-light)' }}>
                  Booking Summary
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--gold-dark)', letterSpacing: '0.1em' }}>
                  PENDING CONFIRMATION
                </div>
              </div>

              <div style={{ padding: '28px' }}>
                {/* Service */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Service</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {selectedService?.name}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {selectedService?.duration} minutes · {selectedService?.category}
                  </div>
                </div>

                <GoldDivider style={{ marginBottom: '24px' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Date</div>
                    <div style={{ fontSize: '15px', color: 'var(--text-primary)' }}>
                      {selectedDate?.dayName}, {selectedDate?.dayNum} {selectedDate?.month}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Time</div>
                    <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {selectedTime?.time}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Customer</div>
                    <div style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{form.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Contact</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{form.phone}</div>
                  </div>
                </div>

                {form.notes && (
                  <>
                    <GoldDivider style={{ marginBottom: '20px' }} />
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Notes</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>
                        "{form.notes}"
                      </div>
                    </div>
                  </>
                )}

                <GoldDivider style={{ marginBottom: '20px' }} />

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Total Amount</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 500, color: 'var(--gold)' }}>
                    {formatPrice(selectedService?.price)}
                  </div>
                </div>

                <div style={{
                  marginTop: '16px', padding: '12px 16px',
                  background: 'var(--gold-muted)', borderRadius: 'var(--radius-sm)',
                  fontSize: '12px', color: 'var(--gold)', lineHeight: 1.5,
                }}>
                  ℹ Your booking will be pending until confirmed by the studio. You'll receive an SMS and email notification once confirmed.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: '48px', paddingTop: '28px', borderTop: '1px solid var(--border)',
        }}>
          <Button
            variant="ghost"
            onClick={() => setStep(s => s - 1)}
            style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
          >
            ← Back
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {step < 3 ? (
              <Button
                variant="primary"
                size="lg"
                disabled={!canNext()}
                onClick={() => setStep(s => s + 1)}
              >
                Continue →
              </Button>
            ) : (
              <Button variant="primary" size="lg" onClick={handleSubmit}>
                ✓ Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
