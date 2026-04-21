function tupleToObject<T extends readonly (string | number | symbol)[]>(
  tuple: T,
): { [P in T[number]]: P } {
  const out = {} as { [P in T[number]]: P }
  for (const value of tuple) {
    out[value as T[number]] = value as T[number]
  }
  return out
}

function fmt(o: object): string {
  const entries = Object.entries(o)
  if (entries.length === 0) return '{}'
  return `{ ${entries.map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ')} }`
}

const examples: Array<{ label: string; tuple: readonly (string | number)[] }> = [
  {
    label: "['tesla', 'model 3', 'model X', 'model Y']",
    tuple: ['tesla', 'model 3', 'model X', 'model Y'] as const,
  },
  { label: '[1, 2, 3, 4]', tuple: [1, 2, 3, 4] as const },
  { label: "[1, '2', 3, '4']", tuple: [1, '2', 3, '4'] as const },
]

export function Demo() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-3 py-2 font-medium">Tuple</th>
            <th className="text-left px-3 py-2 font-medium">Object</th>
          </tr>
        </thead>
        <tbody>
          {examples.map((ex) => (
            <tr key={ex.label} className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs whitespace-nowrap">{ex.label}</td>
              <td className="px-3 py-2 font-mono text-xs">{fmt(tupleToObject(ex.tuple))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
