# 3.2 Exclude

## Problem

Implement the built-in `Exclude<T, U>`.
Exclude from `T` those types that are assignable to `U`.

```typescript
type Result = MyExclude<'a' | 'b' | 'c', 'a'>
// 'b' | 'c'
```

## Explanation

### Key Concepts

- **Distributive conditional types** — when `T` is a **naked** (unwrapped) type parameter in `T extends U ? X : Y`, TypeScript distributes the check over each member of a union individually
- This is the most fundamental distributive pattern in TypeScript's type system

### Solution Approach

```typescript
type MyExclude<T, U> = T extends U ? never : T
```

**How it works step-by-step:**

Because `T` is a naked type parameter, the conditional distributes over the union:

`MyExclude<'a' | 'b' | 'c', 'a'>` becomes:

1. `'a' extends 'a' ? never : 'a'` → `never`
2. `'b' extends 'a' ? never : 'b'` → `'b'`
3. `'c' extends 'a' ? never : 'c'` → `'c'`
4. Union of results: `never | 'b' | 'c'` = `'b' | 'c'`

### What Makes Distribution Happen?

Distribution occurs when **all three** conditions are met:

1. The checked type is a **generic type parameter** (not a concrete type)
2. The type parameter is **naked** (not wrapped in `[]`, `[T]`, `Promise<T>`, etc.)
3. The type parameter resolves to a **union**

### Common Pitfalls

- Wrapping `T` in brackets like `[T] extends [U]` — this **prevents** distribution
- Forgetting that `never` is the identity element for unions (`never | X` = `X`) — that's why returning `never` effectively removes a member
