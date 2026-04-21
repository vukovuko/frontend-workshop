import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Tab, Tabs } from './solution'

describe('Tabs', () => {
  it('renders a button for each tab', () => {
    const html = renderToString(
      <Tabs>
        <Tab name="Home">Home content</Tab>
        <Tab name="Profile">Profile content</Tab>
        <Tab name="Settings">Settings content</Tab>
      </Tabs>,
    )
    expect(html.match(/role="tab"/g) ?? []).toHaveLength(3)
    expect(html).toContain('Home')
    expect(html).toContain('Profile')
    expect(html).toContain('Settings')
  })

  it('defaults to the first tab when defaultTab is not provided', () => {
    const html = renderToString(
      <Tabs>
        <Tab name="First">First content</Tab>
        <Tab name="Second">Second content</Tab>
      </Tabs>,
    )
    expect(html).toContain('First content')
    expect(html).not.toContain('Second content')
  })

  it('respects defaultTab when provided', () => {
    const html = renderToString(
      <Tabs defaultTab="Profile">
        <Tab name="Home">Home content</Tab>
        <Tab name="Profile">Profile content</Tab>
      </Tabs>,
    )
    expect(html).toContain('Profile content')
    expect(html).not.toContain('Home content')
  })

  it('marks the active tab with aria-selected', () => {
    const html = renderToString(
      <Tabs defaultTab="B">
        <Tab name="A">A</Tab>
        <Tab name="B">B</Tab>
      </Tabs>,
    )
    expect(html).toContain('id="tab-B"')
    expect(html).toMatch(/aria-selected="true"[^>]*>B</)
  })

  it('renders content inside a tabpanel section', () => {
    const html = renderToString(
      <Tabs>
        <Tab name="One">One content</Tab>
      </Tabs>,
    )
    expect(html).toContain('role="tabpanel"')
  })
})
