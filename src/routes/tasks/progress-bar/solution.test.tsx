import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ProgressBar } from './solution'

describe('ProgressBar', () => {
  it('renders role="progressbar" with proper ARIA attrs', () => {
    const html = renderToString(<ProgressBar value={50} />)
    expect(html).toContain('role="progressbar"')
    expect(html).toContain('aria-valuenow="50"')
    expect(html).toContain('aria-valuemin="0"')
    expect(html).toContain('aria-valuemax="100"')
  })

  it('renders the default percentage label', () => {
    const html = renderToString(<ProgressBar value={42} />)
    expect(html).toContain('42%')
  })

  it('accepts a custom label', () => {
    const html = renderToString(<ProgressBar value={30} label="Uploading..." />)
    expect(html).toContain('Uploading...')
  })

  it('respects a custom max', () => {
    const html = renderToString(<ProgressBar value={50} max={200} />)
    expect(html).toContain('aria-valuemax="200"')
    expect(html).toContain('25%')
  })

  it('clamps negative values to 0', () => {
    const html = renderToString(<ProgressBar value={-10} />)
    expect(html).toContain('translateX(-100%)')
  })

  it('clamps values above max to 100%', () => {
    const html = renderToString(<ProgressBar value={9999} />)
    expect(html).toContain('translateX(-0%)')
  })

  it('applies clip-path based on percentage', () => {
    const html = renderToString(<ProgressBar value={30} />)
    expect(html).toContain('inset(0 70% 0 0)')
  })
})
