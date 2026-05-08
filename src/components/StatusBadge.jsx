const config = {
  pending:   { bg: 'bg-amber-50',  text: 'text-amber-800', dot: 'bg-amber-500',  label: 'Pending'   },
  confirmed: { bg: 'bg-green-50',  text: 'text-green-800', dot: 'bg-green-500',  label: 'Confirmed' },
  cancelled: { bg: 'bg-red-50',    text: 'text-red-700',   dot: 'bg-red-400',    label: 'Cancelled' },
  completed: { bg: 'bg-blue-50',   text: 'text-blue-800',  dot: 'bg-blue-400',   label: 'Completed' },
}

export default function StatusBadge({ status }) {
  const c = config[status] || config.pending
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  )
}