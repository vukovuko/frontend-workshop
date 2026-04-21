import { describe, expectTypeOf, it } from 'vitest'
import type { OmitByType } from './solution'

interface Model {
  id: number
  name: string
  completed: boolean
  age: number
}

describe('OmitByType', () => {
  it('removes all number-valued properties', () => {
    expectTypeOf<OmitByType<Model, number>>().toEqualTypeOf<{
      name: string
      completed: boolean
    }>()
  })

  it('removes all string-valued properties', () => {
    expectTypeOf<OmitByType<Model, string>>().toEqualTypeOf<{
      id: number
      completed: boolean
      age: number
    }>()
  })

  it('returns original when nothing matches', () => {
    expectTypeOf<OmitByType<Model, symbol>>().toEqualTypeOf<Model>()
  })
})
