// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AbstractComponent, type TComponentConfig } from './solution'

class Basic extends AbstractComponent<{}> {
  toHTML() {
    return '<p>hello</p>'
  }
}

class Clicky extends AbstractComponent<{}> {
  clicks = 0
  toHTML() {
    return '<button>click</button>'
  }
  onClick() {
    this.clicks++
  }
}

class AfterRendered extends AbstractComponent<{}> {
  afterRendered = 0
  toHTML() {
    return 'x'
  }
  override afterRender() {
    this.afterRendered++
  }
}

describe('AbstractComponent', () => {
  let root: HTMLElement

  beforeEach(() => {
    root = document.createElement('div')
    document.body.appendChild(root)
  })

  afterEach(() => {
    root.remove()
  })

  it('mounts the rendered container into root', () => {
    const c = new Basic({ root })
    c.render()
    expect(root.children).toHaveLength(1)
    expect(c.container?.innerHTML).toBe('<p>hello</p>')
  })

  it('uses config.tag for the container element', () => {
    const c = new Basic({ root, tag: 'section' })
    c.render()
    expect(c.container?.tagName).toBe('SECTION')
  })

  it('defaults the container tag to div', () => {
    const c = new Basic({ root })
    c.render()
    expect(c.container?.tagName).toBe('DIV')
  })

  it('applies className classes to the container', () => {
    const c = new Basic({ root, className: ['a', 'b'] })
    c.render()
    expect(c.container?.classList.contains('a')).toBe(true)
    expect(c.container?.classList.contains('b')).toBe(true)
  })

  it('destroy removes the container from the DOM', () => {
    const c = new Basic({ root })
    c.render()
    c.destroy()
    expect(root.children).toHaveLength(0)
    expect(c.container).toBeNull()
  })

  it('re-rendering replaces the previous container', () => {
    const c = new Basic({ root })
    c.render()
    const first = c.container
    c.render()
    expect(c.container).not.toBe(first)
    expect(root.children).toHaveLength(1)
  })

  it('binds a registered event listener', () => {
    const c = new Clicky({ root, listeners: ['click'] })
    c.render()
    c.container?.click()
    expect(c.clicks).toBe(1)
  })

  it('destroy clears the events array', () => {
    const c = new Clicky({ root, listeners: ['click'] })
    c.render()
    c.destroy()
    expect(c.events).toHaveLength(0)
  })

  it('throws when a listener has no matching handler', () => {
    const c = new Basic({ root, listeners: ['click'] })
    expect(() => c.render()).toThrow(/handler onClick for click is not implemented/)
  })

  it('calls afterRender hook after mount', () => {
    const c = new AfterRendered({ root })
    c.render()
    expect(c.afterRendered).toBe(1)
  })

  it('merges config with defaults', () => {
    const cfg: TComponentConfig<{}> = { root }
    const c = new Basic(cfg)
    expect(c.config.tag).toBe('div')
    expect(c.config.className).toEqual([])
    expect(c.config.listeners).toEqual([])
  })
})
