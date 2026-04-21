import { describe, expect, it } from 'vitest'
import { MyPromise } from './solution'

describe('MyPromise', () => {
  it('resolves asynchronously with a value', async () => {
    const p = new MyPromise<string>((resolve) => {
      setTimeout(() => resolve('hello'), 10)
    })
    const result = await p
    expect(result).toBe('hello')
  })

  it('rejects with a reason', async () => {
    const p = new MyPromise<string>((_, reject) => {
      setTimeout(() => reject(new Error('boom')), 10)
    })
    await expect(p).rejects.toThrow('boom')
  })

  it('chains .then callbacks', async () => {
    const result = await new MyPromise<number>((resolve) => resolve(1))
      .then((v) => v + 1)
      .then((v) => v * 10)
    expect(result).toBe(20)
  })

  it('propagates errors down the chain until .catch', async () => {
    const result = await new MyPromise<number>((resolve) => resolve(1))
      .then(() => {
        throw new Error('fail')
      })
      .catch((err: Error) => `caught: ${err.message}`)
    expect(result).toBe('caught: fail')
  })

  it('MyPromise.resolve returns a resolved promise', async () => {
    expect(await MyPromise.resolve(42)).toBe(42)
  })

  it('MyPromise.reject returns a rejected promise', async () => {
    await expect(MyPromise.reject(new Error('nope'))).rejects.toThrow('nope')
  })

  it('cannot settle twice (first call wins)', async () => {
    const p = new MyPromise<number>((resolve, reject) => {
      resolve(1)
      resolve(2)
      reject(new Error('ignored'))
    })
    expect(await p).toBe(1)
  })

  it('resolving with another MyPromise chains correctly', async () => {
    const inner = new MyPromise<number>((resolve) => setTimeout(() => resolve(7), 10))
    const outer = new MyPromise<number>((resolve) => resolve(inner as unknown as number))
    expect(await outer).toBe(7)
  })
})
