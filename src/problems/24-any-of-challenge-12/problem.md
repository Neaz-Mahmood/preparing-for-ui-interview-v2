# 3.4 AnyOf

## Problem

Implement a type which takes an array type as argument.
If any element in the array is "truthy", return `true`, otherwise return `false`.

```typescript
type Sample1 = AnyOf<[1, '', false, []]> // true (1 is truthy)
type Sample2 = AnyOf<[0, '', false, [], {}]> // false (all falsy)
```

## Explanation

### Key Concepts

- **Type-level "falsy" values** — you need to define what counts as falsy at the type level: `0`, `''`, `false`, `[]`, `{}`, `null`, `undefined`
- **Recursive tuple processing** — use `infer` to peel off one element at a time
- **Empty object detection** — `{}` is tricky because `keyof {}` is `never`

### Solution Approach

```typescript
type Falsy = null | undefined | false | '' | [] | 0

type IsTruthy<T> = T extends Falsy ? false : keyof T extends never ? false : true

type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Tail]
  ? IsTruthy<First> extends true
    ? true
    : AnyOf<Tail>
  : false
```

**How it works step-by-step:**

1. Define `Falsy` as a union of all type-level falsy values
2. `IsTruthy<T>` checks if a type is truthy:
   - If `T extends Falsy` → `false` (it's a known falsy value)
   - If `keyof T extends never` → `false` (empty object `{}` has no keys)
   - Otherwise → `true`
3. `AnyOf` recursively processes the tuple:
   - Extract `First` and `Tail` using `infer`
   - If `First` is truthy → short-circuit and return `true`
   - Otherwise → recurse on the `Tail`
   - Empty tuple base case → `false`

### Why `{}` Needs Special Handling

`{}` doesn't extend any of the simple falsy types. But it's considered "falsy" in this challenge because it's an empty object. We detect it by checking `keyof T extends never` — an empty object has no keys.

### Common Pitfalls

- Forgetting to handle `{}` — it's not in the simple `Falsy` union
- Using `T extends object` to check for empty objects — that matches all objects, not just empty ones
