# Pick By Type

## Problem

Implement a generic `PickByType<T, U>` that keeps only the properties of `T` whose value type extends `U`.

```typescript
interface Model {
  id: number
  name: string
  completed: boolean
  age: number
}

type T1 = PickByType<Model, number>
// { id: number; age: number }
```

## Explanation

### Key Concepts

- **Key remapping in mapped types** — `as` clause lets you rename or filter keys
- **`never` as a filter** — when a remapped key is `never`, the property is removed entirely
- **Conditional types** — `T[K] extends U ? K : never` decides per-property whether to keep the key

### Solution Approach

```typescript
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}
```

**How it works:**

1. `[K in keyof T as ...]` — iterate over every key, optionally renaming via `as`
2. `T[K] extends U ? K : never` — if the value type matches `U`, keep the original key; otherwise use `never` to drop it
3. `: T[K]` — preserve the original value type

### Common Pitfalls

- Using `extends U` vs `extends infer U` — we don't need `infer` here
- Forgetting that `never` in a mapped key filters the key out entirely
