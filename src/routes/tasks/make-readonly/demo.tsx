const rows = [
  {
    input: '{ title: string; description: string; completed: boolean }',
    keys: "'title'",
    result: '{ readonly title: string; description: string; completed: boolean }',
  },
  {
    input: '{ title: string; description: string; completed: boolean }',
    keys: "'title' | 'completed'",
    result: '{ readonly title: string; description: string; readonly completed: boolean }',
  },
]

export function Demo() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-3 py-2 font-medium">Input</th>
            <th className="text-left px-3 py-2 font-medium">Keys</th>
            <th className="text-left px-3 py-2 font-medium">Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.keys} className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs">{r.input}</td>
              <td className="px-3 py-2 font-mono text-xs">{r.keys}</td>
              <td className="px-3 py-2 font-mono text-xs">{r.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
