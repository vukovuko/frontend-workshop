import { describe, expectTypeOf, it } from 'vitest'
import type { MakeOptional } from './solution'

interface Todo {
  title: string
  description: string
  completed: boolean
}

describe('MakeOptional', () => {
  it('marks the selected keys optional', () => {
    expectTypeOf<MakeOptional<Todo, 'description'>>().toEqualTypeOf<{
      title: string
      completed: boolean
      description?: string
    }>()
  })

  it('supports a union of keys', () => {
    expectTypeOf<MakeOptional<Todo, 'description' | 'completed'>>().toEqualTypeOf<{
      title: string
      description?: string
      completed?: boolean
    }>()
  })

  it('preserves original value types', () => {
    expectTypeOf<MakeOptional<{ a: 1; b: 'two' }, 'a'>>().toEqualTypeOf<{
      a?: 1
      b: 'two'
    }>()
  })
})
