function mergeObjects<F extends object, S extends object>(first: F, second: S): F & S {
  return { ...first, ...second } as F & S
}

function fmt(o: object): string {
  const entries = Object.entries(o)
  if (entries.length === 0) return '{}'
  return `{ ${entries.map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ')} }`
}

const rows = [
  { first: { a: 1, b: 'foo' }, second: { b: 2, c: true } },
  { first: { x: 'hi' }, second: { y: 42 } },
  { first: { name: 'Vuko', age: 20 }, second: { age: 99 } },
]

export function Demo() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-3 py-2 font-medium">First</th>
            <th className="text-left px-3 py-2 font-medium">Second</th>
            <th className="text-left px-3 py-2 font-medium">Merge</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs">{fmt(r.first)}</td>
              <td className="px-3 py-2 font-mono text-xs">{fmt(r.second)}</td>
              <td className="px-3 py-2 font-mono text-xs">
                {fmt(mergeObjects(r.first, r.second))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
