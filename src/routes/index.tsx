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
        <li>
          <Link
            to="/tasks/tuple-length"
            className="text-primary hover:underline underline-offset-4"
          >
            Tuple Length
          </Link>
        </li>
        <li>
          <Link
            to="/tasks/first-of-array"
            className="text-primary hover:underline underline-offset-4"
          >
            First of Array
          </Link>
        </li>
        <li>
          <Link to="/tasks/throttle" className="text-primary hover:underline underline-offset-4">
            Throttle
          </Link>
        </li>
        <li>
          <Link to="/tasks/es5-extends" className="text-primary hover:underline underline-offset-4">
            ES5 Extends
          </Link>
        </li>
        <li>
          <Link
            to="/tasks/tuple-to-union"
            className="text-primary hover:underline underline-offset-4"
          >
            Tuple to Union
          </Link>
        </li>
        <li>
          <Link to="/tasks/my-pick" className="text-primary hover:underline underline-offset-4">
            Pick
          </Link>
        </li>
        <li>
          <Link to="/tasks/my-readonly" className="text-primary hover:underline underline-offset-4">
            Readonly
          </Link>
        </li>
        <li>
          <Link
            to="/tasks/tuple-to-object"
            className="text-primary hover:underline underline-offset-4"
          >
            Tuple to Object
          </Link>
        </li>
        <li>
          <Link to="/tasks/deep-equals" className="text-primary hover:underline underline-offset-4">
            Deep Equals
          </Link>
        </li>
        <li>
          <Link to="/tasks/stringify" className="text-primary hover:underline underline-offset-4">
            Stringify
          </Link>
        </li>
        <li>
          <Link to="/tasks/my-promise" className="text-primary hover:underline underline-offset-4">
            Promise
          </Link>
        </li>
      </ul>
    </main>
  )
}
