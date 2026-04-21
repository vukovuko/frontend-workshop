import { Accordion, type TAccordionItem } from './solution'

const items: TAccordionItem[] = [
  {
    id: '1',
    title: 'What is React?',
    content:
      'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components.',
  },
  {
    id: '2',
    title: 'Why use TypeScript?',
    content:
      'TypeScript adds static types to JavaScript, catching entire classes of bugs at compile time and giving you better editor support, refactoring, and documentation.',
  },
  {
    id: '3',
    title: 'What is Bun?',
    content:
      'Bun is a fast all-in-one JavaScript runtime, bundler, test runner, and package manager — an alternative to Node + npm + webpack + jest.',
  },
]

export function Demo() {
  return <Accordion items={items} />
}
