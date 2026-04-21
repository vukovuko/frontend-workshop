import { describe, expectTypeOf, it } from 'vitest'
import type { PickByType } from './solution'

interface Model {
  id: number
  name: string
  completed: boolean
  age: number
}

describe('PickByType', () => {
  it('picks only number-valued properties', () => {
    expectTypeOf<PickByType<Model, number>>().toEqualTypeOf<{ id: number; age: number }>()
  })

  it('picks only string-valued properties', () => {
    expectTypeOf<PickByType<Model, string>>().toEqualTypeOf<{ name: string }>()
  })

  it('picks only boolean-valued properties', () => {
    expectTypeOf<PickByType<Model, boolean>>().toEqualTypeOf<{ completed: boolean }>()
  })

  it('returns empty when no properties match', () => {
    expectTypeOf<PickByType<Model, symbol>>().toEqualTypeOf<{}>()
  })
})
