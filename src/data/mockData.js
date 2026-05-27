export const business = {
  id: "biz-001",
  name: "Élite Wellness Studio",
  tagline: "Where luxury meets care",
  category: "Salon & Wellness",
  location: "Colombo 07, Sri Lanka",
  phone: "+94 11 234 5678",
  rating: 4.9,
  reviewCount: 312,
  coverImage: null,
  openHours: "9:00 AM – 8:00 PM",
  description: "A premier wellness destination offering curated beauty and relaxation experiences for the discerning client.",
};

export const services = [
  {
    id: "svc-001",
    name: "Signature Facial",
    category: "Skincare",
    duration: 75,
    price: 6500,
    description: "A bespoke deep-cleansing facial tailored to your skin type using premium botanical extracts.",
    available: true,
    popular: true,
  },
  {
    id: "svc-002",
    name: "Swedish Massage",
    category: "Wellness",
    duration: 60,
    price: 8500,
    description: "Full-body relaxation massage using warm aromatic oils with long, flowing strokes.",
    available: true,
    popular: true,
  },
  {
    id: "svc-003",
    name: "Bridal Hair & Makeup",
    category: "Beauty",
    duration: 180,
    price: 22000,
    description: "Complete bridal transformation with professional styling using luxury cosmetic brands.",
    available: true,
    popular: false,
  },
  {
    id: "svc-004",
    name: "Manicure & Pedicure",
    category: "Nail Care",
    duration: 90,
    price: 4200,
    description: "Luxurious hand and foot treatment with gel polish, cuticle care, and paraffin wax.",
    available: true,
    popular: false,
  },
  {
    id: "svc-005",
    name: "Hair Colouring",
    category: "Hair",
    duration: 120,
    price: 9500,
    description: "Professional colour treatment with premium brands including balayage and highlights.",
    available: true,
    popular: true,
  },
  {
    id: "svc-006",
    name: "Keratin Treatment",
    category: "Hair",
    duration: 150,
    price: 14000,
    description: "Smoothing keratin therapy that eliminates frizz and adds brilliant shine for 4–6 months.",
    available: false,
    popular: false,
  },
];

export const timeSlots = [
  { id: "t1", time: "09:00 AM", available: true },
  { id: "t2", time: "09:45 AM", available: false },
  { id: "t3", time: "10:30 AM", available: true },
  { id: "t4", time: "11:15 AM", available: true },
  { id: "t5", time: "12:00 PM", available: false },
  { id: "t6", time: "01:00 PM", available: true },
  { id: "t7", time: "01:45 PM", available: true },
  { id: "t8", time: "02:30 PM", available: false },
  { id: "t9", time: "03:15 PM", available: true },
  { id: "t10", time: "04:00 PM", available: true },
  { id: "t11", time: "04:45 PM", available: false },
  { id: "t12", time: "05:30 PM", available: true },
  { id: "t13", time: "06:15 PM", available: true },
  { id: "t14", time: "07:00 PM", available: true },
];

export const mockBookings = [
  {
    id: "BKF-0042",
    customer: { name: "Anika Perera", phone: "+94 77 234 5678", email: "anika@email.com" },
    service: services[0],
    date: "2026-06-04",
    time: "10:30 AM",
    status: "Pending",
    createdAt: "2026-06-01",
    notes: "First visit, sensitive skin",
  },
  {
    id: "BKF-0041",
    customer: { name: "Kavya Rajapaksa", phone: "+94 71 987 6543", email: "kavya@email.com" },
    service: services[1],
    date: "2026-06-04",
    time: "11:15 AM",
    status: "Confirmed",
    createdAt: "2026-05-30",
    notes: "",
  },
  {
    id: "BKF-0040",
    customer: { name: "Sithmi Fernando", phone: "+94 76 543 2109", email: "sithmi@email.com" },
    service: services[4],
    date: "2026-06-03",
    time: "02:30 PM",
    status: "Completed",
    createdAt: "2026-05-28",
    notes: "Prefers balayage technique",
  },
  {
    id: "BKF-0039",
    customer: { name: "Dilani Wickramasinghe", phone: "+94 70 111 2222", email: "dilani@email.com" },
    service: services[2],
    date: "2026-06-05",
    time: "09:00 AM",
    status: "Pending",
    createdAt: "2026-06-01",
    notes: "Wedding on June 7th",
  },
  {
    id: "BKF-0038",
    customer: { name: "Malsha Jayawardena", phone: "+94 75 333 4444", email: "malsha@email.com" },
    service: services[3],
    date: "2026-06-02",
    time: "04:00 PM",
    status: "Confirmed",
    createdAt: "2026-05-29",
    notes: "",
  },
  {
    id: "BKF-0037",
    customer: { name: "Thilini Senanayake", phone: "+94 77 555 6666", email: "thilini@email.com" },
    service: services[1],
    date: "2026-06-02",
    time: "01:00 PM",
    status: "Completed",
    createdAt: "2026-05-27",
    notes: "",
  },
];

export const stats = {
  todayBookings: 8,
  pendingApprovals: 3,
  completedToday: 4,
  monthlyRevenue: 184500,
  totalCustomers: 1247,
  avgRating: 4.9,
};

export const generateDates = () => {
  const dates = [];
  const today = new Date(2026, 5, 4); // June 4, 2026
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      id: `d${i}`,
      date: d,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      isToday: i === 0,
    });
  }
  return dates;
};
