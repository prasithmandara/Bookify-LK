export default function ServiceCard({ name, duration, price, selected, disabled, onClick }) {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`flex justify-between items-center p-4 rounded-2xl border transition-all
        ${disabled
          ? 'opacity-40 bg-gray-50 border-gray-200 cursor-not-allowed'
          : selected
          ? 'border-2 border-green-600 bg-green-50 cursor-pointer'
          : 'border border-gray-200 bg-white hover:border-green-400 cursor-pointer'
        }`}
    >
      <div>
        <p className={`text-sm font-semibold ${selected ? 'text-green-900' : 'text-gray-900'}`}>
          {name}
        </p>
        <p className={`text-xs mt-0.5 ${selected ? 'text-green-700' : 'text-gray-500'}`}>
          {duration} min
        </p>
      </div>
      <p className={`text-sm font-bold ${selected ? 'text-green-800' : disabled ? 'text-gray-400' : 'text-green-600'}`}>
        LKR {price?.toLocaleString()}
      </p>
    </div>
  )
}