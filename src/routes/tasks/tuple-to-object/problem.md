# Tuple to Object

## Problem

Given an array, transform it into an object type where both the key and the value are the array element.

```typescript
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple>
// { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y' }
```

## Explanation

### Key Concepts

- **`T[number]`** — indexing a tuple with `number` gives a union of all element types
- **Mapped types over a union** — `[P in U]` iterates over each member of the union `U`
- **Valid property key types** — only `string`, `number`, and `symbol` can be object keys

### Solution Approach

```typescript
type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [P in T[number]]: P
}
```

**How it works step-by-step:**

1. `T extends readonly (string | number | symbol)[]` — constrains `T` to a tuple of valid property keys
2. `T[number]` — produces a union of all elements: `'tesla' | 'model 3' | 'model X' | 'model Y'`
3. `[P in T[number]]` — iterates over each element of that union
4. `: P` — the value is the same as the key

**Example trace:** `TupleToObject<typeof tuple>`

- `T[number]` = `'tesla' | 'model 3' | 'model X' | 'model Y'`
- For each `P`, both key and value are `P`
- Result: `{ tesla: 'tesla'; 'model 3': 'model 3'; ... }`

### Common Pitfalls

- Forgetting to constrain elements to valid key types — `PropertyKey` (`string | number | symbol`) is required
- Using `any[]` instead of `readonly` — `as const` tuples are readonly
- Confusing this with `TupleToUnion` — here we build an object, not just extract a union
