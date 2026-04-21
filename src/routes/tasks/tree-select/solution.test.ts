import { describe, expect, it } from 'vitest'
import { renderTreeSelect } from './solution'

describe('renderTreeSelect', () => {
  const paths = ['a/b/c', 'a/b/d', 'a/e']

  it('renders all nodes as not selected when no clicks', () => {
    expect(renderTreeSelect(paths, [])).toBe(
      ['[ ]a', '.[ ]b', '..[ ]c', '..[ ]d', '.[ ]e', ''].join('\n'),
    )
  })

  it('clicking a leaf makes parents partial', () => {
    expect(renderTreeSelect(paths, ['c'])).toBe(
      ['[o]a', '.[o]b', '..[v]c', '..[ ]d', '.[ ]e', ''].join('\n'),
    )
  })

  it('clicking a parent selects all descendants', () => {
    expect(renderTreeSelect(paths, ['b'])).toBe(
      ['[o]a', '.[v]b', '..[v]c', '..[v]d', '.[ ]e', ''].join('\n'),
    )
  })

  it('selecting all children selects the parent', () => {
    expect(renderTreeSelect(paths, ['c', 'd', 'e'])).toBe(
      ['[v]a', '.[v]b', '..[v]c', '..[v]d', '.[v]e', ''].join('\n'),
    )
  })

  it('deselecting toggles back off', () => {
    expect(renderTreeSelect(paths, ['c', 'c'])).toBe(
      ['[ ]a', '.[ ]b', '..[ ]c', '..[ ]d', '.[ ]e', ''].join('\n'),
    )
  })

  it('ignores clicks on unknown nodes', () => {
    expect(renderTreeSelect(paths, ['zzz'])).toBe(
      ['[ ]a', '.[ ]b', '..[ ]c', '..[ ]d', '.[ ]e', ''].join('\n'),
    )
  })
})
