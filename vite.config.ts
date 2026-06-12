import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { nitro } from 'nitro/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import type { RollupLog } from 'rollup';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart({
      importProtection: {
        behavior: 'error',
        client: {
          files: ['**/server/**'],
          specifiers: ['server-only'],
        },
      },
    }),
    nitro(),
    react(),
    visualizer({
      filename: 'stats.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
    dedupe: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      '@tanstack/react-query',
      '@tanstack/query-core',
    ],
  },
  server: {
    host: '::',
    port: 8080,
  },
  build: {
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      onwarn(warning: RollupLog, warn: (warning: RollupLog) => void) {
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
        warn(warning);
      },
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three';
            if (id.includes('gsap')) return 'gsap';
            if (id.includes('framer-motion')) return 'framer-motion';
            if (id.includes('recharts')) return 'recharts';
            if (id.includes('@ai-sdk') || id.includes('ai')) return 'ai';
            return 'vendor';
          }
        },
      },
    },
  },
});
