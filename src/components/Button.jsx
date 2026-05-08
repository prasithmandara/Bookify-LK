const styles = {
  primary:   'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
  secondary: 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50',
  danger:    'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100',
  ghost:     'bg-transparent text-green-600 border border-green-500 hover:bg-green-50',
  disabled:  'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed',
}
const sizes = {
  default: 'px-5 py-3 text-sm rounded-2xl',
  sm:      'px-3 py-1.5 text-xs rounded-xl',
}

export default function Button({ label, variant = 'primary', size = 'default', full, onClick, loading }) {
  return (
    <button
      onClick={variant !== 'disabled' && !loading ? onClick : undefined}
      disabled={variant === 'disabled' || loading}
      className={`font-semibold transition-all active:scale-95 flex items-center justify-center gap-2
        ${styles[variant]} ${sizes[size]} ${full ? 'w-full' : ''}`}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
      )}
      {label}
    </button>
  )
}