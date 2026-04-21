# Accordion

## Goal

Build an accordion component that displays a list of expandable/collapsible items. Each item has a **title** (summary) and **content** (details). Users can toggle each section independently.

## Requirements

### Core Functionality

1. Render a list of accordion items from the provided configuration.
2. Each item displays a **title** that can be clicked to toggle its content.
3. Multiple sections can be open at the same time (independent control).

### Accessibility (A11y)

1. Use native `<details>` / `<summary>` elements — this gives you keyboard support and screen-reader semantics **for free**.
2. Content must be properly hidden/shown for assistive technologies.

## API Design

```ts
type TAccordionItem = {
  id: string
  title: string
  content: string
}

// Props
{ items: TAccordionItem[] }
```

## Walkthrough

### Step 1 — Render the list

Map over `items` and render a `<details>` element for each. Inside, place a `<summary>` for the title and a `<p>` (or `<div>`) for the content.

```tsx
items.map((item) => (
  <details key={item.id}>
    <summary>{item.title}</summary>
    <p>{item.content}</p>
  </details>
))
```

### Step 2 — Style it

- Add padding and borders to make each section visually distinct.
- Hide the default disclosure marker and add your own indicator that rotates on open.

### Step 3 — Animate (bonus)

Use the `::details-content` pseudo-element (modern browsers) or a height transition trick to animate the expand/collapse.

## Why `<details>` over manual state

The `<details>` element manages its own open/closed state natively. No `useState`. The browser handles toggle on click, toggle on Enter/Space, and proper ARIA roles. That makes the implementation zero-JS in its simplest form.

## Edge Cases

| Scenario            | Expected                                       |
| ------------------- | ---------------------------------------------- |
| Empty `items` array | Render nothing (no crash)                      |
| Very long content   | Content scrolls or wraps naturally             |
| Rapid clicking      | Each toggle is independent, no race conditions |
| Duplicate IDs       | Still renders, but use unique keys             |

## Verification

1. Click a title → content expands.
2. Click the same title again → content collapses.
3. Open multiple sections simultaneously → all stay open.
4. Tab to a section and press Enter/Space → toggles correctly.
