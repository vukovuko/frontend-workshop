import { describe, expect, it } from 'vitest'
import { detectType } from './solution'

describe('detectType', () => {
  it('returns "null" / "undefined" for nullish values', () => {
    expect(detectType(null)).toBe('null')
    expect(detectType(undefined)).toBe('undefined')
  })

  it('returns the lowercase primitive type', () => {
    expect(detectType(42)).toBe('number')
    expect(detectType('hello')).toBe('string')
    expect(detectType(true)).toBe('boolean')
    expect(detectType(Symbol())).toBe('symbol')
    expect(detectType(123n)).toBe('bigint')
  })

  it('distinguishes plain objects, arrays, and functions', () => {
    expect(detectType({})).toBe('object')
    expect(detectType([])).toBe('array')
    expect(detectType(() => {})).toBe('function')
  })

  it('handles built-in objects', () => {
    expect(detectType(new Date())).toBe('date')
    expect(detectType(/regex/)).toBe('regexp')
    expect(detectType(new Map())).toBe('map')
    expect(detectType(new Set())).toBe('set')
    expect(detectType(new WeakMap())).toBe('weakmap')
    expect(detectType(new WeakSet())).toBe('weakset')
    expect(detectType(new Error())).toBe('error')
    expect(detectType(Promise.resolve())).toBe('promise')
  })

  it('handles objects with null prototype', () => {
    expect(detectType(Object.create(null))).toBe('object')
  })
})
