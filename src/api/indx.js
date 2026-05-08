import client from './client'

export const getServices = (slug) => client.get(`/services/${slug}`)
export const getSlots = (slug, date, serviceId) =>
  client.get(`/slots/${slug}/${date}?service_id=${serviceId}`)
export const createBooking = (data) => client.post('/bookings', data)
export const login = (email, password) =>
  client.post('/auth/login', { email, password })
export const getBookings = (date, status) =>
  client.get('/bookings', { params: { date, status } })
export const updateBooking = (id, status) =>
  client.patch(`/bookings/${id}`, { status })