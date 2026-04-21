# Make Optional

## Problem

Implement a generic `MakeOptional<T, K>` that makes the keys `K` of `T` optional, while leaving the rest unchanged.

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type T1 = MakeOptional<Todo, 'description'>
// { title: string; description?: string; completed: boolean }
```

## Explanation

### Key Concepts

- **`Omit<T, K>`** — removes keys `K` from `T`
- **`Pick<T, K>`** — keeps only keys `K` from `T`
- **`Partial<T>`** — marks every property of `T` as optional
- Intersection `&` — merges two object types

### Solution Approach

```typescript
type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
```

**How it works:**

1. `Omit<T, K>` — removes the keys we want to make optional
2. `Pick<T, K>` — isolates only those keys
3. `Partial<Pick<T, K>>` — marks the isolated keys as optional
4. `&` — merges the unchanged keys with the now-optional keys

### Common Pitfalls

- Forgetting the `K extends keyof T` constraint — lets invalid keys slip through
- Applying `Partial<T>` to the whole type — makes everything optional, not just the selected keys
