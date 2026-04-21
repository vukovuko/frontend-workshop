import { describe, expectTypeOf, it } from 'vitest'
import type { MyReadonly } from './solution'

interface Todo {
  title: string
  description: string
}

describe('MyReadonly', () => {
  it('matches built-in Readonly<T>', () => {
    expectTypeOf<MyReadonly<Todo>>().toEqualTypeOf<Readonly<Todo>>()
  })

  it('adds readonly to every property', () => {
    expectTypeOf<MyReadonly<{ a: number; b: string }>>().toEqualTypeOf<{
      readonly a: number
      readonly b: string
    }>()
  })

  it('preserves literal value types', () => {
    expectTypeOf<MyReadonly<{ x: 1; y: 'two' }>>().toEqualTypeOf<{
      readonly x: 1
      readonly y: 'two'
    }>()
  })

  it('empty object stays empty', () => {
    expectTypeOf<MyReadonly<{}>>().toEqualTypeOf<{}>()
  })
})
