type PromiseStatus = 'pending' | 'fulfilled' | 'rejected'

const PENDING: PromiseStatus = 'pending'
const FULFILLED: PromiseStatus = 'fulfilled'
const REJECTED: PromiseStatus = 'rejected'

// biome-ignore lint/suspicious/noExplicitAny: Promises/A+ accepts any reason/value
type Executor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void,
) => void

// biome-ignore lint/suspicious/noExplicitAny: callback types per spec
type OnFulfilled<T, R> = ((value: T) => R | PromiseLike<R>) | undefined | null
// biome-ignore lint/suspicious/noExplicitAny: callback types per spec
type OnRejected<R> = ((reason: any) => R | PromiseLike<R>) | undefined | null

interface Handler<T> {
  // biome-ignore lint/suspicious/noExplicitAny: internal handler
  onFulfilled: (value: T) => any
  // biome-ignore lint/suspicious/noExplicitAny: internal handler
  onRejected: (reason: any) => any
  // biome-ignore lint/suspicious/noExplicitAny: internal handler
  resolve: (value: any) => void
  // biome-ignore lint/suspicious/noExplicitAny: internal handler
  reject: (reason: any) => void
}

// biome-ignore lint/suspicious/noExplicitAny: default T = any matches Promise semantics
export class MyPromise<T = any> {
  #handlers: Handler<T>[] = []
  #status: PromiseStatus = PENDING
  // biome-ignore lint/suspicious/noExplicitAny: stored value can be any
  #value: T | any
  #isResolved: boolean = false

  // biome-ignore lint/suspicious/noExplicitAny: internal transition
  #settle = (v: T | any, status: PromiseStatus = FULFILLED): void => {
    if (this.#isResolved) return
    this.#isResolved = true
    // biome-ignore lint/suspicious/noExplicitAny: internal
    const update = (v: T | any): void => {
      this.#value = v
      this.#status = status
      this.#execute()
    }
    if (v instanceof MyPromise && status === FULFILLED) {
      v.then(update)
    } else {
      update(v)
    }
  }

  #resolve = (v: T | PromiseLike<T>): void => void this.#settle(v, FULFILLED)
  // biome-ignore lint/suspicious/noExplicitAny: rejection reason
  #reject = (e: any): void => void this.#settle(e, REJECTED)

  #execute = (): void => {
    const handlers = this.#handlers
    for (const { onFulfilled, onRejected, resolve, reject } of handlers) {
      const handler = this.#status === FULFILLED ? onFulfilled : onRejected
      queueMicrotask(() => {
        try {
          const result = handler(this.#value)
          if (result instanceof MyPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (e) {
          reject(e)
        }
      })
    }
    this.#handlers = []
  }

  constructor(executor: Executor<T>) {
    this.#status = PENDING
    this.#isResolved = false
    try {
      executor(this.#resolve, this.#reject)
    } catch (e) {
      this.#reject(e)
    }
  }

  then<R = T>(onFulfilled?: OnFulfilled<T, R>, onRejected?: OnRejected<R>): MyPromise<R> {
    const handler: Handler<T> = {
      // biome-ignore lint/suspicious/noExplicitAny: default passthrough
      onFulfilled: typeof onFulfilled === 'function' ? onFulfilled : (v: T) => v as any,
      onRejected:
        typeof onRejected === 'function'
          ? onRejected
          : (err) => {
              throw err
            },
      resolve: () => {},
      reject: () => {},
    }

    const promise = new MyPromise<R>((res, rej) => {
      handler.resolve = res
      handler.reject = rej
    })

    this.#handlers.push(handler)

    if (this.#status !== PENDING) {
      this.#execute()
    }

    return promise
  }

  catch<R = never>(onRejected?: OnRejected<R>): MyPromise<T | R> {
    return this.then<T | R>(undefined, onRejected)
  }

  static resolve<T>(value: T): MyPromise<T> {
    return new MyPromise<T>((res) => res(value))
  }

  // biome-ignore lint/suspicious/noExplicitAny: rejection reason
  static reject<T = never>(value: any): MyPromise<T> {
    return new MyPromise<T>((_, rej) => rej(value))
  }
}
