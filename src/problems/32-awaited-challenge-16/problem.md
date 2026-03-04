# 4.3 Awaited

## Problem

If we have a type which is wrapped like `Promise`, how can we get the type inside?
Unwrap nested promises recursively.

```typescript
type ExampleType = Promise<string>
type Result = MyAwaited<ExampleType> // string

type Nested = Promise<Promise<string | number>>
type Result2 = MyAwaited<Nested> // string | number
```

## Explanation

### Key Concepts

- **`infer` with structural matching** — match the shape of a Promise's `then` callback to extract the resolved value
- **Recursive type aliases** — a type can reference itself to handle nested promises
- **Thenable protocol** — Promises are structurally defined by their `then` method

### Solution Approach

```typescript
type MyAwaited<T> = T extends { then: (onfulfilled: (arg: infer V) => any) => any }
  ? MyAwaited<V>
  : T
```

**How it works step-by-step:**

1. Check if `T` has a `then` method (i.e., it's "thenable")
2. If yes, `infer V` captures the type of the argument passed to `onfulfilled` — this is the resolved value
3. Recursively call `MyAwaited<V>` — handles nested promises like `Promise<Promise<string>>`
4. If `T` is not thenable → return `T` as-is (base case)

**Example trace:** `MyAwaited<Promise<Promise<string>>>`

- `Promise<Promise<string>>` has `then` → `V` = `Promise<string>` → recurse
- `Promise<string>` has `then` → `V` = `string` → recurse
- `string` has no `then` → return `string`

### Why Not `T extends Promise<infer V>`?

Using `Promise<infer V>` would work for actual `Promise` types, but not for custom thenables (objects that have a `then` method but aren't `Promise` instances). The structural approach with `{ then: ... }` is more general and matches any thenable.

### Common Pitfalls

- Forgetting to recurse — `Promise<Promise<string>>` would resolve to `Promise<string>` instead of `string`
- Using `Promise<infer V>` instead of the structural `then` check — misses custom thenables
