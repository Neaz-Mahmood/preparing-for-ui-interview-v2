# 4.5 Flatten

## Problem

Write a type that takes an array and returns the flattened array type (one level deep).

```typescript
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```

## Explanation

### Key Concepts

- **Recursive type aliases** — the type calls itself to process each element
- **Tuple spreading** — `[...A, ...B]` concatenates two tuple types
- **Conditional `infer` with tuple destructuring** — process one element at a time

### Solution Approach

```typescript
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : []
```

**How it works step-by-step:**

1. Destructure the tuple: extract `First` element and `Rest`
2. If `First` is an array → recursively flatten it and spread the result
3. If `First` is not an array → keep it as-is
4. Recursively flatten `Rest` in both cases
5. Base case: empty array → return `[]`

**Example trace:** `Flatten<[1, [2, 3]]>`

- `First = 1`, `Rest = [[2, 3]]`
- `1` is not an array → `[1, ...Flatten<[[2, 3]]>]`
- `First = [2, 3]`, `Rest = []`
- `[2, 3]` is an array → `[...Flatten<[2, 3]>, ...Flatten<[]>]`
- `Flatten<[2, 3]>` → `[2, 3]` (neither is an array)
- `Flatten<[]>` → `[]`
- Final: `[1, 2, 3]`

### Deep vs Shallow Flatten

This solution flattens **all levels** (deep). For a single level:

```typescript
type ShallowFlatten<T extends any[]> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...F, ...ShallowFlatten<R>]
    : [F, ...ShallowFlatten<R>]
  : []
```

The difference: shallow spreads `F` directly without recursing into it.

### Common Pitfalls

- Infinite recursion — make sure the base case (`[]`) is handled
- Forgetting to recurse on `Rest` — only the first element would be processed
