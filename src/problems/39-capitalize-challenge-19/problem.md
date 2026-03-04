# 5.1 Capitalize

## Problem

Implement `Capitalize<T>` which converts the first letter of a string to uppercase and leaves the rest as-is.

```typescript
type Result = MyCapitalize<'hello'> // 'Hello'
```

## Explanation

### Key Concepts

- **Template literal types** — `` `${A}${B}` `` constructs string types by concatenating parts
- **`infer` with template literals** — you can pattern-match and destructure string types
- **Built-in intrinsic types** — `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize` are compiler-level string transformations

### Solution Approach

```typescript
type MyCapitalize<S extends string> = S extends `${infer C}${infer Rest}`
  ? `${Uppercase<C>}${Rest}`
  : S
```

**How it works step-by-step:**

1. `S extends \`${infer C}${infer Rest}\``— splits the string into the first character`C`and everything after`Rest`
2. `` `${Uppercase<C>}${Rest}` `` — uppercases the first character and concatenates with the rest
3. If the string is empty (`''`), the pattern doesn't match → return `S` as-is

**Example trace:** `MyCapitalize<'hello'>`

- `C = 'h'`, `Rest = 'ello'`
- `Uppercase<'h'>` = `'H'`
- Result: `'Hello'`

### How `infer` Works with Template Literals

When you write `` `${infer A}${infer B}` ``:

- `A` captures the **first character** (greedy-minimal: takes as little as possible)
- `B` captures **everything else**
- For `'hello'`: `A = 'h'`, `B = 'ello'`
- For `'a'`: `A = 'a'`, `B = ''`
- For `''`: pattern doesn't match

### Common Pitfalls

- Not handling the empty string case — the pattern fails for `''`, so the `else` branch must return `S`
- Using `Uppercase<S>` instead of just the first character — that uppercases the entire string
