# Abstract Component

A base class for building vanilla JavaScript components with lifecycle methods.

## Overview

`AbstractComponent` provides a minimal framework for creating reusable UI components without a framework. It handles:

- DOM element creation
- Event listener management
- Component lifecycle (init, render, destroy)

## API

```ts
type TComponentConfig<T> = T & {
  root: HTMLElement              // parent element to mount into
  className?: string[]           // CSS classes for the container
  listeners?: string[]           // event types to bind (e.g. 'click')
  tag?: keyof HTMLElementTagNameMap // container tag (default: 'div')
}

abstract class AbstractComponent<T extends object> {
  container: HTMLElement | null
  config: TComponentConfig<T>

  constructor(config: TComponentConfig<T>)

  init(): void          // create container, bind events
  render(): void        // full render with cleanup
  afterRender(): void   // hook after DOM attachment
  destroy(): void       // cleanup and remove from DOM

  toHTML(): string      // override this
}
```

## Usage

```ts
class Counter extends AbstractComponent<{ initial: number }> {
  count: number

  constructor(config) {
    super({ ...config, listeners: ['click'] })
    this.count = config.initial
  }

  toHTML() {
    return `
      <button data-action="decrement">-</button>
      <span>${this.count}</span>
      <button data-action="increment">+</button>
    `
  }

  onClick(e: Event) {
    const action = (e.target as HTMLElement).dataset.action
    if (action === 'increment') this.count++
    if (action === 'decrement') this.count--
    this.render()
  }
}

const counter = new Counter({ root: document.getElementById('app')!, initial: 0 })
counter.render()
```

## Event Handling

Events are declared in the `listeners` config and handled by methods named `on{Event}`:

| Listener    | Handler Method |
| ----------- | -------------- |
| `'click'`   | `onClick(e)`   |
| `'input'`   | `onInput(e)`   |
| `'change'`  | `onChange(e)`  |
| `'keydown'` | `onKeydown(e)` |

Events are automatically bound to the container element and cleaned up on destroy.

## Design Principles

1. **Minimal API** — only essential lifecycle methods
2. **No magic** — explicit event binding via config
3. **Clean cleanup** — automatic event listener removal
4. **Composable** — components can nest other components
