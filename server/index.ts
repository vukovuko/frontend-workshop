import express from 'express'
import helmet from 'helmet'
import path from 'node:path'

const PORT = Number(process.env['PORT']) || 3000
const isProd = process.env['NODE_ENV'] === 'production'

const app = express()

app.set('trust proxy', 1)

if (isProd) {
  app.use(helmet())
}

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', env: isProd ? 'production' : 'development' })
})

app.post('/api/upload', (req, res) => {
  let bytes = 0
  req.on('data', (chunk: Buffer) => {
    bytes += chunk.length
  })
  req.on('end', () => res.json({ ok: true, bytes }))
  req.on('error', () => res.status(500).json({ ok: false }))
})

const STREAM_MARKDOWN_BODY = `# Hello!

I am a simulated streaming response. Each chunk arrives over time, exactly like real LLM APIs (OpenAI, Anthropic) stream tokens.

## How the pipeline works

1. Server reads this text and writes it in fixed-size chunks with a small delay between each write.
2. Client calls \`fetch()\` and reads \`response.body\` with \`getReader()\`.
3. Each decoded chunk is pushed into a queue.
4. A \`requestAnimationFrame\` loop types queued text character-by-character into state.
5. The accumulated string is re-parsed as Markdown on every keystroke.

## Why buffer the chunks

Network chunks arrive at unpredictable intervals. The typewriter runs at a fixed animation frame rate. Without a queue, a fast burst of chunks would either overwrite each other or drop characters. The queue smooths that out — new chunks wait their turn, no matter how fast the server sends them.

## Cancellation

\`AbortController\` cancels the in-flight request the moment you click **Stop**. Already-typed content stays on screen; only new writes are prevented. Re-clicking **Send** starts a fresh stream.

---

That is the entire loop: **stream in → buffer → type out → render Markdown**. Everything else is detail.
`

app.get('/api/stream-markdown', async (req, res) => {
  const delay = Math.max(0, Math.min(1000, Number(req.query['delay']) || 80))
  const chunkSize = Math.max(1, Math.min(500, Number(req.query['chunk']) || 100))

  res.set('Content-Type', 'text/plain; charset=utf-8')
  res.set('Transfer-Encoding', 'chunked')
  res.set('Cache-Control', 'no-cache')

  let aborted = false
  req.on('close', () => {
    aborted = true
  })

  for (let i = 0; i < STREAM_MARKDOWN_BODY.length; i += chunkSize) {
    if (aborted) return
    res.write(STREAM_MARKDOWN_BODY.slice(i, i + chunkSize))
    await new Promise((r) => setTimeout(r, delay))
  }
  res.end()
})

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

if (isProd) {
  const distDir = path.join(import.meta.dirname, '..', 'dist')

  app.use(
    '/assets',
    express.static(path.join(distDir, 'assets'), {
      immutable: true,
      maxAge: '1y',
      index: false,
    }),
  )

  app.use(express.static(distDir, { index: false, maxAge: '1h' }))

  app.use((_req, res) => {
    res.set('Cache-Control', 'no-cache').sendFile(path.join(distDir, 'index.html'))
  })
} else {
  const { createServer: createViteServer } = await import('vite')
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  })
  app.use(vite.middlewares)
}

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}  (${isProd ? 'prod' : 'dev'})`)
})
