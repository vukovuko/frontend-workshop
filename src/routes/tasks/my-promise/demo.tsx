import { useState } from 'react'
import { MyPromise } from './solution'

export function Demo() {
  const [log, setLog] = useState<string[]>([])

  const append = (line: string) => setLog((l) => [...l, line])

  const runChain = () => {
    setLog([])
    append('start')
    new MyPromise<string>((resolve) => {
      setTimeout(() => resolve('Hello'), 300)
    })
      .then((value) => {
        append(`then 1: ${value}`)
        return `${value} World`
      })
      .then((value) => {
        append(`then 2: ${value}`)
      })
  }

  const runError = () => {
    setLog([])
    append('start')
    new MyPromise<number>((resolve) => resolve(1))
      .then(() => {
        throw new Error('boom')
      })
      .catch((err: Error) => {
        append(`catch: ${err.message}`)
      })
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={runChain}
          className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
        >
          Run async chain
        </button>
        <button
          type="button"
          onClick={runError}
          className="px-3 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors text-sm"
        >
          Run error chain
        </button>
        <button
          type="button"
          onClick={() => setLog([])}
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          clear
        </button>
      </div>
      <pre className="rounded-md border border-border bg-muted p-3 text-xs font-mono min-h-24">
        <code>{log.length === 0 ? '(empty)' : log.join('\n')}</code>
      </pre>
    </div>
  )
}
