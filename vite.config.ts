import 'vite-ssg';
import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    formatting: 'minify',
    dirStyle: 'nested',
    script: 'async',
  },
  // worker: {
  //   format: 'es',
  // },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       format: 'esm',
  //     },
  //   },
  // },
  // base: process.env.node_env === 'production' ? '/algorithm-visualizer/' : '/',
  base: '/algorithm-visualizer/',
});
