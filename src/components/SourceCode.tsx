import { Markdown } from './Markdown'

export function SourceCode({ source, lang = 'ts' }: { source: string; lang?: string }) {
  return <Markdown>{`\`\`\`${lang}\n${source.trim()}\n\`\`\``}</Markdown>
}
