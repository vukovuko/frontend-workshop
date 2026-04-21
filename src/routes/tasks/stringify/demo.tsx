import { stringify } from './solution'

function buildCircular() {
  const o: { a: number; self?: unknown } = { a: 1 }
  o.self = o
  return o
}

const cases: Array<{ label: string; value: unknown }> = [
  { label: 'null', value: null },
  { label: '42', value: 42 },
  { label: 'true', value: true },
  { label: "'hello'", value: 'hello' },
  { label: '[1, 2, 3]', value: [1, 2, 3] },
  { label: '{ a: 1 }', value: { a: 1 } },
  { label: '{ name: "John" }', value: { name: 'John' } },
  { label: 'new Set([1, 2])', value: new Set([1, 2]) },
  { label: 'new Map([["k", 1]])', value: new Map([['k', 1]]) },
  { label: '/abc/g', value: /abc/g },
  { label: 'circular self-ref', value: buildCircular() },
]

export function Demo() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-3 py-2 font-medium">Input</th>
            <th className="text-left px-3 py-2 font-medium">stringify()</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c.label} className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs">{c.label}</td>
              <td className="px-3 py-2 font-mono text-xs">{stringify(c.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
