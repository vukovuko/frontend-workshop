import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { debounce } from './solution'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('delays invocation until after the wait period', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(99)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('resets the timer on each call', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    vi.advanceTimersByTime(50)
    debounced()
    vi.advanceTimersByTime(50)
    debounced()
    vi.advanceTimersByTime(50)

    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(50)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('passes only the latest arguments', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced('a')
    debounced('b')
    debounced('c')

    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('c')
  })

  it('separate debounced functions do not interfere', () => {
    const fn1 = vi.fn()
    const fn2 = vi.fn()
    const d1 = debounce(fn1, 100)
    const d2 = debounce(fn2, 100)

    d1()
    d2()
    vi.advanceTimersByTime(100)

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(1)
  })
})
