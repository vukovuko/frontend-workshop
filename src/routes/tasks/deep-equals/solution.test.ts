import { describe, expect, it } from 'vitest'
import { deepEquals } from './solution'

describe('deepEquals', () => {
  it('compares primitives with strict equality', () => {
    expect(deepEquals(1, 1)).toBe(true)
    expect(deepEquals('hello', 'hello')).toBe(true)
    expect(deepEquals(true, true)).toBe(true)
    expect(deepEquals(1, 2)).toBe(false)
    expect(deepEquals('a', 'b')).toBe(false)
  })

  it('handles null and undefined', () => {
    expect(deepEquals(null, null)).toBe(true)
    expect(deepEquals(undefined, undefined)).toBe(true)
    expect(deepEquals(null, undefined)).toBe(false)
    expect(deepEquals(null, 0)).toBe(false)
  })

  it('treats NaN as equal to NaN', () => {
    expect(deepEquals(NaN, NaN)).toBe(true)
  })

  it('rejects values of different types', () => {
    expect(deepEquals(1, '1')).toBe(false)
    expect(deepEquals([], {})).toBe(false)
    expect(deepEquals(true, 1)).toBe(false)
  })

  it('compares arrays element-wise', () => {
    expect(deepEquals([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(deepEquals([], [])).toBe(true)
    expect(deepEquals([1, 2], [1, 2, 3])).toBe(false)
    expect(deepEquals([1, 2, 3], [1, 2, 4])).toBe(false)
  })

  it('compares objects regardless of key order', () => {
    expect(deepEquals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true)
    expect(deepEquals({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
    expect(deepEquals({ a: 1 }, { a: 2 })).toBe(false)
    expect(deepEquals({ a: 1 }, { a: 1, b: 2 })).toBe(false)
  })

  it('compares nested structures', () => {
    expect(deepEquals({ users: [{ name: 'John' }] }, { users: [{ name: 'John' }] })).toBe(true)
    expect(deepEquals({ users: [{ name: 'John' }] }, { users: [{ name: 'Jane' }] })).toBe(false)
  })

  it('handles circular references without stack overflow', () => {
    const a: { value: number; self?: unknown } = { value: 1 }
    a.self = a
    const b: { value: number; self?: unknown } = { value: 1 }
    b.self = b
    expect(deepEquals(a, b)).toBe(true)
  })

  it('functions compare by reference', () => {
    const fn = () => 1
    expect(deepEquals(fn, fn)).toBe(true)
    expect(
      deepEquals(
        () => 1,
        () => 1,
      ),
    ).toBe(false)
  })
})
