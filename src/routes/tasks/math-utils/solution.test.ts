import { describe, expect, it } from 'vitest'
import { distance, fitContent, lerp, remap } from './solution'

describe('distance', () => {
  it('returns 5 for a 3-4-5 triangle', () => {
    expect(distance(0, 0, 3, 4)).toBe(5)
  })
  it('returns 0 for the same point', () => {
    expect(distance(2, 3, 2, 3)).toBe(0)
  })
  it('works with negative coordinates', () => {
    expect(distance(-1, -1, 2, 3)).toBe(5)
  })
})

describe('remap', () => {
  it('remaps the midpoint linearly', () => {
    expect(remap(5, 0, 10, 100, 200)).toBe(150)
  })
  it('returns outMin at inMin', () => {
    expect(remap(0, 0, 10, 50, 60)).toBe(50)
  })
  it('returns outMax at inMax', () => {
    expect(remap(10, 0, 10, 50, 60)).toBe(60)
  })
  it('projects past outMin when unclamped', () => {
    expect(remap(-5, 0, 10, 100, 200)).toBe(50)
  })
  it('clamps to outMin when clamp=true', () => {
    expect(remap(-5, 0, 10, 100, 200, true)).toBe(100)
  })
  it('clamps to outMax when clamp=true', () => {
    expect(remap(15, 0, 10, 100, 200, true)).toBe(200)
  })
})

describe('lerp', () => {
  it('returns a at t=0', () => {
    expect(lerp(0, 10, 0)).toBe(0)
  })
  it('returns b at t=1', () => {
    expect(lerp(0, 10, 1)).toBe(10)
  })
  it('returns midpoint at t=0.5', () => {
    expect(lerp(0, 10, 0.5)).toBe(5)
  })
})

describe('fitContent', () => {
  it('scales wide content to fill a square container (cover behavior)', () => {
    const r = fitContent(400, 400, 200, 100)
    expect(r.width).toBe(800)
    expect(r.height).toBe(400)
    expect(r.x).toBe(-200)
    expect(r.y).toBe(0)
  })

  it('centers equal-sized content at origin', () => {
    const r = fitContent(300, 300, 300, 300)
    expect(r).toEqual({ x: 0, y: 0, width: 300, height: 300 })
  })
})
