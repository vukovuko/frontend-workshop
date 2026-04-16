import { describe, expectTypeOf, it } from 'vitest'
import type { First } from './solution'

describe('First', () => {
  it('returns the first element type of a tuple', () => {
    expectTypeOf<First<['a', 'b', 'c']>>().toEqualTypeOf<'a'>()
    expectTypeOf<First<[3, 2, 1]>>().toEqualTypeOf<3>()
    expectTypeOf<First<[boolean, number]>>().toEqualTypeOf<boolean>()
  })

  it('returns never for an empty tuple', () => {
    expectTypeOf<First<[]>>().toEqualTypeOf<never>()
  })

  it('works with single-element tuples', () => {
    expectTypeOf<First<['only']>>().toEqualTypeOf<'only'>()
  })
})
