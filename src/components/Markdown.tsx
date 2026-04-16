import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export function Markdown({ children }: { children: string }) {
  return (
    <article
      className="
        prose prose-sm max-w-none
        prose-headings:mt-4 prose-headings:mb-1.5
        prose-h1:text-xl prose-h1:mt-0
        prose-h2:text-base
        prose-h3:text-sm
        prose-p:my-1.5
        prose-pre:my-2 prose-pre:py-2 prose-pre:text-xs
        prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5
        prose-code:text-[0.85em] prose-code:before:hidden prose-code:after:hidden
      "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {children}
      </ReactMarkdown>
    </article>
  )
}
