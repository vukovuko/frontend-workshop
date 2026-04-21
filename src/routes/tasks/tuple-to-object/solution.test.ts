import { describe, expectTypeOf, it } from 'vitest'
import type { TupleToObject } from './solution'

describe('TupleToObject', () => {
  it('maps each string element to a key/value pair', () => {
    const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
    expectTypeOf<TupleToObject<typeof tuple>>().toEqualTypeOf<{
      tesla: 'tesla'
      'model 3': 'model 3'
      'model X': 'model X'
      'model Y': 'model Y'
    }>()
  })

  it('works with number tuples', () => {
    const t = [1, 2, 3, 4] as const
    expectTypeOf<TupleToObject<typeof t>>().toEqualTypeOf<{
      1: 1
      2: 2
      3: 3
      4: 4
    }>()
  })

  it('works with mixed string / number tuples', () => {
    const t = [1, '2', 3, '4'] as const
    expectTypeOf<TupleToObject<typeof t>>().toEqualTypeOf<{
      1: 1
      '2': '2'
      3: 3
      '4': '4'
    }>()
  })

  it('empty tuple yields empty object', () => {
    expectTypeOf<TupleToObject<[]>>().toEqualTypeOf<{}>()
  })
})
