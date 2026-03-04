# 4.4 Last

## Problem

Implement a generic `Last<T>` that takes an Array `T` and returns its last element.

```typescript
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // 'c'
type tail2 = Last<arr2> // 1
```

## Explanation

### Key Concepts

- **Variadic tuple types with `...` and `infer`** — you can destructure tuples from the end using `[...any[], infer L]`
- **Rest elements in tuple patterns** — `...any[]` matches zero or more elements

### Solution Approach

```typescript
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never
```

**How it works:**

1. `T extends [...any[], infer L]` — pattern-matches a tuple where `L` captures the **last** element
2. `...any[]` matches all elements before the last one (including zero elements)
3. If the tuple is empty, the pattern doesn't match → `never`

**Example trace:** `Last<['a', 'b', 'c']>`

- `['a', 'b', 'c']` matches `[...any[], infer L]` with `L = 'c'`

### Comparison with First

```typescript
// First: infer at the start, rest at the end
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never

// Last: rest at the start, infer at the end
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never
```

The patterns are mirror images — `infer` position determines which element is captured.

### Common Pitfalls

- Writing `[...infer Rest, infer L]` — this works but `Rest` is unnecessary if you don't need it; `...any[]` is simpler
- Forgetting the empty array case — `[]` doesn't match `[...any[], infer L]` (needs at least one element)
