import { useState } from 'react'
import { ProgressBar } from './solution'

export function Demo() {
  const [value, setValue] = useState(35)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">
          Drag the slider — watch the label color flip as the fill passes over it.
        </div>
        <ProgressBar value={value} />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Static examples</div>
        <ProgressBar value={0} />
        <ProgressBar value={25} />
        <ProgressBar value={50} />
        <ProgressBar value={75} />
        <ProgressBar value={100} />
      </div>

      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Custom label</div>
        <ProgressBar value={60} label="Uploading..." />
      </div>
    </div>
  )
}
