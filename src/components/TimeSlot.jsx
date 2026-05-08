export default function TimeSlot({ time, state = 'free', onClick }) {
  const styles = {
    free:     'border border-gray-300 bg-white text-gray-800 hover:border-green-500 hover:bg-green-50 cursor-pointer',
    selected: 'border-2 border-green-600 bg-green-600 text-white cursor-pointer',
    taken:    'border border-gray-200 bg-gray-50 text-gray-400 line-through cursor-not-allowed',
  }
  return (
    <div
      onClick={state === 'free' ? onClick : undefined}
      className={`h-10 flex items-center justify-center rounded-xl text-xs font-semibold transition-all ${styles[state]}`}
    >
      {time}
    </div>
  )
}