# 2.6 Diff

## Problem

Get an `Object` that is the difference between `O` & `O1` — properties that exist in one but not both.

```typescript
type Foo = { name: string; age: string }
type Bar = { name: string; age: string; gender: number }

type Result = Diff<Foo, Bar> // { gender: number }
```

## Explanation

### Key Concepts

- **`O & O1` (intersection of objects)** — merges all properties from both types, giving access to every key and its type
- **`O | O1` (union of objects)** — `keyof (O | O1)` gives only the **shared** keys (keys present in both)
- **Key remapping with `as`** — filter out keys by mapping them to `never`

### Solution Approach

```typescript
type Diff<O extends object, O1 extends object> = {
  [K in keyof (O & O1) as K extends keyof (O | O1) ? never : K]: (O & O1)[K]
}
```

**How it works step-by-step:**

1. `keyof (O & O1)` — all keys from both objects (the full set)
2. `keyof (O | O1)` — only keys **common** to both objects
3. `K extends keyof (O | O1) ? never : K` — filters out shared keys, keeping only the difference
4. `(O & O1)[K]` — looks up the value type from the merged type

**Why `keyof (A | B)` gives shared keys:**

- `keyof` of a union gives the intersection of keys (only keys guaranteed to exist on all members)
- `keyof ({ name: string; age: string } | { name: string; gender: number })` = `'name'`

**Example trace:** `Diff<{ name: string; age: string }, { name: string; age: string; gender: number }>`

- All keys: `'name' | 'age' | 'gender'`
- Shared keys: `'name' | 'age'`
- Diff keys: `'gender'`
- Result: `{ gender: number }`

### Common Pitfalls

- Confusing `keyof (A & B)` (all keys) with `keyof (A | B)` (shared keys) — this distinction is the core trick
- The result is symmetric: `Diff<Foo, Bar>` equals `Diff<Bar, Foo>`
