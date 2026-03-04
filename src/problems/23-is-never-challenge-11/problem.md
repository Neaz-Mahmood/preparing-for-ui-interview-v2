# 3.3 IsNever

## Problem

Implement a type `IsNever<T>`, which takes input type `T`.
If the type of `T` is `never`, return `true`, otherwise return `false`.

```typescript
type A = IsNever<never> // true
type B = IsNever<string> // false
type C = IsNever<undefined> // false
```

## Explanation

### Key Concepts

- **`never` is an empty union** — it has zero members, so distributive conditionals over `never` produce `never` (not `true` or `false`)
- **Wrapping in a tuple** (`[T]`) prevents distribution, allowing you to actually check for `never`

### Solution Approach

```typescript
type IsNever<T> = [T] extends [never] ? true : false
```

**Why the wrapping is necessary:**

Without wrapping:

```typescript
type Bad<T> = T extends never ? true : false
type Result = Bad<never> // never (not true!)
```

`never` is an empty union. When TypeScript distributes over an empty union, it iterates over zero members and produces `never` (the empty union result).

By wrapping in `[T]`:

```typescript
type IsNever<T> = [T] extends [never] ? true : false
```

- `[never]` becomes the tuple type `[never]`
- `[never] extends [never]` is a normal (non-distributive) check → `true`

### The `never` Distribution Trap

This is one of the most common gotchas in TypeScript type programming:

- `never extends X` in a distributive context → `never` (empty iteration)
- `[never] extends [X]` → actual comparison happens

### Common Pitfalls

- Using `T extends never` without wrapping — always returns `never` when `T` is `never`
- This same wrapping trick is needed for `IsAny`, `IsUnion`, and similar type-level predicates
