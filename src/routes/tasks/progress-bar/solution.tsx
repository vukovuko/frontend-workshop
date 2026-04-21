type ProgressBarProps = {
  value: number
  max?: number
  label?: string
}

export function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const displayLabel = label ?? `${Math.round(percentage)}%`

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label ?? `Progress: ${Math.round(percentage)}%`}
      className="relative w-full h-8 rounded-md overflow-hidden bg-muted"
    >
      <div
        className="absolute inset-0 bg-primary transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-foreground">
        {displayLabel}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center text-sm font-medium text-primary-foreground transition-[clip-path] duration-300 ease-out"
        style={{ clipPath: `inset(0 ${100 - percentage}% 0 0)` }}
      >
        {displayLabel}
      </div>
    </div>
  )
}
