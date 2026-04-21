import React, {
  type MouseEvent,
  type PropsWithChildren,
  type ReactElement,
  type RefObject,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

type TTabProps = PropsWithChildren<{
  name: string
  isActive?: boolean
}>

type TTabsProps = {
  target?: RefObject<HTMLElement | null>
  defaultTab?: string
  children: ReactElement<TTabProps, typeof Tab>[]
}

export function Tab({ name, isActive }: TTabProps) {
  return (
    <li role="presentation">
      <button
        type="button"
        role="tab"
        id={`tab-${name}`}
        data-tab-name={name}
        aria-selected={isActive}
        aria-controls="tab-panel"
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
      >
        {name}
      </button>
    </li>
  )
}

export function Tabs({ defaultTab, children, target }: TTabsProps) {
  const items: ReactElement<TTabProps>[] = Array.isArray(children) ? children : [children]
  const firstName = items[0]?.props.name ?? ''
  const hasDefault = defaultTab != null && items.some((c) => c.props.name === defaultTab)
  const [activeTab, setActiveTab] = useState<string>(hasDefault ? defaultTab! : firstName)

  const handleTabClick = ({ target: t }: MouseEvent<HTMLUListElement>) => {
    if (t instanceof HTMLButtonElement) {
      const tabName = t.dataset['tabName']
      if (tabName) setActiveTab(tabName)
    }
  }

  const content = items.find((c) => c.props.name === activeTab)?.props.children

  return (
    <div>
      <nav>
        <ul
          role="tablist"
          onClickCapture={handleTabClick}
          className="flex flex-row items-start gap-2 list-none p-0 m-0"
        >
          {items.map((child) =>
            React.cloneElement(child, { isActive: child.props.name === activeTab }),
          )}
        </ul>
      </nav>
      {content && target?.current != null ? (
        createPortal(
          <div role="tabpanel" id="tab-panel" aria-labelledby={`tab-${activeTab}`}>
            {content}
          </div>,
          target.current,
        )
      ) : (
        <section
          role="tabpanel"
          id="tab-panel"
          aria-labelledby={`tab-${activeTab}`}
          className="mt-4 p-4 rounded-md border border-border bg-card"
        >
          {content}
        </section>
      )}
    </div>
  )
}
