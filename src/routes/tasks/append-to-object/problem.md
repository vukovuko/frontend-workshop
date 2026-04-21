# Append to Object

## Problem

Implement a type that appends a new field to the interface.
The type takes three arguments. The output should be an object with the new field.

```typescript
type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4>
// { id: '1', value: 4 }
```

## Explanation

### Key Concepts

- **Union of keys** — `keyof T | U` combines existing keys with the new key
- **Conditional value resolution** — use `extends` to decide the value type for each key
- **Flattening into a single object** — a mapped type over the combined keys produces a clean, flat result

### Solution Approach

```typescript
type AppendToObject<T extends object, U extends string, V> = {
  [P in keyof T | U]: P extends keyof T ? T[P] : V
}
```

**How it works step-by-step:**

1. `keyof T | U` — creates a union of all existing keys plus the new key `U`
2. `[P in keyof T | U]` — iterates over every key (old + new)
3. `P extends keyof T ? T[P] : V` — for existing keys, keep the original value type; for the new key, use `V`

**Example trace:** `AppendToObject<{ id: '1' }, 'value', 4>`

- Keys: `'id' | 'value'`
- `P = 'id'` → `'id' extends keyof { id: '1' }` → `true` → `'1'`
- `P = 'value'` → `'value' extends keyof { id: '1' }` → `false` → `4`
- Result: `{ id: '1'; value: 4 }`

### Why Not Use Intersection (`&`)?

`T & { [key in U]: V }` would technically work at runtime, but TypeScript treats intersection types differently from flat object types. Test cases using `Equal` would fail because `{ id: '1' } & { value: 4 }` is not structurally identical to `{ id: '1'; value: 4 }`.

### Common Pitfalls

- Using intersection `&` instead of a single mapped type — produces a different structural type
- Forgetting `U extends string` — property keys must be string literals
