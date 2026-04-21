const source = {
  title: 'Finish workshop',
  description: 'Implement all tasks',
  completed: false,
} as const

function pickKeys<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> {
  const out = {} as Pick<T, K>
  for (const key of keys) {
    out[key] = obj[key]
  }
  return out
}

function fmt(o: object): string {
  const entries = Object.entries(o)
  if (entries.length === 0) return '{}'
  return `{ ${entries.map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ')} }`
}

const examples: Array<{ keys: readonly (keyof typeof source)[] }> = [
  { keys: ['title'] },
  { keys: ['title', 'completed'] },
  { keys: ['title', 'description', 'completed'] },
]

export function Demo() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-3 py-2 font-medium">Keys</th>
            <th className="text-left px-3 py-2 font-medium">Result</th>
          </tr>
        </thead>
        <tbody>
          {examples.map((ex) => (
            <tr key={ex.keys.join(',')} className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs whitespace-nowrap">
                {ex.keys.map((k) => `'${k}'`).join(' | ')}
              </td>
              <td className="px-3 py-2 font-mono text-xs">{fmt(pickKeys(source, ex.keys))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
