// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useFileUpload } from './solution'

describe('useFileUpload', () => {
  it('returns [state, controls] tuple with idle defaults', () => {
    const { result } = renderHook(() => useFileUpload())
    const [state, controls] = result.current
    expect(state.status).toBe('idle')
    expect(state.progress).toBe(0)
    expect(state.bytes).toBe(0)
    expect(state.speed).toBe(0)
    expect(state.remainingTimeMs).toBeNull()
    expect(typeof controls.start).toBe('function')
    expect(typeof controls.pause).toBe('function')
    expect(typeof controls.resume).toBe('function')
    expect(typeof controls.cancel).toBe('function')
  })

  it('cancel is a no-op when idle', () => {
    const { result } = renderHook(() => useFileUpload())
    act(() => {
      result.current[1].cancel()
    })
    expect(result.current[0].status).toBe('idle')
  })
})
