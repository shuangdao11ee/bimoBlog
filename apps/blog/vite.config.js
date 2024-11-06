import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { sentryVitePlugin } from '@sentry/vite-plugin';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  base: '/',
  target: ['es2015'],
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'js-monitor',
      project: 'javascript-react',
      authToken: process.env.SENTRY_AUTH_TOKEN
    })
  ],
  build: {
    sourcemap: 'hidden'
  }
});
