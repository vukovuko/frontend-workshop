import { useRef } from 'react'
import { Tooltip } from './solution'

export function Demo() {
  const boundaryRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Fixed positions</div>
        <div className="flex flex-wrap gap-4 p-8 justify-center">
          <Tooltip position="top" content="On top">
            <button type="button" className="px-3 py-1.5 rounded-md border border-border text-sm">
              Top
            </button>
          </Tooltip>
          <Tooltip position="right" content="On right">
            <button type="button" className="px-3 py-1.5 rounded-md border border-border text-sm">
              Right
            </button>
          </Tooltip>
          <Tooltip position="bottom" content="On bottom">
            <button type="button" className="px-3 py-1.5 rounded-md border border-border text-sm">
              Bottom
            </button>
          </Tooltip>
          <Tooltip position="left" content="On left">
            <button type="button" className="px-3 py-1.5 rounded-md border border-border text-sm">
              Left
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">
          Auto position — constrained to the dashed boundary. Hover each button to see the tooltip
          flip to whichever side fits.
        </div>
        <div
          ref={boundaryRef}
          className="relative p-8 border-2 border-dashed border-border rounded-md flex justify-between items-center"
        >
          <Tooltip position="auto" content="Avoids overflow" boundary={boundaryRef}>
            <button type="button" className="px-3 py-1.5 rounded-md border border-border text-sm">
              Near left edge
            </button>
          </Tooltip>
          <Tooltip position="auto" content="Avoids overflow" boundary={boundaryRef}>
            <button type="button" className="px-3 py-1.5 rounded-md border border-border text-sm">
              Center
            </button>
          </Tooltip>
          <Tooltip position="auto" content="Avoids overflow" boundary={boundaryRef}>
            <button type="button" className="px-3 py-1.5 rounded-md border border-border text-sm">
              Near right edge
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
