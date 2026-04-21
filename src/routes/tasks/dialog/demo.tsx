import { useState } from 'react'
import { Dialog } from './solution'

export function Demo() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<string>('no action yet')

  const onConfirm = () => {
    setResult('confirmed')
    setOpen(false)
  }
  const onCancel = () => {
    setResult('cancelled')
    setOpen(false)
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Open dialog
      </button>
      <div className="text-sm text-muted-foreground">
        Last action: <code className="text-foreground">{result}</code>
      </div>
      <Dialog open={open} onConfirm={onConfirm} onCancel={onCancel}>
        <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
        <p className="text-sm text-muted-foreground">
          Press Escape, click outside, or use the buttons below. All three paths flow through{' '}
          <code>onCancel</code> or <code>onConfirm</code>.
        </p>
      </Dialog>
    </div>
  )
}
