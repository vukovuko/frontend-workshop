import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-primary mb-6">Workshop</h1>
      <ul className="space-y-2">
        <li>
          <Link to="/tasks/detect-type" className="text-primary hover:underline underline-offset-4">
            Detect Type
          </Link>
        </li>
        <li>
          <Link to="/tasks/debounce" className="text-primary hover:underline underline-offset-4">
            Debounce
          </Link>
        </li>
      </ul>
    </main>
  )
}
