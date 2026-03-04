# 9.1 Union to Intersection

## Problem

Implement `UnionToIntersection<U>` which turns a union type `U` into an intersection type.

```typescript
type Result = UnionToIntersection<{ a: 1 } | { b: 2 }>
// { a: 1 } & { b: 2 }
```

## Explanation

### Key Concepts

- **Contravariant inference** — when `infer` appears in a **function parameter** (contravariant position), multiple candidates are inferred as an **intersection** instead of a union
- **Distribution + contravariance** — first distribute the union into function types, then infer from parameter position

### Solution Approach

```typescript
type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends (
  arg: infer I,
) => void
  ? I
  : never
```

**How it works step-by-step:**

**Step 1: Distribute into function types**

- `U extends any ? (arg: U) => any : never` distributes over the union
- `{ a: 1 } | { b: 2 }` → `((arg: { a: 1 }) => any) | ((arg: { b: 2 }) => any)`

**Step 2: Infer from contravariant position**

- `((arg: { a: 1 }) => any) | ((arg: { b: 2 }) => any) extends (arg: infer I) => void`
- `I` must satisfy **both** function signatures (since a function union must accept all possible argument types)
- `I` is inferred as `{ a: 1 } & { b: 2 }`

### Why Contravariance Creates Intersections

In TypeScript, function parameters are in **contravariant** position. When inferring a type from a contravariant position with multiple candidates, TypeScript produces an intersection (the type must satisfy all candidates simultaneously).

Covariant position (return type) → **union**: `infer R` from multiple returns gives `R1 | R2`
Contravariant position (parameter) → **intersection**: `infer P` from multiple params gives `P1 & P2`

### Common Pitfalls

- This is one of the most advanced TypeScript patterns — the key insight is understanding variance
- For primitive unions like `string | number`, the intersection `string & number` = `never`
