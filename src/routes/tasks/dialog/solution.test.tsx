import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { Dialog } from './solution'

describe('Dialog', () => {
  it('renders a dialog element with children', () => {
    const html = renderToString(
      <Dialog open={false} onConfirm={() => {}} onCancel={() => {}}>
        Are you sure?
      </Dialog>,
    )
    expect(html).toContain('<dialog')
    expect(html).toContain('Are you sure?')
  })

  it('renders Confirm and Cancel buttons', () => {
    const html = renderToString(
      <Dialog open={false} onConfirm={() => {}} onCancel={() => {}}>
        body
      </Dialog>,
    )
    expect(html).toContain('Confirm')
    expect(html).toContain('Cancel')
  })

  it('types are well-formed (smoke test)', () => {
    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    const html = renderToString(
      <Dialog open={true} onConfirm={onConfirm} onCancel={onCancel}>
        hi
      </Dialog>,
    )
    expect(html).toContain('hi')
  })
})
