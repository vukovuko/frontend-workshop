# Make Readonly

## Problem

Implement a generic `MakeReadonly<T, K>` that marks only the keys `K` of `T` as readonly, while leaving the rest mutable.

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type T1 = MakeReadonly<Todo, 'title'>
// { readonly title: string; description: string; completed: boolean }
```

## Explanation

### Key Concepts

- **`Omit<T, K>`** — removes keys `K` from `T`
- **`Pick<T, K>`** — keeps only keys `K`
- **`Readonly<T>`** — marks every property of `T` as readonly
- Intersection `&` — merges two object types

### Solution Approach

```typescript
type MakeReadonly<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>
```

Mirrors the `MakeOptional` pattern — the only change is `Readonly` in place of `Partial`.

### Difference from `Readonly<T>`

- `Readonly<T>` — marks **all** properties readonly
- `MakeReadonly<T, K>` — marks only the **selected** keys readonly; the rest stay mutable
