import express from 'express'
import path from 'node:path'

const PORT = Number(process.env.PORT) || 3000
const isProd = process.env.NODE_ENV === 'production'

const app = express()
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, env: isProd ? 'production' : 'development' })
})

if (isProd) {
  const distDir = path.join(import.meta.dirname, '..', 'dist')
  app.use(express.static(distDir, { index: false }))
  app.get('/*splat', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
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
