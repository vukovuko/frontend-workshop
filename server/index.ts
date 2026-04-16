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
