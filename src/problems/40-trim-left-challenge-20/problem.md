# 5.2 TrimLeft

## Problem

Implement `TrimLeft<T>` which takes an exact string type and returns a new string with the whitespace beginning removed.

```typescript
type trimmed = TrimLeft<'  Hello World  '> // 'Hello World  '
```

## Explanation

### Key Concepts

- **Recursive template literal matching** — strip one character at a time from the left
- **Union type for whitespace** — define whitespace as `' ' | '\t' | '\n'` to match any whitespace character

### Solution Approach

```typescript
type Space = ' ' | '\t' | '\n'

type TrimLeft<S extends string> = S extends `${Space}${infer T}` ? TrimLeft<T> : S
```

**How it works step-by-step:**

1. `Space` defines whitespace characters as a union
2. `S extends \`${Space}${infer T}\``— checks if`S` starts with a whitespace character
3. If yes → capture the rest as `T` and recurse: `TrimLeft<T>`
4. If no (no leading whitespace) → return `S` as-is (base case)

**Example trace:** `TrimLeft<'  hi'>`

- `'  hi'` matches `' ${infer T}'` → `T = ' hi'` → recurse
- `' hi'` matches `' ${infer T}'` → `T = 'hi'` → recurse
- `'hi'` doesn't start with whitespace → return `'hi'`

### Why a Union Works in Template Literals

When you write `` `${Space}${infer T}` `` where `Space` is a union, TypeScript checks if the string starts with **any** member of the union. It's equivalent to:

```
S extends `${' '}${infer T}` | `${'\t'}${infer T}` | `${'\n'}${infer T}`
```

### Common Pitfalls

- Forgetting `\t` and `\n` — whitespace isn't just spaces
- Not recursing — only removes one whitespace character instead of all leading whitespace
