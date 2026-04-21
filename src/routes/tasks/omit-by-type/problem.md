# Omit By Type

## Problem

Implement a generic `OmitByType<T, U>` that removes any property of `T` whose value type extends `U`.

```typescript
interface Model {
  id: number
  name: string
  completed: boolean
  age: number
}

type T1 = OmitByType<Model, number>
// { name: string; completed: boolean }
```

## Explanation

### Key Concepts

- Mirror of `PickByType` — flip the branches of the conditional

### Solution Approach

```typescript
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}
```

The only change from `PickByType` is the conditional order: when `T[K] extends U` is true, remap to `never` (drops the key); otherwise keep the key.
