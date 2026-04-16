import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export function Markdown({ children }: { children: string }) {
  return (
    <article
      className="
        prose prose-base max-w-none
        prose-headings:mt-4 prose-headings:mb-2
        prose-h1:mt-0
        prose-p:my-2
        prose-pre:my-2 prose-pre:py-2
        prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5
        prose-code:before:hidden prose-code:after:hidden
      "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {children}
      </ReactMarkdown>
    </article>
  )
}
