import { detectType } from '../detect-type/solution'

// biome-ignore lint/suspicious/noExplicitAny: signature requires it
export function deepEquals(a: any, b: any, store: Map<object, object> = new Map()): boolean {
  const typeA = detectType(a)
  const typeB = detectType(b)

  if (typeA !== typeB) return false

  if (typeA !== 'object' && typeA !== 'array') {
    if (typeA === 'number' && Number.isNaN(a) && Number.isNaN(b)) return true
    return a === b
  }

  if (store.has(a)) return store.get(a) === b
  store.set(a, b)

  if (typeA === 'array') {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i], store)) return false
    }
    return true
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!Object.hasOwn(b, key)) return false
    if (!deepEquals(a[key], b[key], store)) return false
  }
  return true
}
