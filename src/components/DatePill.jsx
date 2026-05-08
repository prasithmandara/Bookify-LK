export default function DatePill({ day, date, active, disabled, onClick }) {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`w-12 py-2 rounded-2xl text-center flex-shrink-0 transition-all
        ${disabled
          ? 'opacity-40 cursor-not-allowed border border-gray-200 bg-white'
          : active
          ? 'bg-green-600 border-2 border-green-600 cursor-pointer'
          : 'border border-gray-200 bg-white hover:border-green-400 cursor-pointer'
        }`}
    >
      <p className={`text-[9px] font-semibold mb-0.5 uppercase tracking-wide
        ${active ? 'text-green-100' : 'text-gray-500'}`}>
        {day}
      </p>
      <p className={`text-base font-bold ${active ? 'text-white' : 'text-gray-900'}`}>
        {date}
      </p>
    </div>
  )
}