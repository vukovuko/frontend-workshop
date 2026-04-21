import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { GPTChat } from './solution'

describe('GPTChat', () => {
  it('renders the Send button before any stream', () => {
    const html = renderToString(<GPTChat />)
    expect(html).toContain('Send')
    expect(html).not.toContain('Stop')
  })

  it('renders a textarea for input', () => {
    const html = renderToString(<GPTChat />)
    expect(html).toContain('<textarea')
  })

  it('renders the empty-state placeholder before any content', () => {
    const html = renderToString(<GPTChat />)
    expect(html).toContain('to stream a response')
  })
})
