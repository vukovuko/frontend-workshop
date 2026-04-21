import { describe, expectTypeOf, it } from 'vitest'
import type { Merge } from './solution'

describe('Merge', () => {
  it('second type overrides first on conflicting keys', () => {
    type Foo = { a: number; b: string }
    type Bar = { b: number; c: boolean }
    expectTypeOf<Merge<Foo, Bar>>().toEqualTypeOf<{
      a: number
      b: number
      c: boolean
    }>()
  })

  it('returns F when S is empty', () => {
    type F = { a: number; b: string }
    expectTypeOf<Merge<F, {}>>().toEqualTypeOf<F>()
  })

  it('returns S when F is empty', () => {
    type S = { x: boolean }
    expectTypeOf<Merge<{}, S>>().toEqualTypeOf<S>()
  })

  it('preserves literal value types from the second', () => {
    expectTypeOf<Merge<{ a: 1 }, { a: 2; b: 'hi' }>>().toEqualTypeOf<{
      a: 2
      b: 'hi'
    }>()
  })
})
