module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: '.output/server/index.mjs',
      interpreter: 'node',
      env: {
        PORT: 3002,
        NODE_ENV: 'production',
      },
    },
  ],
}
