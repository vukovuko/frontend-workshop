export type TType =
  | 'null'
  | 'undefined'
  | 'string'
  | 'number'
  | 'boolean'
  | 'symbol'
  | 'bigint'
  | 'object'
  | 'array'
  | 'function'
  | 'date'
  | 'regexp'
  | 'map'
  | 'set'
  | 'weakmap'
  | 'weakset'
  | 'error'
  | 'promise'
  | 'arraybuffer'
  | (string & {})

// biome-ignore lint/suspicious/noExplicitAny: signature requires it
export function detectType(value: any): TType {
  if (value == null) return `${value}` as TType
  return (Object.getPrototypeOf(value)?.constructor?.name ?? 'object').toLowerCase() as TType
}
