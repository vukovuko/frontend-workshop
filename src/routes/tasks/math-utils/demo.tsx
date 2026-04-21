import { useState } from 'react'
import { distance, fitContent, lerp, remap } from './solution'

export function Demo() {
  const [t, setT] = useState(0.5)

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h3 className="text-sm font-semibold">distance</h3>
        <div className="overflow-hidden rounded-md border border-border">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-t border-border first:border-t-0">
                <td className="px-3 py-2 font-mono text-xs">distance(0, 0, 3, 4)</td>
                <td className="px-3 py-2 font-mono text-xs">{distance(0, 0, 3, 4)}</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs">distance(-1, -1, 2, 3)</td>
                <td className="px-3 py-2 font-mono text-xs">{distance(-1, -1, 2, 3)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold">remap</h3>
        <div className="overflow-hidden rounded-md border border-border">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-t border-border first:border-t-0">
                <td className="px-3 py-2 font-mono text-xs">remap(5, 0, 10, 100, 200)</td>
                <td className="px-3 py-2 font-mono text-xs">{remap(5, 0, 10, 100, 200)}</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs">remap(-5, 0, 10, 100, 200)</td>
                <td className="px-3 py-2 font-mono text-xs">{remap(-5, 0, 10, 100, 200)}</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs">remap(-5, 0, 10, 100, 200, true)</td>
                <td className="px-3 py-2 font-mono text-xs">{remap(-5, 0, 10, 100, 200, true)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold">lerp (interactive)</h3>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm font-mono">
          t = {t.toFixed(2)} → lerp(0, 100, t) = {lerp(0, 100, t).toFixed(2)}
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold">fitContent</h3>
        <div className="overflow-hidden rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-3 py-2 font-medium">Call</th>
                <th className="text-left px-3 py-2 font-medium">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs">fitContent(400, 400, 200, 100)</td>
                <td className="px-3 py-2 font-mono text-xs">
                  {JSON.stringify(fitContent(400, 400, 200, 100))}
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs">fitContent(300, 300, 300, 300)</td>
                <td className="px-3 py-2 font-mono text-xs">
                  {JSON.stringify(fitContent(300, 300, 300, 300))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
