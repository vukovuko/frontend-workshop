import { describe, expect, it } from 'vitest'
import { stringify } from './solution'

describe('stringify', () => {
  it('handles primitives', () => {
    expect(stringify(null)).toBe('null')
    expect(stringify(42)).toBe('42')
    expect(stringify(3.14)).toBe('3.14')
    expect(stringify(true)).toBe('true')
    expect(stringify(false)).toBe('false')
    expect(stringify('hello')).toBe('"hello"')
    expect(stringify(123n)).toBe('123')
  })

  it('formats arrays', () => {
    expect(stringify([1, 2, 3])).toBe('[1,2,3]')
    expect(stringify([])).toBe('[]')
    expect(stringify(['a', 'b'])).toBe('["a","b"]')
  })

  it('formats objects', () => {
    expect(stringify({ a: 1 })).toBe('{ a: 1 }')
    expect(stringify({ name: 'John' })).toBe('{ name: "John" }')
  })

  it('formats sets and maps', () => {
    expect(stringify(new Set([1, 2, 3]))).toBe('[1,2,3]')
    expect(stringify(new Map([['k', 1]]))).toBe('{ k: 1 }')
  })

  it('handles nested structures', () => {
    expect(stringify({ arr: [1, 2], nested: { a: 1 } })).toBe('{ arr: [1,2], nested: { a: 1 } }')
  })

  it('uses [Circular] for circular references', () => {
    const obj: { a: number; self?: unknown } = { a: 1 }
    obj.self = obj
    expect(stringify(obj)).toBe('{ a: 1, self: [Circular] }')
  })

  it('calls .toString on regexp', () => {
    expect(stringify(/abc/g)).toBe('/abc/g')
  })
})
