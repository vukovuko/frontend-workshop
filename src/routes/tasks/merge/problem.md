# Merge

## Problem

Merge two types into a new type. Keys of the second type override the first type.

```typescript
type Foo = { a: number; b: string }
type Bar = { b: number; c: boolean }

type Result = Merge<Foo, Bar>
// { a: number; b: number; c: boolean }
```

## Explanation

### Key Concepts

- **Union of keys from two types** — `keyof F | keyof S` gives all properties from both types
- **Priority ordering with conditionals** — check `S` first, then fall back to `F` to implement "second overrides first"
- **Flat mapped type** — iterating over the combined keys produces a single clean object type

### Solution Approach

```typescript
type Merge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never
}
```

**How it works step-by-step:**

1. `keyof F | keyof S` — union of all keys from both types
2. For each key `P`:
   - First check `P extends keyof S` — if the key exists in `S`, use `S[P]` (second type wins)
   - Otherwise check `P extends keyof F` — use `F[P]` (first type value)
   - The `never` branch is unreachable since `P` must come from either `F` or `S`

**Example trace:** `Merge<{ a: number; b: string }, { b: number; c: boolean }>`

- Keys: `'a' | 'b' | 'c'`
- `'a'` → not in `S` → in `F` → `number`
- `'b'` → in `S` → `number` (overrides `string` from `F`)
- `'c'` → in `S` → `boolean`
- Result: `{ a: number; b: number; c: boolean }`

### Merge vs Intersection

`F & S` would not override — for `b`, it would produce `string & number` (= `never`) instead of `number`. This mapped type approach gives proper "last wins" semantics.

### Common Pitfalls

- Checking `F` before `S` — that reverses the override priority
- Using `&` (intersection) — conflicting keys become `never` instead of being overridden
