const examples: Array<{ label: string; value: readonly unknown[] }> = [
  { label: '[]', value: [] as const },
  { label: "['a']", value: ['a'] as const },
  { label: "['a', 'b']", value: ['a', 'b'] as const },
  { label: 'tesla', value: ['tesla', 'model 3', 'model X', 'model Y'] as const },
  {
    label: 'spaceX',
    value: ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const,
  },
]

export function Demo() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-3 py-2 font-medium">Tuple</th>
            <th className="text-left px-3 py-2 font-medium">Length</th>
          </tr>
        </thead>
        <tbody>
          {examples.map((ex) => (
            <tr key={ex.label} className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs">{ex.label}</td>
              <td className="px-3 py-2 font-mono text-xs">{ex.value.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
