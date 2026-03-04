# 6.1 Deep Readonly

## Problem

Implement a generic `DeepReadonly<T>` which makes every parameter of an object — and its sub-objects recursively — readonly.

```typescript
type X = {
  x: {
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

type Result = DeepReadonly<X> // should be same as Expected
```

## Explanation

### Key Concepts

- **Recursive mapped types** — apply a transformation to every level of a nested object
- **Base case detection** — stop recursing when a value has no keys (primitives, functions)
- **`keyof T[K] extends never`** — checks if a type has no properties (leaf node)

### Solution Approach

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>
}
```

**How it works step-by-step:**

1. `readonly [K in keyof T]` — iterates over all keys and makes them readonly
2. `keyof T[K] extends never` — checks if the value type has any keys
   - If no keys (primitive, function) → return `T[K]` as-is (base case)
   - If has keys (object) → recurse: `DeepReadonly<T[K]>`

**Why `keyof T[K] extends never` for the base case?**

- Primitives like `string`, `number`, `boolean` have no own keys → `keyof string` is a union of method names, but...
- Actually, functions have `keyof` returning things like `'call' | 'apply'`, but we want to keep them as-is
- `keyof (() => 22)` resolves to `never` — functions have no enumerable keys in this context

### Shallow vs Deep Readonly

```typescript
// Shallow (problem 2.2)
type MyReadonly<T> = { readonly [K in keyof T]: T[K] }

// Deep (this problem)
type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>
}
```

The difference is the conditional recursion on value types.

### Common Pitfalls

- Infinite recursion without a base case — need to stop at primitives/functions
- Over-recursing into function types — functions should be kept as-is, not have their properties made readonly
