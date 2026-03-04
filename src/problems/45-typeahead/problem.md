# Typeahead (Autocomplete)

**Difficulty**: 🔴 Hard · **Time**: 25–30 min

## What You'll Learn

- Trie data structure for prefix search
- Debounced input handling
- Keyboard navigation in dropdown lists
- Async data loading with loading states

## Goal

Build a typeahead/autocomplete input. As the user types, show a dropdown of matching suggestions fetched from a Trie. Support keyboard navigation (arrow keys + Enter) and mouse selection.

```
┌─────────────────────────┐
│  jav                    │  ← user types "jav"
├─────────────────────────┤
│  ▸ JavaScript           │  ← highlighted (keyboard)
│    Java                 │
│    Javanese             │
└─────────────────────────┘
       │ Enter or Click
       ▼
┌─────────────────────────┐
│  JavaScript             │  ← selected value
└─────────────────────────┘
```

## Requirements

### Core Functionality

1. **Text input** with debounced search (avoid searching on every keystroke).
2. **Trie-based search**: Build a Trie from the data set. Query with `getWithPrefix(query)`.
3. **Dropdown**: Show matching results below the input.
4. **Selection**: Click or press Enter to select a suggestion.
5. **Keyboard navigation**: Arrow Up/Down to move highlight, Enter to select, Escape to close.

### Trie Data Structure

A Trie (prefix tree) enables O(k) prefix lookups where k = query length:

```
Root
├─ j
│  ├─ a
│  │  ├─ v
│  │  │  ├─ a ✓ (Java)
│  │  │  │  ├─ s
│  │  │  │  │  └─ c
│  │  │  │  │     └─ r
│  │  │  │  │        └─ i
│  │  │  │  │           └─ p
│  │  │  │  │              └─ t ✓ (JavaScript)
│  │  │  │  └─ n
│  │  │  │     └─ e
│  │  │  │        └─ s
│  │  │  │           └─ e ✓ (Javanese)
```

**Key operations:**

- `insert(word, value)` — add a word to the trie
- `getWithPrefix(prefix)` — collect all values under a prefix node

```ts
class TrieNode<T> {
  value: T | null = null
  isEnd: boolean = false
  children: Map<string, TrieNode<T>> = new Map()
}

class Trie<T> {
  insert(word: string, value: T): void
  getWithPrefix(prefix: string): T[]
}
```

### Keyboard Navigation

| Key            | Action                  |
| -------------- | ----------------------- |
| `↓` Arrow Down | Move highlight down     |
| `↑` Arrow Up   | Move highlight up       |
| `Enter`        | Select highlighted item |
| `Escape`       | Close dropdown          |

Track `highlightedIndex` in state. Wrap around at boundaries.

## Walkthrough

### Step 1 — Build the Trie

On mount (or when data changes), insert all items into a Trie. Normalize to lowercase for case-insensitive search.

### Step 2 — Debounced search

On input change, debounce the query (e.g., 200ms). Then call `trie.getWithPrefix(query)` and set the results in state.

### Step 3 — Render dropdown

When results are non-empty and input is focused, show a dropdown list. Highlight the active item based on `highlightedIndex`.

### Step 4 — Keyboard handler

On `keydown` of the input:

- ArrowDown: `setHighlightedIndex(i => (i + 1) % results.length)`
- ArrowUp: `setHighlightedIndex(i => (i - 1 + results.length) % results.length)`
- Enter: select `results[highlightedIndex]`
- Escape: close dropdown

### Step 5 — Selection

On select (click or Enter), set the input value to the selected item and close the dropdown.

<details>
<summary>💡 Hint — Trie vs Array.filter</summary>

For small datasets, `array.filter(item => item.startsWith(query))` works fine. But for large datasets (10k+ items), a Trie is significantly faster because it only traverses the relevant branch of the tree, not the entire array.

</details>

<details>
<summary>💡 Hint — Closing the dropdown</summary>

Close the dropdown on:

- Escape key
- Click outside (use a `blur` handler with a small delay, or a click-outside listener)
- Selection

Be careful with `blur` — if the user clicks a dropdown item, the input blurs before the click registers. Use `onMouseDown` (fires before blur) or a timeout.

</details>

## Edge Cases

| Scenario                | Expected                             |
| ----------------------- | ------------------------------------ |
| Empty query             | No dropdown (or show all items)      |
| No matches              | Show "No results" or hide dropdown   |
| Query with spaces       | Normalize and search                 |
| Very fast typing        | Debounce prevents excessive searches |
| Select then type again  | Dropdown reopens with new results    |
| Arrow key on empty list | Nothing happens                      |

## Verification

1. Type "jav" → dropdown shows JavaScript, Java, etc.
2. Arrow Down → highlight moves to next item.
3. Enter → input fills with highlighted value, dropdown closes.
4. Escape → dropdown closes.
5. Click a suggestion → input fills, dropdown closes.
6. Clear input → dropdown closes.
