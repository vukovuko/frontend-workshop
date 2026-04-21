# Tooltip

## Goal

Build an accessible tooltip that supports four fixed positions (`top`, `bottom`, `left`, `right`) plus an `auto` mode that picks whichever position fits within the viewport or a provided boundary element.

## Requirements

### Core Functionality

1. Tooltip shows on hover OR focus of the trigger.
2. Hides on mouseleave, blur, or Escape key.
3. Four fixed positions + `auto`.
4. Optional `boundary` ref — if the tooltip would overflow the boundary, `auto` falls back to a fitting side.

### Accessibility

1. `role="tooltip"` on the bubble.
2. Trigger links to tooltip via `aria-describedby` (only when visible).
3. Both mouse and keyboard triggers supported.
4. Escape key dismisses.

### Positioning Logic (auto mode)

After first render measures both elements. Tries positions in order: **top → right → bottom → left**. Picks the first one whose computed rect fits inside the boundary. Falls back to `top` if none fit.

```ts
const fits = (x, y) =>
  x >= bRect.left &&
  y >= bRect.top &&
  x + tw <= bRect.right &&
  y + th <= bRect.bottom
```

## API

```ts
type TooltipProps = {
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
  content: React.ReactNode
  children: React.ReactNode
  boundary?: React.RefObject<HTMLElement | null> | HTMLElement
}
```

## Walkthrough

### Step 1 — Basic render on hover

`useState(isVisible)`. Render children wrapped in a `<div>` with `onMouseEnter` / `onMouseLeave`. Render tooltip conditionally.

### Step 2 — CSS positioning

Map each position to utility classes:

- `top`: above trigger, centered horizontally
- `bottom`: below, centered horizontally
- `left`: to the left, centered vertically
- `right`: to the right, centered vertically

### Step 3 — Measure for auto

When `position === 'auto'`, on mount (or on show), measure trigger and tooltip with `getBoundingClientRect()`. Compute candidate coordinates for each side, pick the first that fits inside the boundary rect.

### Step 4 — A11y

- `role="tooltip"` on the bubble
- `id` via `useId()`
- `aria-describedby={id}` on the trigger wrapper (only when `isVisible`)
- `onKeyDown` for Escape

## Edge Cases

| Scenario                | Expected                              |
| ----------------------- | ------------------------------------- |
| Trigger near edge       | `auto` picks the side that fits       |
| Content larger than all sides | Falls back to `top`            |
| User tabs to trigger    | Tooltip shows on focus                |
| Escape pressed          | Tooltip hides                         |
| Rapid hover in/out      | State toggles cleanly                 |

## Verification

1. Hover each trigger → tooltip appears.
2. Tab to a trigger → tooltip appears on focus, disappears on blur.
3. Press Escape while hovered → tooltip hides.
4. Tooltip near a boundary edge → `auto` flips to the opposite side.
