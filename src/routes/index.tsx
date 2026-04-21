import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

type TaskLink = { to: string; label: string; note: string }

const tasks: TaskLink[] = [
  {
    to: '/tasks/detect-type',
    label: 'Detect Type',
    note: 'Better typeof — tells arrays from objects and null from undefined.',
  },
  {
    to: '/tasks/math-utils',
    label: 'Math Utils',
    note: 'distance, lerp, remap, cover-fit — canvas math grab bag.',
  },
  {
    to: '/tasks/debounce',
    label: 'Debounce',
    note: 'Fire only after the caller stops for N ms.',
  },
  {
    to: '/tasks/throttle',
    label: 'Throttle',
    note: 'Fire at most once per N ms; ignore the rest.',
  },

  {
    to: '/tasks/tuple-length',
    label: 'Tuple Length',
    note: "T['length'] — tuples know their length as a literal.",
  },
  {
    to: '/tasks/first-of-array',
    label: 'First of Array',
    note: 'Extract the head type with infer F.',
  },
  {
    to: '/tasks/tuple-to-union',
    label: 'Tuple to Union',
    note: 'T[number] turns a tuple into a value union.',
  },
  {
    to: '/tasks/tuple-to-object',
    label: 'Tuple to Object',
    note: 'Each tuple element becomes both key and value.',
  },
  {
    to: '/tasks/my-pick',
    label: 'Pick',
    note: 'Subset a type by key list — the classic mapped type.',
  },
  {
    to: '/tasks/my-readonly',
    label: 'Readonly',
    note: 'Freeze every property at the type level.',
  },

  {
    to: '/tasks/make-optional',
    label: 'Make Optional',
    note: 'Partial, but only for the keys you name.',
  },
  {
    to: '/tasks/make-readonly',
    label: 'Make Readonly',
    note: 'Readonly, but only for the keys you name.',
  },
  {
    to: '/tasks/append-to-object',
    label: 'Append to Object',
    note: 'Add one key+value as a flat type, not an intersection.',
  },
  {
    to: '/tasks/merge',
    label: 'Merge',
    note: 'Overlay two types; second wins on clashes.',
  },
  {
    to: '/tasks/pick-by-type',
    label: 'Pick By Type',
    note: 'Keep keys whose value type matches.',
  },
  {
    to: '/tasks/omit-by-type',
    label: 'Omit By Type',
    note: 'Drop keys whose value type matches.',
  },

  {
    to: '/tasks/es5-extends',
    label: 'ES5 Extends',
    note: 'What class extends compiles down to, written by hand.',
  },
  {
    to: '/tasks/deep-equals',
    label: 'Deep Equals',
    note: 'Recursive structural equality with cycle detection.',
  },
  {
    to: '/tasks/stringify',
    label: 'Stringify',
    note: 'JSON.stringify that also handles Map, Set, RegExp, and cycles.',
  },

  {
    to: '/tasks/my-promise',
    label: 'Promise',
    note: 'Build a Promises/A+ implementation from scratch.',
  },
  {
    to: '/tasks/tree-select',
    label: 'Tree Select',
    note: 'Tri-state checkbox tree with auto bubble and propagate.',
  },
]

function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-primary mb-6">Workshop</h1>
      <ul className="divide-y divide-border rounded-md border border-border overflow-hidden">
        {tasks.map((t) => (
          <li key={t.to}>
            <Link
              to={t.to}
              className="flex items-baseline gap-4 px-4 py-3 hover:bg-muted transition-colors"
            >
              <span className="font-medium text-primary min-w-[10rem] shrink-0">{t.label}</span>
              <span className="text-sm text-muted-foreground">{t.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
