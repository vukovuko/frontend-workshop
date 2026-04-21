import { detectType } from '../detect-type/solution'

// biome-ignore lint/suspicious/noExplicitAny: recursive value handling
export function stringify<T>(value: T, seen: WeakSet<object> = new WeakSet()): string {
  const type = detectType(value)
  switch (type) {
    case 'null':
    case 'number':
    case 'bigint':
    case 'boolean':
      return `${value}`
    case 'symbol':
      return `"${String(value)}"`
    case 'undefined':
    case 'string':
      return `"${value}"`
    case 'map':
    case 'object': {
      if (seen.has(value as object)) return '[Circular]'
      seen.add(value as object)
      const entries =
        type === 'map'
          ? Array.from((value as Map<any, any>).entries())
          : Object.entries(value as object)
      const content = entries.map(([k, v]) => `${k}: ${stringify(v, seen)}`).join(', ')
      return `{ ${content} }`
    }
    case 'set':
    case 'array': {
      if (seen.has(value as object)) return '[Circular]'
      seen.add(value as object)
      const content = Array.from(value as Array<any> | Set<any>)
        .map((v) => stringify(v, seen))
        .join(',')
      return `[${content}]`
    }
    case 'date':
      return (value as Date).toLocaleString()
    case 'regexp':
      return (value as RegExp).toString()
    default:
      return '"Unsupported Type"'
  }
}
