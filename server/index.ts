import express from 'express'
import helmet from 'helmet'
import path from 'node:path'

const PORT = Number(process.env['PORT']) || 3000
const isProd = process.env['NODE_ENV'] === 'production'

const app = express()

// Behind Caddy reverse proxy: trust 1 hop so req.ip / req.protocol reflect the
// real client (X-Forwarded-For / X-Forwarded-Proto from Caddy).
// https://expressjs.com/en/api.html#trust.proxy.options.table
app.set('trust proxy', 1)

// Security headers (CSP, X-Content-Type-Options, etc). Skipped in dev because
// CSP can interfere with Vite's HMR injected scripts.
if (isProd) {
  app.use(helmet())
}

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

// ─── API routes ──────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', env: isProd ? 'production' : 'development' })
})

// Any unmatched /api/* returns JSON 404 so API clients never receive HTML
// from the SPA fallback below.
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

// ─── Static + SPA fallback (prod) / Vite middleware (dev) ────────────────
if (isProd) {
  const distDir = path.join(import.meta.dirname, '..', 'dist')

  // Hashed assets: long-lived immutable cache. Vite fingerprints filenames so
  // a 1-year cache is safe — new deploys produce new filenames.
  app.use(
    '/assets',
    express.static(path.join(distDir, 'assets'), {
      immutable: true,
      maxAge: '1y',
      index: false,
    }),
  )

  // Other static files (favicon, robots.txt, public/*). Short cache, no auto-index.
  app.use(express.static(distDir, { index: false, maxAge: '1h' }))

  // SPA fallback. `app.use` with no path matches everything including `/` —
  // the express-5-safe alternative to `/*splat` (which doesn't match the root).
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
