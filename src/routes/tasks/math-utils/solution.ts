export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

export function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clamp = false,
): number {
  let t = (value - inMin) / (inMax - inMin)
  if (clamp) t = Math.max(0, Math.min(1, t))
  return t * (outMax - outMin) + outMin
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function fitContent(
  containerWidth: number,
  containerHeight: number,
  contentWidth: number,
  contentHeight: number,
): { x: number; y: number; width: number; height: number } {
  const scale = Math.max(containerWidth / contentWidth, containerHeight / contentHeight)
  const width = contentWidth * scale
  const height = contentHeight * scale
  const x = (containerWidth - width) / 2
  const y = (containerHeight - height) / 2
  return { x, y, width, height }
}
