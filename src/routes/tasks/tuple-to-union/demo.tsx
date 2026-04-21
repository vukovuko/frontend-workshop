const examples: Array<{ label: string; value: readonly unknown[] }> = [
  { label: "['1', '2', '3']", value: ['1', '2', '3'] as const },
  { label: '[123, 456, 789]', value: [123, 456, 789] as const },
  { label: '[true, false]', value: [true, false] as const },
  { label: '[123, "456", true]', value: [123, '456', true] as const },
  { label: "['only']", value: ['only'] as const },
]

function formatValue(v: unknown): string {
  return typeof v === 'string' ? `'${v}'` : String(v)
}

function formatUnion(values: readonly unknown[]): string {
  if (values.length === 0) return 'never'
  const unique = Array.from(new Set(values))
  return unique.map(formatValue).join(' | ')
}

export function Demo() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-3 py-2 font-medium">Tuple</th>
            <th className="text-left px-3 py-2 font-medium">Union</th>
          </tr>
        </thead>
        <tbody>
          {examples.map((ex) => (
            <tr key={ex.label} className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs">{ex.label}</td>
              <td className="px-3 py-2 font-mono text-xs">{formatUnion(ex.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
