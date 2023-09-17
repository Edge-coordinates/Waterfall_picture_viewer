import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import {chrome} from '../../.electron-vendors.cache.json';
import {renderer} from 'unplugin-auto-expose';
import {join} from 'node:path';
import {injectAppVersion} from '../../version/inject-app-version-plugin.mjs';
import path from 'path'

const PACKAGE_ROOT = __dirname;

export default defineConfig({
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src')
    }
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['../../'],
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`
  },
  plugins: [
    sveltekit(),
    renderer.vite({
      preloadEntry: join(PACKAGE_ROOT, '../preload/src/index.ts'),
    }),
    injectAppVersion(),
  ]
});
