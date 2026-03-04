# 3.5 Lookup

## Problem

Sometimes, you may want to look up a value in a union of types by a discriminant field.
Get the corresponding type by searching for the common `type` field in a union.

```typescript
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}
interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
}

type MyDog = LookUp<Cat | Dog, 'dog'> // Dog
```

## Explanation

### Key Concepts

- **Distributive conditional types** — when checking `U extends ...`, if `U` is a union, TypeScript checks each member separately
- **Structural pattern matching** — `U extends { type: T }` checks if a type has a `type` property matching `T`

### Solution Approach

```typescript
type LookUp<U, T> = U extends { type: T } ? U : never
```

**How it works step-by-step:**

`LookUp<Cat | Dog, 'dog'>` distributes over the union:

1. `Cat extends { type: 'dog' }` → `Cat.type` is `'cat'`, not `'dog'` → `never`
2. `Dog extends { type: 'dog' }` → `Dog.type` is `'dog'` → `Dog`
3. Result: `never | Dog` = `Dog`

### Why This Works

TypeScript uses **structural typing** — `U extends { type: T }` doesn't require `U` to be exactly `{ type: T }`. It only requires `U` to have at least a `type` property assignable to `T`. Since `Dog` has `type: 'dog'` (plus other properties), it satisfies `{ type: 'dog' }`.

### Discriminated Unions

This pattern is the type-level equivalent of runtime discriminated union narrowing:

```typescript
// Runtime
function handle(animal: Cat | Dog) {
  if (animal.type === 'dog') {
    /* animal is Dog here */
  }
}

// Type level
type Result = LookUp<Cat | Dog, 'dog'> // Dog
```

### Common Pitfalls

- Over-constraining the generic — don't require `U extends { type: string }` in the constraint, as that would reject unions where some members lack `type`
