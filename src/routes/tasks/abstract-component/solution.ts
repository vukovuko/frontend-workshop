export type TComponentConfig<T extends object> = T & {
  root: HTMLElement
  className?: string[]
  listeners?: string[]
  tag?: keyof HTMLElementTagNameMap
}

// biome-ignore lint/suspicious/noExplicitAny: default config is generic across all subclasses
const DEFAULT_CONFIG: Partial<TComponentConfig<any>> = {
  className: [],
  listeners: [],
  tag: 'div',
}

type TComponentListener = { type: string; callback: EventListenerOrEventListenerObject }

const toEventName = (type: string): string => {
  if (!type) return ''
  return `on${type[0]!.toUpperCase()}${type.slice(1)}`
}

export abstract class AbstractComponent<T extends object> {
  container: HTMLElement | null
  config: TComponentConfig<T>
  events: Array<TComponentListener>

  constructor(config: TComponentConfig<T>) {
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.container = null
    this.events = []
  }

  init() {
    this.container = document.createElement(this.config.tag as keyof HTMLElementTagNameMap)
    if (this.config.className) {
      for (const className of this.config.className) {
        this.container.classList.add(className)
      }
    }

    this.events = (this.config.listeners ?? []).map((type) => {
      const event = toEventName(type)
      // @ts-expect-error dynamic method lookup by event-derived name
      let callback = this[event]
      if (!callback) {
        throw new Error(`handler ${event} for ${type} is not implemented`)
      }
      callback = callback.bind(this)
      this.container!.addEventListener(type, callback)
      return { type, callback }
    })
  }

  afterRender() {}

  render() {
    if (this.container) this.destroy()
    this.init()
    this.container!.innerHTML = this.toHTML()
    this.config.root.appendChild(this.container!)
    this.afterRender()
  }

  toHTML(): string {
    return ''
  }

  destroy() {
    if (!this.container) return
    for (const { type, callback } of this.events) {
      this.container.removeEventListener(type, callback)
    }
    this.events = []
    this.container.remove()
    this.container = null
  }
}
