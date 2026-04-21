import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Tooltip } from './solution'

describe('Tooltip', () => {
  it('renders the trigger children', () => {
    const html = renderToString(
      <Tooltip content="Helpful hint">
        <button type="button">Trigger</button>
      </Tooltip>,
    )
    expect(html).toContain('Trigger')
  })

  it('does not render the tooltip bubble before hover', () => {
    const html = renderToString(
      <Tooltip content="Helpful hint">
        <button type="button">Trigger</button>
      </Tooltip>,
    )
    expect(html).not.toContain('role="tooltip"')
    expect(html).not.toContain('Helpful hint')
  })

  it('wrapper has relative positioning for absolute-child placement', () => {
    const html = renderToString(
      <Tooltip content="x">
        <span>y</span>
      </Tooltip>,
    )
    expect(html).toContain('relative')
  })
})
