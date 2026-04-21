# Progress Bar

## Goal

Build an animated progress bar with a label that appears to change color as the fill passes over it — dark text on the unfilled portion, light text on the filled portion.

## API

```ts
type ProgressBarProps = {
  value: number
  max?: number        // default 100
  label?: string      // defaults to "{percentage}%"
}
```

## The Dual-Label Trick

A single text element can only have one color. To make text look like it changes color as the bar fills, stack two identical labels:

1. A **dark** label sits on top of the unfilled background.
2. A **light** label sits on top, clipped by `clip-path: inset(0 ${100 - percentage}% 0 0)` so only the portion over the filled area is visible.

As `value` grows, the clip-path opens up from the left, revealing more of the white label exactly where the filled bar sits.

## Requirements

### Core Functionality

1. `value` clamped to `[0, max]`.
2. Fill width uses percentage; transitions smoothly on value change.
3. Clip-path on the light label transitions in sync with the fill.
4. Label defaults to rounded percentage; accepts custom override.

### Accessibility

1. `role="progressbar"`
2. `aria-valuenow={value}`, `aria-valuemin={0}`, `aria-valuemax={max}`
3. `aria-label` describes progress
4. The clipped label is `aria-hidden` (it's a visual duplicate, not screen-reader content)

## Edge Cases

| Scenario             | Expected                              |
| -------------------- | ------------------------------------- |
| `value` below 0      | Clamp to 0 — bar stays empty          |
| `value` above `max`  | Clamp to 100% — bar stays full        |
| `value` equals 0     | No fill; dark label visible full-width |
| `value` equals `max` | Full fill; light label visible full-width |
| Rapid value changes  | CSS transitions smooth the motion     |

## Verification

1. Render `<ProgressBar value={0} />` — empty, shows "0%" in dark text.
2. Render `<ProgressBar value={50} />` — half full, "50%" label — left half in light color, right half in dark.
3. Animate value from 0 → 100 — label color flips smoothly as fill passes.
4. Custom `label="Uploading..."` — text replaces the percentage.
