import { detectType } from '../detect-type/solution'

// biome-ignore lint/suspicious/noExplicitAny: signature requires it
export function deepEquals(a: any, b: any, store: Map<object, Set<object>> = new Map()): boolean {
  if (a === b) return true

  if (typeof a === 'number' && typeof b === 'number' && Number.isNaN(a) && Number.isNaN(b)) {
    return true
  }

  const typeA = detectType(a)
  const typeB = detectType(b)
  if (typeA !== typeB) return false

  if (typeA !== 'object' && typeA !== 'array') return false

  const seen = store.get(a)
  if (seen?.has(b)) return true
  if (!seen) store.set(a, new Set([b]))
  else seen.add(b)

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!Object.hasOwn(b, key)) return false
    if (!deepEquals(a[key], b[key], store)) return false
  }

  return true
}
