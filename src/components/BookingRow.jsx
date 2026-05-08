import StatusBadge from './StatusBadge'

export default function BookingRow({ booking, onApprove, onReschedule, onCancel }) {
  const { id, customer_name, service_name, booking_date, start_time,
          duration_minutes, price_lkr, status } = booking

  const formattedDate = new Date(booking_date).toLocaleDateString('en-US',
    { weekday: 'short', month: 'short', day: 'numeric' })

  const fmt = (t) => {
    const [h, m] = t.split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    return `${h % 12 || 12}:${String(m).padStart(2,'0')} ${ampm}`
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-4 transition-all
      ${status === 'cancelled' ? 'opacity-50' : 'hover:border-gray-300'}`}>
      <div className="flex justify-between items-start mb-1">
        <div>
          <p className="text-sm font-semibold text-gray-900">{customer_name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{service_name}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
        <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 12 12">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        {formattedDate} · {fmt(start_time)} · {duration_minutes} min · LKR {price_lkr?.toLocaleString()}
      </p>
      {status !== 'cancelled' && status !== 'completed' && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
          {status === 'pending' && (
            <button onClick={() => onApprove(id)}
              className="flex-1 py-2 text-xs font-semibold rounded-xl bg-green-50 text-green-800 border border-green-200 hover:bg-green-100 transition-colors">
              Approve
            </button>
          )}
          <button onClick={() => onReschedule(id)}
            className="flex-1 py-2 text-xs font-semibold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
            Reschedule
          </button>
          <button onClick={() => onCancel(id)}
            className="flex-1 py-2 text-xs font-semibold rounded-xl bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors">
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}