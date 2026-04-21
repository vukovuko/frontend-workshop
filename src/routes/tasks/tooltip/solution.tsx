import {
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

type Side = 'top' | 'bottom' | 'left' | 'right'

type TooltipProps = {
  position?: Side | 'auto'
  content: ReactNode
  children: ReactNode
  boundary?: RefObject<HTMLElement | null> | HTMLElement
}

const positionClasses: Record<Side, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

function pickAutoSide(
  tooltipRect: DOMRect,
  triggerRect: DOMRect,
  bounds: { left: number; top: number; right: number; bottom: number },
): Side {
  const { width: tw, height: th } = tooltipRect
  const { left: trL, top: trT, right: trR, bottom: trB } = triggerRect
  const fits = (x: number, y: number) =>
    x >= bounds.left &&
    y >= bounds.top &&
    Math.ceil(x + tw) <= bounds.right &&
    Math.ceil(y + th) <= bounds.bottom

  const candidates: Array<{ side: Side; x: number; y: number }> = [
    { side: 'top', x: trL, y: trT - th },
    { side: 'right', x: trR, y: trT },
    { side: 'bottom', x: trL, y: trB },
    { side: 'left', x: trL - tw, y: trT },
  ]
  return candidates.find(({ x, y }) => fits(x, y))?.side ?? 'top'
}

export function Tooltip({ children, content, position = 'top', boundary }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [resolvedSide, setResolvedSide] = useState<Side>(position === 'auto' ? 'top' : position)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    if (!isVisible || position !== 'auto') return
    const tooltipEl = tooltipRef.current
    const containerEl = containerRef.current
    if (!tooltipEl || !containerEl) return
    const tooltipRect = tooltipEl.getBoundingClientRect()
    const triggerRect = containerEl.getBoundingClientRect()
    const boundaryEl = boundary instanceof HTMLElement ? boundary : boundary?.current
    const bounds = boundaryEl
      ? boundaryEl.getBoundingClientRect()
      : { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight }
    const next = pickAutoSide(tooltipRect, triggerRect, bounds)
    if (next !== resolvedSide) setResolvedSide(next)
  }, [isVisible, position, resolvedSide, boundary])

  const show = () => setIsVisible(true)
  const hide = () => {
    setIsVisible(false)
    if (position === 'auto') setResolvedSide('top')
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') hide()
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={onKeyDown}
      aria-describedby={isVisible ? id : undefined}
      className="relative inline-block"
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          id={id}
          className={`absolute z-50 px-2 py-1 rounded-md text-xs whitespace-nowrap bg-foreground text-background shadow-sm pointer-events-none ${positionClasses[resolvedSide]}`}
        >
          {content}
        </div>
      )}
    </div>
  )
}
