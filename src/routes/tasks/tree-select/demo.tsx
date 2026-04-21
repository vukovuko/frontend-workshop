import { useMemo, useState } from 'react'
import { renderTreeSelect } from './solution'

const defaultPaths = ['a/b/c', 'a/b/d', 'a/e']

export function Demo() {
  const [pathsText, setPathsText] = useState(defaultPaths.join('\n'))
  const [clicksText, setClicksText] = useState('c')

  const paths = useMemo(
    () =>
      pathsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    [pathsText],
  )
  const clicks = useMemo(
    () =>
      clicksText
        .split(/[\s,]+/)
        .map((s) => s.trim())
        .filter(Boolean),
    [clicksText],
  )

  const output = useMemo(() => {
    try {
      return renderTreeSelect(paths, clicks)
    } catch (e) {
      return e instanceof Error ? e.message : String(e)
    }
  }, [paths, clicks])

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          <label className="text-sm text-muted-foreground" htmlFor="clicks-input">
            Clicks (comma or space separated)
          </label>
          <textarea
            id="clicks-input"
            rows={6}
            value={clicksText}
            onChange={(e) => setClicksText(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <pre className="rounded-md border border-border bg-muted p-3 text-xs font-mono whitespace-pre overflow-x-auto">
        <code>{output || '(empty)'}</code>
      </pre>
    </div>
  )
}
