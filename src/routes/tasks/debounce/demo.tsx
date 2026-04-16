import { useEffect, useMemo, useState } from 'react'
import { debounce } from './solution'

export function Demo() {
  const [input, setInput] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [callCount, setCallCount] = useState(0)

  const update = useMemo(() => {
    try {
      return debounce((value: string) => {
        setDebouncedValue(value)
        setCallCount((c) => c + 1)
      }, 500)
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    if (update) update(input)
  }, [input, update])

  return (
    <div className="space-y-3">
      <input
        id="debounce-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here"
        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <div className="text-sm">
        Debounced (500ms): <code className="text-foreground">{debouncedValue || '—'}</code>
      </div>
      <div className="text-sm">
        Calls: <strong className="text-foreground">{callCount}</strong>
      </div>
    </div>
  )
}
