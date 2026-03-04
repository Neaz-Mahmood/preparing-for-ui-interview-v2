# 7.1 IsUnion

## Problem

Implement a type `IsUnion` that takes an input type `T` and returns whether `T` resolves to a union type.

```typescript
type A = IsUnion<'a' | 'b'> // true
type B = IsUnion<'a'> // false
```

## Explanation

### Key Concepts

- **Distributive conditional types** — when `T` is a naked type parameter in a conditional, it distributes over unions
- **Copy parameter trick** — `Copy = T` preserves the full union while `T` distributes
- **Comparing distributed vs non-distributed results** — if `T` is a union, the distributed check produces different results than the full union check

### Solution Approach

```typescript
type IsUnion<T, Copy = T> = (T extends Copy ? (Copy extends T ? true : false) : false) extends true
  ? false
  : true
```

**How it works step-by-step:**

The trick relies on the difference between how `T` (distributes) and `Copy` (doesn't distribute) behave:

**For a non-union** `IsUnion<'a'>`:

- `T = 'a'`, `Copy = 'a'`
- `'a' extends 'a'` → true, `'a' extends 'a'` → true
- Result: `true extends true` → `false` (not a union) ✓

**For a union** `IsUnion<'a' | 'b'>`:

- `Copy = 'a' | 'b'` (full union, preserved)
- Distribution happens on `T`:
  - `T = 'a'`: `'a' extends 'a' | 'b'` → true, but `'a' | 'b' extends 'a'` → **false**
  - `T = 'b'`: `'b' extends 'a' | 'b'` → true, but `'a' | 'b' extends 'b'` → **false**
- Distributed results: `false | false` = `false`
- `false extends true` → go to else → `true` (is a union) ✓

### The Core Insight

When `T` distributes, each member is checked individually against the **full** union (`Copy`). A single member is never equal to the full union (unless `T` was never a union to begin with). This asymmetry is what detects unions.

### Common Pitfalls

- Not using the `Copy` parameter — without it, both sides distribute identically
- `never` edge case — `IsUnion<never>` should return `false` (never is an empty union, not a union)
