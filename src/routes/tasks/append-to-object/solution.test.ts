import { describe, expectTypeOf, it } from 'vitest'
import type { AppendToObject } from './solution'

describe('AppendToObject', () => {
  it('adds a new boolean field', () => {
    type T = { key: 'cat'; value: 'green' }
    expectTypeOf<AppendToObject<T, 'home', boolean>>().toEqualTypeOf<{
      key: 'cat'
      value: 'green'
      home: boolean
    }>()
  })

  it('adds a literal number field, preserving original union values', () => {
    type T = { key: 'dog' | undefined; value: 'white'; sun: true }
    expectTypeOf<AppendToObject<T, 'home', 1>>().toEqualTypeOf<{
      key: 'dog' | undefined
      value: 'white'
      sun: true
      home: 1
    }>()
  })

  it('adds a union-valued field', () => {
    type T = { key: 'cow'; value: 'yellow'; sun: false }
    expectTypeOf<AppendToObject<T, 'moon', false | undefined>>().toEqualTypeOf<{
      key: 'cow'
      value: 'yellow'
      sun: false
      moon: false | undefined
    }>()
  })
})
