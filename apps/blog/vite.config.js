import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  base: '/',
  plugins: [react()]
});
