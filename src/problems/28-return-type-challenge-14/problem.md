# 4.1 Return Type

## Problem

Implement the built-in `ReturnType<T>` generic without using it.

```typescript
const fn = (v: boolean) => (v ? 1 : 2)
type Result = MyReturnType<typeof fn> // 1 | 2
```

## Explanation

### Key Concepts

- **`infer` keyword** — declares a type variable inside a conditional type that TypeScript fills in during pattern matching
- **Function type pattern** — `(...args: any) => infer R` matches any function and captures its return type as `R`

### Solution Approach

```typescript
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never
```

**How it works step-by-step:**

1. `T extends (...args: any) => any` — constrains `T` to be a function type
2. `T extends (...args: any) => infer R` — pattern-matches the function, capturing the return type as `R`
3. If the pattern matches → return `R`; otherwise → `never`

**Example trace:** `MyReturnType<(v: boolean) => 1 | 2>`

- Pattern match: `(v: boolean) => 1 | 2` matches `(...args: any) => infer R`
- `R` is inferred as `1 | 2`

### `infer` Only Works Inside Conditional Types

You cannot use `infer` outside of `T extends ... ? ... : ...`. This is because `infer` tells TypeScript: "figure out what type goes here by matching the pattern."

### Common Pitfalls

- Using `any[]` vs `any` for args — `(...args: any)` is slightly more permissive than `(...args: any[])`, but both work here
- Forgetting the constraint `T extends (...args: any) => any` — without it, non-function types could be passed
