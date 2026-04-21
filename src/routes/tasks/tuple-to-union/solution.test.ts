import { describe, expectTypeOf, it } from 'vitest'
import type { TupleToUnion } from './solution'

describe('TupleToUnion', () => {
  it('converts string tuple to string union', () => {
    expectTypeOf<TupleToUnion<['1', '2', '3']>>().toEqualTypeOf<'1' | '2' | '3'>()
  })

  it('converts mixed-type tuple to mixed union', () => {
    expectTypeOf<TupleToUnion<[123, '456', true]>>().toEqualTypeOf<123 | '456' | true>()
  })

  it('single-element tuple yields a single-member union', () => {
    expectTypeOf<TupleToUnion<['only']>>().toEqualTypeOf<'only'>()
  })

  it('empty tuple yields never', () => {
    expectTypeOf<TupleToUnion<[]>>().toEqualTypeOf<never>()
  })

  it('works with readonly tuples (as const)', () => {
    expectTypeOf<TupleToUnion<readonly ['a', 'b']>>().toEqualTypeOf<'a' | 'b'>()
  })
})
