# Readonly

## Problem

Implement the built-in `Readonly<T>` generic without using it.
Constructs a type with all properties of `T` set to readonly, meaning the properties cannot be reassigned.

```typescript
interface Todo {
  title: string
}

const todo: MyReadonly<Todo> = { title: 'Hey' }
todo.title = 'Hello' // Error: cannot reassign a readonly property
```

## Explanation

### Key Concepts

- **Property modifiers in mapped types** — you can add `readonly` or `?` in front of a mapped property
- **Homomorphic mapped types** — iterating over `keyof T` preserves the original structure while letting you modify modifiers

### Solution Approach

```typescript
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

**How it works:**

1. `[P in keyof T]` — iterates over every property key of `T`
2. `readonly` before the property — adds the `readonly` modifier to each property
3. `T[P]` — preserves the original value type

### Modifier Syntax

TypeScript supports `+` (add) and `-` (remove) prefixes for modifiers:

- `readonly` is the same as `+readonly` (add readonly)
- `-readonly` would remove the readonly modifier
- `?` adds optionality, `-?` removes it

### Common Pitfalls

- Confusing `Readonly<T>` (shallow — only top-level properties) with deep readonly (which requires recursion)
