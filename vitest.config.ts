/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: [
      'apps/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'libs/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.{idea,git,cache,output,temp}/**'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules',
        'dist',
        'build',
        '*.config.ts',
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.spec.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@zoo/zoo-ui': '/libs/zoo-ui/src',
      '@zoo/zoo-message-ts': '/libs/zoo-message-ts/src',
      '@zoo/zoo-node-state': '/libs/zoo-node-state/src',
      '@zoo/zoo-i18n': '/libs/zoo-i18n/src',
      '@zoo/zoo-artifacts': '/libs/zoo-artifacts/src',
      '@zooai/zoo-message-ts': '/libs/zoo-message-ts/src',
      '@zooai/zoo-node-state': '/libs/zoo-node-state/src',
      '@zooai/zoo-i18n': '/libs/zoo-i18n/src',
      '@zooai/zoo-ui': '/libs/zoo-ui/src',
      '@zooai/zoo-artifacts': '/libs/zoo-artifacts/src',
    },
  },
  esbuild: {
    supported: {
      'top-level-await': true,
      bigint: true,
    },
  },
});