import { useMemo, useState } from 'react'
import { throttle } from './solution'

export function Demo() {
  const [clicks, setClicks] = useState(0)
  const [fires, setFires] = useState(0)

  const bumpFires = useMemo(() => {
    try {
      return throttle(() => {
        setFires((f) => f + 1)
      }, 1000)
    } catch {
      return null
    }
  }, [])

  const onClick = () => {
    setClicks((c) => c + 1)
    if (bumpFires) bumpFires()
  }

  const reset = () => {
    setClicks(0)
    setFires(0)
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={onClick}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Click rapidly (1s throttle)
      </button>
      <div className="text-sm">
        Clicks: <strong className="text-foreground">{clicks}</strong>
      </div>
      <div className="text-sm">
        Fires: <strong className="text-foreground">{fires}</strong>
      </div>
      <button
        type="button"
        onClick={reset}
        className="text-sm text-muted-foreground hover:text-foreground underline"
      >
        reset
      </button>
    </div>
  )
}
