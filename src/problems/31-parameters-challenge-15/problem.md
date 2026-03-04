# 4.2 Parameters

## Problem

Implement the built-in `Parameters<T>` generic without using it.

```typescript
const foo = (arg1: string, arg2: number): void => {}

type FunctionParamsType = MyParameters<typeof foo> // [string, number]
```

## Explanation

### Key Concepts

- **`infer` in parameter position** — `(...args: infer P) => any` captures the entire parameter list as a tuple type
- **Tuple types for parameters** — TypeScript represents function parameters as a tuple type internally

### Solution Approach

```typescript
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any
  ? P
  : never
```

**How it works step-by-step:**

1. `T extends (...args: any[]) => any` — constrains `T` to a function
2. `T extends (...args: infer P) => any` — matches the function pattern and captures all parameters as tuple `P`
3. Return `P` — the tuple of parameter types

**Example trace:** `MyParameters<(arg1: string, arg2: number) => void>`

- Pattern match: captures `P` as `[string, number]`
- Result: `[string, number]`

### ReturnType vs Parameters — Mirror Pattern

These two types are mirrors of each other:

```typescript
// Capture return type
T extends (...args: any) => infer R ? R : never

// Capture parameters
T extends (...args: infer P) => any ? P : never
```

The only difference is where `infer` is placed — in the return position or the parameter position.

### Common Pitfalls

- Expecting individual types instead of a tuple — `Parameters` always returns a tuple, even for a single parameter: `[string]`, not `string`
- For zero parameters, the result is `[]` (empty tuple)
