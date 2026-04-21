import { type ChangeEvent, useMemo, useRef, useState } from 'react'

type TUploadStatus = 'idle' | 'uploading' | 'paused' | 'completed' | 'error'

type TUploadState = {
  status: TUploadStatus
  progress: number
  speed: number
  bytes: number
  remainingTimeMs: number | null
  error?: string
}

type TUploadControls = {
  start: (file: File) => void
  pause: () => void
  resume: (file: File) => void
  cancel: () => void
}

const INITIAL_STATE: TUploadState = {
  status: 'idle',
  progress: 0,
  speed: 0,
  bytes: 0,
  remainingTimeMs: null,
}

function useFileUpload(): [TUploadState, TUploadControls] {
  const [state, setState] = useState<TUploadState>(INITIAL_STATE)
  const xhrRef = useRef<XMLHttpRequest | null>(null)
  const offsetRef = useRef(0)
  const bytesRef = useRef(0)
  const startTimeRef = useRef(0)

  const beginUpload = (file: File, offset: number) => {
    const xhr = new XMLHttpRequest()
    xhrRef.current = xhr
    startTimeRef.current = Date.now()
    bytesRef.current = offset

    xhr.upload.addEventListener('progress', (e) => {
      if (!e.lengthComputable) return
      const totalSent = offset + e.loaded
      bytesRef.current = totalSent
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const speed = elapsed > 0 ? e.loaded / 1024 / elapsed : 0
      const remainingBytes = file.size - totalSent
      const remainingTimeMs = speed > 0 ? (remainingBytes / (speed * 1024)) * 1000 : null

      setState({
        status: 'uploading',
        progress: (totalSent / file.size) * 100,
        speed,
        bytes: totalSent,
        remainingTimeMs,
      })
    })

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setState((s) => ({ ...s, status: 'completed', progress: 100, remainingTimeMs: 0 }))
      } else {
        setState((s) => ({ ...s, status: 'error', error: `HTTP ${xhr.status}` }))
      }
    })

    xhr.addEventListener('error', () => {
      setState((s) => ({ ...s, status: 'error', error: 'Network error' }))
    })

    const body = offset > 0 ? file.slice(offset) : file
    xhr.open('POST', '/api/upload')
    xhr.setRequestHeader('X-File-Name', file.name)
    xhr.send(body)

    setState({
      status: 'uploading',
      progress: (offset / file.size) * 100,
      speed: 0,
      bytes: offset,
      remainingTimeMs: null,
    })
  }

  const controls = useMemo<TUploadControls>(
    () => ({
      start: (file) => {
        offsetRef.current = 0
        beginUpload(file, 0)
      },
      pause: () => {
        if (!xhrRef.current) return
        offsetRef.current = bytesRef.current
        xhrRef.current.abort()
        xhrRef.current = null
        setState((s) => ({ ...s, status: 'paused' }))
      },
      resume: (file) => {
        beginUpload(file, offsetRef.current)
      },
      cancel: () => {
        xhrRef.current?.abort()
        xhrRef.current = null
        offsetRef.current = 0
        bytesRef.current = 0
        setState(INITIAL_STATE)
      },
    }),
    [],
  )

  return [state, controls]
}

function formatSpeed(kbs: number): string {
  if (!kbs || kbs <= 0) return ''
  if (kbs >= 1024) return `${(kbs / 1024).toFixed(2)} MB/s`
  return `${Math.round(kbs)} KB/s`
}

function formatTime(ms: number | null): string {
  if (ms == null || !Number.isFinite(ms)) return ''
  const total = Math.max(0, Math.round(ms / 1000))
  if (total < 60) return `${total}s left`
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}m ${s}s left`
}

function ProgressBar({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="relative w-full h-2 rounded-full bg-muted overflow-hidden"
    >
      <div
        className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-100"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function UploadComponent() {
  const [state, controls] = useFileUpload()
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const pickFile = () => inputRef.current?.click()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    setFile(selected)
    controls.start(selected)
  }

  const reset = () => {
    controls.cancel()
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const uploadAnother = () => {
    reset()
    pickFile()
  }

  return (
    <div className="space-y-3 p-4 rounded-md border border-border bg-card max-w-md">
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      {state.status === 'idle' && (
        <button
          type="button"
          onClick={pickFile}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors w-full"
        >
          Select file
        </button>
      )}

      {state.status !== 'idle' && file && (
        <>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium truncate max-w-[60%]">{file.name}</span>
            <span className="text-muted-foreground">
              {state.status === 'completed'
                ? 'Completed'
                : state.status === 'paused'
                  ? 'Paused'
                  : state.status === 'error'
                    ? 'Error'
                    : formatSpeed(state.speed)}
            </span>
          </div>

          <ProgressBar value={state.progress} />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{Math.round(state.progress)}%</span>
            <span>{formatTime(state.remainingTimeMs)}</span>
          </div>

          {state.error && <div className="text-sm text-destructive">{state.error}</div>}

          <div className="flex gap-2 pt-1">
            {state.status === 'uploading' && (
              <button
                type="button"
                onClick={() => controls.pause()}
                className="px-3 py-1.5 text-sm rounded-md border border-border hover:bg-muted transition-colors"
              >
                Pause
              </button>
            )}
            {state.status === 'paused' && (
              <button
                type="button"
                onClick={() => controls.resume(file)}
                className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Resume
              </button>
            )}
            {state.status === 'completed' && (
              <button
                type="button"
                onClick={uploadAnother}
                className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Upload Another
              </button>
            )}
            {state.status !== 'completed' && (
              <button
                type="button"
                onClick={reset}
                className="px-3 py-1.5 text-sm rounded-md border border-border hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
