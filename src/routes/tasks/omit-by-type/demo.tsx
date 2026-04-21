const rows = [
  { filter: 'number', result: '{ name: string; completed: boolean }' },
  { filter: 'string', result: '{ id: number; completed: boolean; age: number }' },
  { filter: 'boolean', result: '{ id: number; name: string; age: number }' },
  { filter: 'symbol', result: 'Model (unchanged)' },
]

export function Demo() {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        <code>{'Model = { id: number; name: string; completed: boolean; age: number }'}</code>
      </div>
      <div className="overflow-hidden rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-3 py-2 font-medium">Filter type</th>
              <th className="text-left px-3 py-2 font-medium">OmitByType&lt;Model, …&gt;</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.filter} className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs">{r.filter}</td>
                <td className="px-3 py-2 font-mono text-xs">{r.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
