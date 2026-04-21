import { useEffect, useMemo, useState } from 'react'
import { renderTreeSelect } from './solution'

const defaultPaths = ['a/b/c', 'a/b/d', 'a/e']

type Status = 'v' | ' ' | 'o'
type Node = { name: string; depth: number; status: Status }

function parseRendered(output: string): Node[] {
  return output
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) => {
      const depth = line.match(/^\.*/)?.[0].length ?? 0
      const status = (line.match(/\[(.)\]/)?.[1] ?? ' ') as Status
      const name = line.slice(line.indexOf(']') + 1)
      return { name, depth, status }
    })
}

function Box({ status }: { status: Status }) {
  const filled = status === 'v' || status === 'o'
  return (
    <span
      className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
        filled ? 'bg-primary border-primary' : 'bg-background border-border'
      }`}
    >
      {status === 'v' && (
        <svg
          viewBox="0 0 12 12"
          className="w-3 h-3 text-primary-foreground"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 6.5l2.25 2.25L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {status === 'o' && (
        <svg
          viewBox="0 0 12 12"
          className="w-3 h-3 text-primary-foreground"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 6h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      )}
    </span>
  )
}

function Row({ node, onToggle }: { node: Node; onToggle: (name: string) => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={node.status === 'o' ? 'mixed' : node.status === 'v'}
      onClick={() => onToggle(node.name)}
      className="w-full flex items-center gap-2 py-1.5 rounded hover:bg-muted cursor-pointer select-none text-left pr-2"
      style={{ paddingLeft: `${node.depth * 1.25 + 0.5}rem` }}
    >
      <Box status={node.status} />
      <span className="font-mono text-sm">{node.name}</span>
    </button>
  )
}

export function Demo() {
  const [pathsText, setPathsText] = useState(defaultPaths.join('\n'))
  const [clicks, setClicks] = useState<string[]>([])

  const paths = useMemo(
    () =>
      pathsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    [pathsText],
  )

  useEffect(() => {
    setClicks([])
  }, [pathsText])

  const nodes = useMemo(() => {
    try {
      return parseRendered(renderTreeSelect(paths, clicks))
    } catch {
      return []
    }
  }, [paths, clicks])

  const toggle = (name: string) => setClicks((prev) => [...prev, name])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground" htmlFor="paths-input">
            Paths (one per line)
          </label>
          <textarea
            id="paths-input"
            rows={6}
            value={pathsText}
            onChange={(e) => setPathsText(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tree</span>
            <button
              type="button"
              onClick={() => setClicks([])}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              reset
            </button>
          </div>
          <div className="rounded-md border border-border bg-background p-1 min-h-40">
            {nodes.length === 0 ? (
              <div className="text-sm text-muted-foreground px-2 py-1">(no paths)</div>
            ) : (
              nodes.map((n, i) => <Row key={`${n.name}-${i}`} node={n} onToggle={toggle} />)
            )}
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Click a box to toggle. A partially-selected parent shows a dash; fully-selected shows a
        checkmark.
      </div>
    </div>
  )
}
