import { describe, expectTypeOf, it } from 'vitest'
import type { MyPick } from './solution'

interface Todo {
  title: string
  description: string
  completed: boolean
}

describe('MyPick', () => {
  it('picks a single property', () => {
    expectTypeOf<MyPick<Todo, 'title'>>().toEqualTypeOf<{ title: string }>()
  })

  it('picks multiple properties via a union', () => {
    expectTypeOf<MyPick<Todo, 'title' | 'completed'>>().toEqualTypeOf<{
      title: string
      completed: boolean
    }>()
  })

  it('picking every key yields the original shape', () => {
    expectTypeOf<MyPick<Todo, keyof Todo>>().toEqualTypeOf<Todo>()
  })

  it('preserves value types', () => {
    expectTypeOf<MyPick<{ a: 1; b: 'two'; c: true }, 'a' | 'b'>>().toEqualTypeOf<{
      a: 1
      b: 'two'
    }>()
  })
})
