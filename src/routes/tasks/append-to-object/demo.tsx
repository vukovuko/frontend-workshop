function appendToObject<T extends object, U extends string, V>(
  obj: T,
  key: U,
  value: V,
): T & { [P in U]: V } {
  return { ...obj, [key]: value } as T & { [P in U]: V }
}

function fmt(o: object): string {
  const entries = Object.entries(o)
  if (entries.length === 0) return '{}'
  return `{ ${entries.map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ')} }`
}

const rows = [
  {
    input: { id: '1' },
    key: 'value',
    value: 4,
  },
  {
    input: { key: 'cat', value: 'green' },
    key: 'home',
    value: true,
  },
  {
    input: { key: 'cow', value: 'yellow', sun: false },
    key: 'moon',
    value: null,
  },
] as const

export function Demo() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-3 py-2 font-medium">Input</th>
            <th className="text-left px-3 py-2 font-medium">Append</th>
            <th className="text-left px-3 py-2 font-medium">Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs">{fmt(r.input)}</td>
              <td className="px-3 py-2 font-mono text-xs">
                {r.key}: {JSON.stringify(r.value)}
              </td>
              <td className="px-3 py-2 font-mono text-xs">
                {fmt(appendToObject(r.input, r.key, r.value))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
