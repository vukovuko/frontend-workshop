# Math Utils

A small collection of geometry / interpolation helpers that come up constantly in UI code — canvas layouts, animations, aspect-ratio fitting, range mapping.

## Functions

### `distance(x1, y1, x2, y2): number`

Euclidean distance between two 2D points.

```typescript
distance(0, 0, 3, 4) // 5
```

### `remap(value, inMin, inMax, outMin, outMax, clamp?): number`

Linearly remap a value from one range to another. Optional `clamp` bounds the output to `[outMin, outMax]`.

```typescript
remap(5, 0, 10, 100, 200)        // 150 (halfway)
remap(0, 0, 10, 50, 60)          // 50  (at inMin)
remap(10, 0, 10, 50, 60)         // 60  (at inMax)
remap(-5, 0, 10, 100, 200)       // 50  (projects past outMin)
remap(-5, 0, 10, 100, 200, true) // 100 (clamped at outMin)
```

### `lerp(a, b, t): number`

Linear interpolation between `a` and `b` by factor `t`.

```typescript
lerp(0, 10, 0)   // 0
lerp(0, 10, 0.5) // 5
lerp(0, 10, 1)   // 10
```

### `fitContent(containerW, containerH, contentW, contentH): { x, y, width, height }`

Compute the position and size needed to scale and center content so it fully covers the container while preserving aspect ratio — equivalent to CSS `background-size: cover`.

```typescript
fitContent(400, 400, 200, 100)
// { width: 800, height: 400, x: -200, y: 0 }
```

## Hints

- `distance`: Pythagoras — `Math.sqrt(dx**2 + dy**2)`
- `remap`: normalize input to `[0, 1]` via `(value - inMin) / (inMax - inMin)`, then scale into the output range
- `lerp`: `a + (b - a) * t`
- `fitContent`: pick the **larger** of the two scale ratios so the content overflows rather than letterboxes
