import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BookingRow from '../components/BookingRow'
import StatusBadge from '../components/StatusBadge'
import { getBookings, updateBooking } from '../indx'

const DEMO_BOOKINGS = [
  { id:'1', customer_name:'Kavindi Perera',   service_name:'Hair Cut & Style',   booking_date:'2025-04-22', start_time:'11:15', duration_minutes:45, price_lkr:1500, status:'pending'   },
  { id:'2', customer_name:'Dinesh Jayasuriya',service_name:'Hair Colouring',      booking_date:'2025-04-22', start_time:'09:00', duration_minutes:90, price_lkr:4500, status:'confirmed' },
  { id:'3', customer_name:'Sithara Fernando', service_name:'Manicure & Pedicure', booking_date:'2025-04-22', start_time:'14:00', duration_minutes:60, price_lkr:2200, status:'pending'   },
  { id:'4', customer_name:'Amali Wickrama',   service_name:'Hair Cut & Style',    booking_date:'2025-04-22', start_time:'16:00', duration_minutes:45, price_lkr:1500, status:'cancelled' },
  { id:'5', customer_name:'Priya Gunasekara', service_name:'Facial Treatment',    booking_date:'2025-04-22', start_time:'10:00', duration_minutes:60, price_lkr:3000, status:'confirmed' },
]

const FILTERS = ['all', 'pending', 'confirmed', 'cancelled', 'completed']

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [filter, setFilter]     = useState('all')
  const [loading, setLoading]   = useState(true)
  const [today]                 = useState(new Date().toISOString().split('T')[0])

  const admin = JSON.parse(localStorage.getItem('admin') || '{}')

  const greet = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/admin/login')
    setLoading(true)
    getBookings(today)
      .then(r => setBookings(r.data))
      .catch(() => setBookings(DEMO_BOOKINGS))
      .finally(() => setLoading(false))
  }, [today])

  const handleApprove = async (id) => {
    try {
      await updateBooking(id, 'confirmed')
    } catch {}
    setBookings(b => b.map(x => x.id === id ? { ...x, status: 'confirmed' } : x))
  }

  const handleCancel = async (id) => {
    try {
      await updateBooking(id, 'cancelled')
    } catch {}
    setBookings(b => b.map(x => x.id === id ? { ...x, status: 'cancelled' } : x))
  }

  const handleReschedule = (id) => {
    alert(`Reschedule booking ${id} — coming in Version 2!`)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    navigate('/admin/login')
  }

  const filtered = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter)

  const stats = {
    total:     bookings.length,
    pending:   bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    revenue:   bookings.filter(b => b.status === 'confirmed')
                       .reduce((s, b) => s + (b.price_lkr || 0), 0),
  }

  const filterCount = (f) => f === 'all'
    ? bookings.length
    : bookings.filter(b => b.status === f).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2
                M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{greet()}, {admin.email?.split('@')[0] || 'Admin'}</p>
            <p className="text-xs text-gray-500">
              {new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}
            </p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="text-xs text-gray-500 hover:text-red-600 transition-colors font-medium px-3 py-1.5 rounded-xl hover:bg-red-50">
          Sign out
        </button>
      </div>

      <div className="px-4 py-5 space-y-5 max-w-2xl mx-auto">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 font-medium mb-1">Today's bookings</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-green-600 mt-1 font-medium">All appointments</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 font-medium mb-1">Pending approval</p>
            <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
            {stats.pending > 0
              ? <p className="text-xs text-amber-600 mt-1 font-medium">⚠ Action needed</p>
              : <p className="text-xs text-green-600 mt-1 font-medium">All clear!</p>
            }
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 font-medium mb-1">Confirmed</p>
            <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
            <p className="text-xs text-gray-400 mt-1">Appointments locked in</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 font-medium mb-1">Revenue today</p>
            <p className="text-xl font-bold text-gray-900">
              LKR {stats.revenue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-1">Confirmed only</p>
          </div>
        </div>

        {/* Quick link to booking page */}
        <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-green-800">Your booking link</p>
            <p className="text-xs text-green-600">Share this with your customers</p>
          </div>
          <button
            onClick={() => navigate('/glamour-salon')}
            className="text-xs font-semibold text-green-700 bg-white border border-green-300
              px-3 py-1.5 rounded-xl hover:bg-green-50 transition-colors">
            Preview →
          </button>
        </div>

        {/* Filter tabs */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Today's appointments
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all
                  ${filter === f
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400'
                  }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)} ({filterCount(f)})
              </button>
            ))}
          </div>
        </div>

        {/* Bookings list */}
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-28 bg-white rounded-2xl border border-gray-100 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm font-semibold text-gray-700">No bookings found</p>
            <p className="text-xs text-gray-400 mt-1">
              {filter === 'all' ? 'No bookings today yet' : `No ${filter} bookings`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(b => (
              <BookingRow
                key={b.id}
                booking={b}
                onApprove={handleApprove}
                onCancel={handleCancel}
                onReschedule={handleReschedule}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}