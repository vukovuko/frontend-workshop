import { useMemo, useRef, useState } from 'react'

export type TUploadStatus = 'idle' | 'uploading' | 'paused' | 'completed' | 'error'

export type TUploadState = {
  status: TUploadStatus
  progress: number
  speed: number
  bytes: number
  remainingTimeMs: number | null
  error?: string
}

export type TUploadControls = {
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

export function useFileUpload(url = '/api/upload'): [TUploadState, TUploadControls] {
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
    xhr.open('POST', url)
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
    // biome-ignore lint/correctness/useExhaustiveDependencies: beginUpload captures stable refs + setState
    [],
  )

  return [state, controls]
}
