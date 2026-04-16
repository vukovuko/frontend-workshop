module.exports = {
  apps: [
    {
      name: 'workshops',
      script: './dist-server/index.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
