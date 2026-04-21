import { useEffect, useRef } from 'react'
import { AbstractComponent, type TComponentConfig } from './solution'

class Counter extends AbstractComponent<{ initial: number }> {
  count: number

  constructor(config: TComponentConfig<{ initial: number }>) {
    super({ ...config, listeners: ['click'], className: ['counter'] })
    this.count = config.initial
  }

  toHTML() {
    return `
      <div style="display: flex; align-items: center; gap: 12px;">
        <button
          data-action="decrement"
          style="padding: 4px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--muted); cursor: pointer; font-size: 16px;"
        >−</button>
        <span style="font-family: var(--font-mono); font-size: 18px; min-width: 32px; text-align: center;">${this.count}</span>
        <button
          data-action="increment"
          style="padding: 4px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--muted); cursor: pointer; font-size: 16px;"
        >+</button>
      </div>
    `
  }

  onClick(e: Event) {
    const action = (e.target as HTMLElement).dataset['action']
    if (action === 'increment') this.count++
    if (action === 'decrement') this.count--
    if (action) this.render()
  }
}

export function Demo() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return
    const counter = new Counter({ root: rootRef.current, initial: 0 })
    counter.render()
    return () => counter.destroy()
  }, [])

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        Rendered below is a vanilla Counter built with <code>AbstractComponent</code>. The React
        code below only mounts and cleans up — the counter's state and DOM live entirely inside the
        class.
      </div>
      <div ref={rootRef} className="p-4 rounded-md border border-border bg-card" />
    </div>
  )
}
