import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Accordion, type TAccordionItem } from './solution'

const items: TAccordionItem[] = [
  { id: '1', title: 'First', content: 'Content 1' },
  { id: '2', title: 'Second', content: 'Content 2' },
]

describe('Accordion', () => {
  it('renders a <details> for each item', () => {
    const html = renderToString(<Accordion items={items} />)
    expect(html.match(/<details/g) ?? []).toHaveLength(2)
  })

  it('each summary contains the item title', () => {
    const html = renderToString(<Accordion items={items} />)
    expect(html).toContain('First')
    expect(html).toContain('Second')
  })

  it('each body contains the item content', () => {
    const html = renderToString(<Accordion items={items} />)
    expect(html).toContain('Content 1')
    expect(html).toContain('Content 2')
  })

  it('renders nothing visible for empty items', () => {
    const html = renderToString(<Accordion items={[]} />)
    expect(html.match(/<details/g)).toBeNull()
  })
})
