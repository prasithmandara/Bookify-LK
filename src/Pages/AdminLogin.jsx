import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { login } from '../api/indx'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleLogin = async () => {
    if (!email || !password) return setError('Please enter email and password')
    setError('')
    setLoading(true)
    try {
      const { data } = await login(email, password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('admin', JSON.stringify(data.admin))
      navigate('/admin/dashboard')
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Incorrect email or password')
      } else {
        // Demo login for testing
        if (email === 'admin@glamour.lk' && password === 'admin123') {
          localStorage.setItem('token', 'demo-token')
          localStorage.setItem('admin', JSON.stringify({ email, role: 'owner' }))
          navigate('/admin/dashboard')
        } else {
          setError('Backend not connected. Use admin@glamour.lk / admin123 for demo')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2
                M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bookify LK</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage your bookings</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Business email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="admin@yoursalon.lk"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm
                  text-gray-900 placeholder-gray-400 outline-none focus:border-green-500
                  focus:ring-2 focus:ring-green-100 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 text-sm
                    text-gray-900 placeholder-gray-400 outline-none focus:border-green-500
                    focus:ring-2 focus:ring-green-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94
                        M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07
                        a3 3 0 11-4.24-4.24M1 1l22 22"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <Button
              label="Sign in →"
              full
              loading={loading}
              onClick={handleLogin}
            />

            <p className="text-center text-xs text-gray-400">
              Forgot password?{' '}
              <span className="text-green-600 cursor-pointer hover:underline">Reset it</span>
            </p>
          </div>
        </div>

        {/* Register */}
        <div className="mt-4 border-t border-gray-200 pt-4">
          <p className="text-center text-xs text-gray-400 mb-3">Don't have an account?</p>
          <button className="w-full py-3 border border-green-500 rounded-2xl text-sm font-semibold
            text-green-600 hover:bg-green-50 transition-colors">
            Register your business
          </button>
        </div>

        {/* Demo hint */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3">
          <p className="text-xs text-blue-700 font-medium text-center">
            Demo: admin@bookify.lk / admin123
          </p>
        </div>
      </div>
    </div>
  )
}