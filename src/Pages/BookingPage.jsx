import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import DatePill from '../components/DatePill'
import TimeSlot from '../components/TimeSlot'
import Button from '../components/Button'
import { getServices, getSlots, createBooking } from '../api/indx'

const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT']

function getNext7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return {
      day: DAYS[d.getDay()],
      date: d.getDate(),
      full: d.toISOString().split('T')[0],
    }
  })
}

export default function BookingPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const businessSlug = slug || 'glamour-salon'

  const [services, setServices]         = useState([])
  const [slots, setSlots]               = useState([])
  const [selectedService, setService]   = useState(null)
  const [selectedDate, setDate]         = useState(getNext7Days()[0])
  const [selectedSlot, setSlot]         = useState(null)
  const [name, setName]                 = useState('')
  const [phone, setPhone]               = useState('')
  const [loading, setLoading]           = useState(false)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [error, setError]               = useState('')
  const days = getNext7Days()

  // Load services on mount
  useEffect(() => {
    getServices(businessSlug)
      .then(r => setServices(r.data))
      .catch(() => {
        // Demo data when backend not running
        setServices([
          { id: '1', name: 'Hair Cut & Style',    duration_minutes: 45, price_lkr: 1500 },
          { id: '2', name: 'Hair Colouring',       duration_minutes: 90, price_lkr: 4500 },
          { id: '3', name: 'Manicure & Pedicure',  duration_minutes: 60, price_lkr: 2200 },
          { id: '4', name: 'Facial Treatment',     duration_minutes: 60, price_lkr: 3000 },
        ])
      })
  }, [businessSlug])

  // Load slots when service or date changes
  useEffect(() => {
    if (!selectedService || !selectedDate) return
    setLoadingSlots(true)
    setSlot(null)
    getSlots(businessSlug, selectedDate.full, selectedService.id)
      .then(r => setSlots(r.data))
      .catch(() => {
        // Demo slots
        setSlots([
          { start: '09:00', available: false },
          { start: '09:30', available: false },
          { start: '10:00', available: true  },
          { start: '10:30', available: true  },
          { start: '11:00', available: true  },
          { start: '11:30', available: false },
          { start: '12:00', available: true  },
          { start: '13:00', available: true  },
          { start: '14:00', available: true  },
          { start: '14:30', available: false },
          { start: '15:00', available: true  },
          { start: '16:00', available: true  },
        ])
      })
      .finally(() => setLoadingSlots(false))
  }, [selectedService, selectedDate])

  const formatTime = (t) => {
    const [h, m] = t.split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    return `${h % 12 || 12}:${String(m).padStart(2,'0')} ${ampm}`
  }

  const handleSubmit = async () => {
    if (!selectedService) return setError('Please select a service')
    if (!selectedSlot)    return setError('Please select a time slot')
    if (!name.trim())     return setError('Please enter your name')
    if (!phone.trim())    return setError('Please enter your phone number')
    setError('')
    setLoading(true)
    try {
      const { data } = await createBooking({
        slug: businessSlug,
        service_id:   selectedService.id,
        name:         name.trim(),
        phone:        phone.trim(),
        booking_date: selectedDate.full,
        start_time:   selectedSlot,
      })
      navigate('/confirmation', { state: { booking: data, service: selectedService } })
    } catch {
      // Demo: navigate with mock data
      navigate('/confirmation', {
        state: {
          booking: {
            booking_date: selectedDate.full,
            start_time:   selectedSlot,
            status:       'pending',
          },
          service: selectedService,
          name,
          phone,
        }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 px-5 pt-12 pb-6">
        <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
          Glamour Salon, Colombo
        </span>
        <h1 className="text-2xl font-bold text-white">Book an appointment</h1>
        <p className="text-green-100 text-sm mt-1">Online booking · Instant confirmation</p>
      </div>

      <div className="px-4 pb-28 space-y-6 mt-4">

        {/* Services */}
        <section>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Choose a service
          </p>
          <div className="space-y-2">
            {services.length === 0
              ? [1,2,3].map(i => (
                  <div key={i} className="h-16 bg-white rounded-2xl border border-gray-100 animate-pulse" />
                ))
              : services.map(s => (
                  <ServiceCard
                    key={s.id}
                    name={s.name}
                    duration={s.duration_minutes}
                    price={s.price_lkr}
                    selected={selectedService?.id === s.id}
                    onClick={() => setService(s)}
                  />
                ))
            }
          </div>
        </section>

        {/* Date picker */}
        <section>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Select date
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {days.map(d => (
              <DatePill
                key={d.full}
                day={d.day}
                date={d.date}
                active={selectedDate.full === d.full}
                onClick={() => setDate(d)}
              />
            ))}
          </div>
        </section>

        {/* Time slots */}
        {selectedService && (
          <section>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Available times
            </p>
            {loadingSlots ? (
              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-10 bg-white rounded-xl border border-gray-100 animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-2">
                  {slots.map(slot => (
                    <TimeSlot
                      key={slot.start}
                      time={formatTime(slot.start)}
                      state={
                        !slot.available ? 'taken' :
                        selectedSlot === slot.start ? 'selected' : 'free'
                      }
                      onClick={() => setSlot(slot.start)}
                    />
                  ))}
                </div>
                <div className="flex gap-4 mt-2">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <span className="w-2 h-2 rounded bg-gray-200 inline-block"/> Taken
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <span className="w-2 h-2 rounded border border-gray-300 inline-block"/> Free
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <span className="w-2 h-2 rounded bg-green-600 inline-block"/> Selected
                  </span>
                </div>
              </>
            )}
          </section>
        )}

        {/* Customer details */}
        <section>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Your details
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Kavindi Perera"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm
                  text-gray-900 placeholder-gray-400 outline-none focus:border-green-500
                  focus:ring-2 focus:ring-green-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="e.g. 071 234 5678"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm
                  text-gray-900 placeholder-gray-400 outline-none focus:border-green-500
                  focus:ring-2 focus:ring-green-100 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Booking summary */}
        {selectedService && selectedSlot && (
          <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
            <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Summary</p>
            <div className="flex justify-between text-sm">
              <span className="text-green-800">{selectedService.name}</span>
              <span className="font-bold text-green-800">LKR {selectedService.price_lkr?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-green-700 mt-1">
              <span>{selectedDate.day}, {selectedDate.date} · {formatTime(selectedSlot)}</span>
              <span>{selectedService.duration_minutes} min</span>
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4">
        <Button
          label="Confirm Booking →"
          full
          loading={loading}
          onClick={handleSubmit}
          variant={(!selectedService || !selectedSlot || !name || !phone) ? 'disabled' : 'primary'}
        />
      </div>
    </div>
  )
}