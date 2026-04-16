import { describe, expectTypeOf, it } from 'vitest'
import type { Length } from './solution'

describe('Length', () => {
  it('returns tuple length as a number literal', () => {
    expectTypeOf<Length<[]>>().toEqualTypeOf<0>()
    expectTypeOf<Length<['a']>>().toEqualTypeOf<1>()
    expectTypeOf<Length<['a', 'b']>>().toEqualTypeOf<2>()
    expectTypeOf<Length<['tesla', 'model 3', 'model X', 'model Y']>>().toEqualTypeOf<4>()
    expectTypeOf<
      Length<['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']>
    >().toEqualTypeOf<5>()
  })

  it('works with readonly tuples (as const)', () => {
    expectTypeOf<Length<readonly ['a', 'b', 'c']>>().toEqualTypeOf<3>()
  })
})
