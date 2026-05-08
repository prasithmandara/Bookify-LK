import { Routes, Route, Navigate } from 'react-router-dom'
import BookingPage from './pages/BookingPage'
import ConfirmationPage from './pages/ConfirmationPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/"                  element={<Navigate to="/glamour-salon" replace />} />
      <Route path="/:slug"             element={<BookingPage />} />
      <Route path="/confirmation"      element={<ConfirmationPage />} />
      <Route path="/admin/login"       element={<AdminLogin />} />
      <Route path="/admin/dashboard"   element={<AdminDashboard />} />
    </Routes>
  )
}