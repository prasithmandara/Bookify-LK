import { useLocation, useNavigate } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import Button from '../components/Button'

export default function ConfirmationPage() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const booking = state?.booking
  const service = state?.service
  const name    = state?.name || state?.booking?.customer_name || 'Customer'
  const phone   = state?.phone || state?.booking?.customer_phone || ''

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-6">
          <p className="text-gray-500 mb-4">No booking found.</p>
          <Button label="Book an appointment" onClick={() => navigate('/glamour-salon')} />
        </div>
      </div>
    )
  }

  const formattedDate = new Date(booking.booking_date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  const fmt = (t) => {
    if (!t) return ''
    const [h, m] = t.split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    return `${h % 12 || 12}:${String(m).padStart(2,'0')} ${ampm}`
  }

  const rows = [
    { label: 'Service',  value: service?.name },
    { label: 'Date',     value: formattedDate },
    { label: 'Time',     value: fmt(booking.start_time) },
    { label: 'Duration', value: `${service?.duration_minutes} minutes` },
    { label: 'Price',    value: `LKR ${service?.price_lkr?.toLocaleString()}`, green: true },
  ]

  const bizRows = [
    { label: 'Salon',    value: 'Glamour Salon' },
    { label: 'Address',  value: '45 Galle Rd, Colombo 03' },
    { label: 'Phone',    value: '011 234 5678', green: true },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top strip */}
      <div className="bg-green-600 h-2" />

      <div className="px-4 pt-10 pb-24">
        {/* Success icon */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 14l4 4 8-8" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">You're booked!</h1>
          <p className="text-gray-500 text-sm mt-1 text-center">
            We'll send a reminder before your appointment.
          </p>
        </div>

        {/* Booking card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-3">
          {rows.map((r, i) => (
            <div key={i} className={`flex justify-between items-center px-4 py-3
              ${i < rows.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <span className="text-xs text-gray-500">{r.label}</span>
              <span className={`text-sm font-semibold ${r.green ? 'text-green-600' : 'text-gray-900'}`}>
                {r.value}
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">Status</span>
            <StatusBadge status={booking.status || 'pending'} />
          </div>
        </div>

        {/* Customer info */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-3">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <span className="text-xs text-gray-500">Name</span>
            <span className="text-sm font-semibold text-gray-900">{name}</span>
          </div>
          {phone && (
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-xs text-gray-500">Phone</span>
              <span className="text-sm font-semibold text-gray-900">{phone}</span>
            </div>
          )}
        </div>

        {/* Business info */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
          {bizRows.map((r, i) => (
            <div key={i} className={`flex justify-between items-center px-4 py-3
              ${i < bizRows.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <span className="text-xs text-gray-500">{r.label}</span>
              <span className={`text-sm font-semibold ${r.green ? 'text-green-600' : 'text-gray-900'}`}>
                {r.value}
              </span>
            </div>
          ))}
        </div>

        {/* Info banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-6">
          <p className="text-xs text-amber-800 font-medium">
            ⏳ Your booking is pending approval. The salon will confirm shortly.
          </p>
        </div>

        <Button
          label="← Book Another Appointment"
          variant="secondary"
          full
          onClick={() => navigate('/glamour-salon')}
        />
      </div>
    </div>
  )
}