# 5.3 Replace

## Problem

Implement `Replace<S, From, To>` which replaces the **first** occurrence of the string `From` with string `To` in the given string `S`.

```typescript
type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 'types are awesome!'
```

## Explanation

### Key Concepts

- **Three-part template literal matching** — `` `${infer P1}${From}${infer P2}` `` splits the string around the first occurrence of `From`
- **Edge case handling** — empty string `From` should return `S` unchanged

### Solution Approach

```typescript
type Replace<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer P1}${From}${infer P2}`
    ? `${P1}${To}${P2}`
    : S
```

**How it works step-by-step:**

1. If `From` is `''` → return `S` unchanged (edge case)
2. `S extends \`${infer P1}${From}${infer P2}\``— tries to split`S`into: prefix`P1`, the match `From`, and suffix `P2`
3. If the pattern matches → reconstruct as `` `${P1}${To}${P2}` `` (replacing `From` with `To`)
4. If no match → return `S` unchanged

**Example trace:** `Replace<'foobarbar', 'bar', 'foo'>`

- `P1 = 'foo'`, `From = 'bar'`, `P2 = 'bar'`
- Result: `'foo' + 'foo' + 'bar'` = `'foofoobar'`
- Note: only the **first** occurrence is replaced

### Why Only the First Occurrence?

Template literal matching with `infer` is greedy-minimal for the first part — `P1` captures the smallest possible prefix. This naturally finds the first occurrence. For replacing **all** occurrences, see problem 6.2 (ReplaceAll), which recurses on `P2`.

### Common Pitfalls

- Not handling `From extends ''` — without it, an empty `From` matches at position 0 and inserts `To` at the start
- Confusing Replace (first only) with ReplaceAll (recursive)
