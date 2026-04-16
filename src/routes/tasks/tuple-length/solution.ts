// biome-ignore lint/suspicious/noExplicitAny: tuple constraint requires it
export type Length<T extends readonly any[]> = T['length']
