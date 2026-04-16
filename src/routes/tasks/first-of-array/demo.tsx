const examples: Array<{ label: string; value: readonly unknown[] }> = [
  { label: "['a', 'b', 'c']", value: ['a', 'b', 'c'] as const },
  { label: '[3, 2, 1]', value: [3, 2, 1] as const },
  { label: '[true, 42]', value: [true, 42] as const },
  { label: "['only']", value: ['only'] as const },
  { label: '[]', value: [] as const },
]

function formatFirst(v: readonly unknown[]): string {
  if (v.length === 0) return 'undefined (never at type level)'
  const first = v[0]
  return typeof first === 'string' ? `'${first}'` : String(first)
}

export function Demo() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-3 py-2 font-medium">Tuple</th>
            <th className="text-left px-3 py-2 font-medium">First</th>
          </tr>
        </thead>
        <tbody>
          {examples.map((ex) => (
            <tr key={ex.label} className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs">{ex.label}</td>
              <td className="px-3 py-2 font-mono text-xs">{formatFirst(ex.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
