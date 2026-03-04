# 6.3 Reverse

## Problem

Implement the type version of `Array.reverse`.

```typescript
type a = Reverse<['a', 'b']> // ['b', 'a']
type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
```

## Explanation

### Key Concepts

- **Recursive tuple manipulation** — peel off the first element and place it at the end
- **Tuple spreading** — `[...Reverse<Rest>, First]` builds the reversed tuple

### Solution Approach

```typescript
type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : []
```

**How it works step-by-step:**

1. Destructure: `First` = first element, `Rest` = remaining elements
2. Recursively reverse `Rest`, then append `First` at the end
3. Base case: empty array → `[]`

**Example trace:** `Reverse<['a', 'b', 'c']>`

- `[...Reverse<['b', 'c']>, 'a']`
- `[...Reverse<['c']>, 'b', 'a']`
- `[...Reverse<[]>, 'c', 'b', 'a']`
- `[...'[]', 'c', 'b', 'a']`
- Result: `['c', 'b', 'a']`

### The Pattern: Recursive Tuple Building

This is the canonical pattern for building tuples recursively:

```typescript
// Prepend: [Element, ...Recurse<Rest>]  — builds front-to-back
// Append:  [...Recurse<Rest>, Element]  — builds back-to-front (reverse)
```

### Common Pitfalls

- Returning `T` instead of `[]` for the base case — would keep the original empty array type (works but less clean)
- Accidentally using `[First, ...Reverse<Rest>]` — that preserves the original order instead of reversing
