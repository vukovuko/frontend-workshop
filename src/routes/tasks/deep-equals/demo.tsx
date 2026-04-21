import { deepEquals } from './solution'

type Case = { label: string; a: unknown; b: unknown }

const cases: Case[] = [
  { label: '1 vs 1', a: 1, b: 1 },
  { label: "'hello' vs 'hello'", a: 'hello', b: 'hello' },
  { label: 'NaN vs NaN', a: NaN, b: NaN },
  { label: 'null vs undefined', a: null, b: undefined },
  { label: "1 vs '1'", a: 1, b: '1' },
  { label: '[1,2,3] vs [1,2,3]', a: [1, 2, 3], b: [1, 2, 3] },
  { label: '[] vs {}', a: [], b: {} },
  { label: '{a:1,b:2} vs {b:2,a:1}', a: { a: 1, b: 2 }, b: { b: 2, a: 1 } },
  {
    label: '{u:[{n:"John"}]} vs {u:[{n:"John"}]}',
    a: { u: [{ n: 'John' }] },
    b: { u: [{ n: 'John' }] },
  },
]

function buildCircular() {
  const a: { value: number; self?: unknown } = { value: 1 }
  a.self = a
  const b: { value: number; self?: unknown } = { value: 1 }
  b.self = b
  return { a, b }
}

export function Demo() {
  const { a: circA, b: circB } = buildCircular()
  const allCases: Case[] = [...cases, { label: 'circular a vs circular b', a: circA, b: circB }]

  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-3 py-2 font-medium">Compare</th>
            <th className="text-left px-3 py-2 font-medium">deepEquals</th>
          </tr>
        </thead>
        <tbody>
          {allCases.map((c) => (
            <tr key={c.label} className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs">{c.label}</td>
              <td className="px-3 py-2 font-mono text-xs">{String(deepEquals(c.a, c.b))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
