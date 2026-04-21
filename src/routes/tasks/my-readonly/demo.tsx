import { useState } from 'react'

const frozen = Object.freeze({ title: 'Hey', description: 'Initial' })

export function Demo() {
  const [result, setResult] = useState<string>('not tried yet')

  const tryMutate = () => {
    try {
      // @ts-expect-error runtime mutation attempt on frozen object
      frozen.title = 'Changed'
      setResult(`after mutation: title = ${frozen.title}`)
    } catch (e) {
      setResult(e instanceof Error ? `rejected: ${e.message}` : String(e))
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1 text-sm">
        <div className="text-muted-foreground">
          Runtime analog: <code>Object.freeze()</code>. TypeScript's <code>readonly</code> is erased
          at build time, so the closest runtime check is attempting to mutate a frozen object under
          strict mode — which throws.
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-3 py-2 font-medium">Input</th>
              <th className="text-left px-3 py-2 font-medium">MyReadonly</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs">{'{ title: string }'}</td>
              <td className="px-3 py-2 font-mono text-xs">{'{ readonly title: string }'}</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs">{'{ id: number; name: string }'}</td>
              <td className="px-3 py-2 font-mono text-xs">
                {'{ readonly id: number; readonly name: string }'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={tryMutate}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Try to mutate frozen.title
        </button>
        <div className="text-sm font-mono text-muted-foreground">{result}</div>
      </div>
    </div>
  )
}
