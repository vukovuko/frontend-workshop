import { createFileRoute, Link } from '@tanstack/react-router'
import problemMd from './problem.md?raw'
import solutionSource from './solution.ts?raw'
import { Markdown } from '../../../components/Markdown'
import { SourceCode } from '../../../components/SourceCode'
import { Demo } from './demo'

export const Route = createFileRoute('/tasks/merge/')({
  component: MergeTask,
})

const titleMatch = problemMd.match(/^#\s+(.+)\n/)
const title = titleMatch?.[1] ?? 'Untitled'
const body = titleMatch ? problemMd.slice(titleMatch[0].length).trimStart() : problemMd

function MergeTask() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <header className="flex items-center gap-3 mb-6">
        <Link
          to="/"
          aria-label="Back to home"
          className="inline-flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-lg leading-none"
        >
          ←
        </Link>
        <h1 className="text-2xl font-semibold m-0">{title}</h1>
      </header>

      <Markdown>{body}</Markdown>

      <hr className="my-10 border-border" />

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Solution</h2>
        <SourceCode source={solutionSource} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Demo</h2>
        <Demo />
      </section>
    </main>
  )
}
