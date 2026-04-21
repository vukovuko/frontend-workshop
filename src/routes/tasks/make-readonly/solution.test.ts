import { describe, expectTypeOf, it } from 'vitest'
import type { MakeReadonly } from './solution'

interface Todo {
  title: string
  description: string
  completed: boolean
}

describe('MakeReadonly', () => {
  it('marks only the selected key readonly', () => {
    expectTypeOf<MakeReadonly<Todo, 'title'>>().toEqualTypeOf<{
      description: string
      completed: boolean
      readonly title: string
    }>()
  })

  it('supports a union of keys', () => {
    expectTypeOf<MakeReadonly<Todo, 'title' | 'completed'>>().toEqualTypeOf<{
      description: string
      readonly title: string
      readonly completed: boolean
    }>()
  })
})
