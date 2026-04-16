import { detectType } from './solution'

const examples: Array<{ label: string; value: unknown }> = [
  { label: 'null', value: null },
  { label: 'undefined', value: undefined },
  { label: '42', value: 42 },
  { label: "'hello'", value: 'hello' },
  { label: 'true', value: true },
  { label: '[]', value: [] },
  { label: '{}', value: {} },
  { label: '() => {}', value: () => {} },
  { label: 'new Date()', value: new Date() },
  { label: '/regex/', value: /regex/ },
  { label: 'new Map()', value: new Map() },
  { label: 'new Set()', value: new Set() },
  { label: 'new Error()', value: new Error() },
  { label: 'Promise.resolve()', value: Promise.resolve() },
]

function safeDetect(value: unknown): { ok: boolean; result: string } {
  try {
    return { ok: true, result: detectType(value) }
  } catch (err) {
    return { ok: false, result: err instanceof Error ? err.message : String(err) }
  }
}

export function Demo() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-3 py-2 font-medium">Input</th>
            <th className="text-left px-3 py-2 font-medium">detectType()</th>
          </tr>
        </thead>
        <tbody>
          {examples.map((ex) => {
            const { ok, result } = safeDetect(ex.value)
            return (
              <tr key={ex.label} className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs">{ex.label}</td>
                <td
                  className={`px-3 py-2 font-mono text-xs ${
                    ok ? 'text-foreground' : 'text-destructive'
                  }`}
                >
                  {result}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
