import { useCallback, useEffect, useRef, useState } from 'react'
import { Markdown } from '../../../components/Markdown'

type StreamCallback = (chunk: string) => void

type StreamOptions = {
  url?: string
  delay?: number
  onComplete?: () => void
  onError?: (error: Error) => void
}

export function useMarkdownStream(options: StreamOptions = {}) {
  const { url = '/api/stream-markdown', delay = 80, onComplete, onError } = options
  const [inProgress, setInProgress] = useState(false)
  const controllerRef = useRef<AbortController | null>(null)

  const stream = useCallback(
    async (onChunk: StreamCallback) => {
      controllerRef.current?.abort()
      const controller = new AbortController()
      controllerRef.current = controller
      setInProgress(true)

      try {
        const response = await fetch(`${url}?delay=${delay}`, { signal: controller.signal })
        if (!response.ok) throw new Error(`Stream failed: ${response.status}`)
        if (!response.body) throw new Error('Response has no body')
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          onChunk(decoder.decode(value, { stream: true }))
        }

        onComplete?.()
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Stream error:', err)
          onError?.(err as Error)
        }
      } finally {
        if (controllerRef.current === controller) {
          controllerRef.current = null
          setInProgress(false)
        }
      }
    },
    [url, delay, onComplete, onError],
  )

  const abort = useCallback(() => {
    controllerRef.current?.abort()
    controllerRef.current = null
    setInProgress(false)
  }, [])

  useEffect(() => {
    return () => {
      controllerRef.current?.abort()
    }
  }, [])

  return { stream, abort, inProgress }
}

export function GPTChat() {
  const [chunks, setChunks] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const { stream, abort, inProgress } = useMarkdownStream()
  const contentRef = useRef<HTMLElement | null>(null)

  const handleSend = () => {
    setChunks([])
    setContent('')
    stream((chunk) => {
      setChunks((prev) => [...prev, chunk])
    })
  }

  const type = useCallback(function recursiveType(chunk: string) {
    if (chunk.length === 0) {
      setIsTyping(false)
      return
    }
    const charsToType = 2
    const chars = chunk.slice(0, charsToType)
    const rest = chunk.slice(charsToType)
    setContent((prev) => prev + chars)
    if (rest.length > 0) {
      requestAnimationFrame(() => recursiveType(rest))
    } else {
      setIsTyping(false)
    }
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    if (!isTyping && chunks.length > 0) {
      setIsTyping(true)
      const [nextChunk, ...rest] = chunks
      setChunks(rest)
      if (nextChunk != null) type(nextChunk)
    }
  }, [chunks, isTyping, type])

  return (
    <div className="flex flex-col gap-3 w-full">
      <section
        ref={contentRef}
        className="min-h-64 max-h-[32rem] overflow-y-auto rounded-md border border-border bg-card p-4"
      >
        {content ? (
          <Markdown>{content}</Markdown>
        ) : (
          <div className="text-sm text-muted-foreground">
            Press <strong>Send</strong> to stream a response.
          </div>
        )}
      </section>

      <section className="flex gap-2 items-stretch">
        <textarea
          rows={2}
          placeholder="Type a message (response is simulated)"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        {inProgress ? (
          <button
            type="button"
            onClick={abort}
            className="px-4 py-2 bg-destructive text-white rounded-md hover:opacity-90 transition-opacity"
          >
            Stop
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSend}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Send
          </button>
        )}
      </section>
    </div>
  )
}
