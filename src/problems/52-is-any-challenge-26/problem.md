# 9.2 IsAny

## Problem

Implement `IsAny<T>` which takes an input type `T` and returns `true` if `T` is `any`, otherwise `false`.

```typescript
type A = IsAny<any> // true
type B = IsAny<unknown> // false
type C = IsAny<string> // false
```

## Explanation

### Key Concepts

- **`any` is both a supertype and subtype of every type** — this unique property means `any & T` = `any` for any `T`
- **`1 & T` trick** — for normal types, `1 & T` is either `1`, `never`, or a narrowed type; but `1 & any` = `any`
- **`0 extends (1 & T)`** — only true when `1 & T` is `any` (since `0` doesn't extend `1` normally)

### Solution Approach

```typescript
type IsAny<T> = 0 extends 1 & T ? true : false
```

**How it works step-by-step:**

1. `1 & T` — intersect `1` (a literal number type) with `T`
2. For normal types:
   - `1 & string` = `never` → `0 extends never` = `false`
   - `1 & number` = `1` → `0 extends 1` = `false`
   - `1 & unknown` = `1` → `0 extends 1` = `false`
   - `1 & never` = `never` → `0 extends never` = `false`
3. For `any`:
   - `1 & any` = `any` → `0 extends any` = `true` ✓

### Why `any` Is Special

`any` breaks the normal type system rules:

- `any & T` = `any` (absorbs intersections)
- `any | T` = `any` (absorbs unions)
- Every type both extends `any` and `any` extends every type

This makes `any` detectable: it's the only type where `0 extends 1 & T` is true, because `1 & any` collapses to `any`, and everything extends `any`.

### Common Pitfalls

- Trying `T extends any` — this is true for **every** type, not just `any`
- Trying `any extends T` — this is also true for every type due to `any`'s special behavior
- The `0 extends 1 & T` pattern is the standard idiom for detecting `any`
