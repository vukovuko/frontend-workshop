import { type ChangeEvent, useRef, useState } from 'react'
import { useFileUpload } from './solution'

export function Demo() {
  const [state, controls] = useFileUpload()
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null
    setFile(selected)
    if (selected) controls.start(selected)
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Pick a file to see the raw hook state. This demo intentionally shows the state as a table —
        no fancy UI, just the values the hook returns.
      </div>

      <input
        ref={inputRef}
        type="file"
        onChange={onChange}
        className="text-sm file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer file:hover:bg-primary/90"
      />

      <div className="rounded-md border border-border overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-t border-border first:border-t-0">
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">status</td>
              <td className="px-3 py-2 font-mono text-xs">{state.status}</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">progress</td>
              <td className="px-3 py-2 font-mono text-xs">{state.progress.toFixed(1)}%</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">bytes</td>
              <td className="px-3 py-2 font-mono text-xs">{state.bytes.toLocaleString()}</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">speed</td>
              <td className="px-3 py-2 font-mono text-xs">{state.speed.toFixed(1)} KB/s</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">remainingTimeMs</td>
              <td className="px-3 py-2 font-mono text-xs">
                {state.remainingTimeMs == null ? '—' : Math.round(state.remainingTimeMs)}
              </td>
            </tr>
            {state.error && (
              <tr className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">error</td>
                <td className="px-3 py-2 font-mono text-xs text-destructive">{state.error}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={state.status !== 'uploading'}
          onClick={() => controls.pause()}
          className="px-3 py-1.5 text-sm rounded-md border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Pause
        </button>
        <button
          type="button"
          disabled={state.status !== 'paused' || !file}
          onClick={() => file && controls.resume(file)}
          className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Resume
        </button>
        <button
          type="button"
          disabled={state.status === 'idle'}
          onClick={() => {
            controls.cancel()
            setFile(null)
            if (inputRef.current) inputRef.current.value = ''
          }}
          className="px-3 py-1.5 text-sm rounded-md border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
