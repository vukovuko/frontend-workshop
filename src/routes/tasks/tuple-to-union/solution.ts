// biome-ignore lint/suspicious/noExplicitAny: tuple constraint requires it
export type TupleToUnion<T extends readonly any[]> = T[number]
