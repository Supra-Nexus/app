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
      '@supra/supra-ui': '/libs/supra-ui/src',
      '@supra/supra-message-ts': '/libs/supra-message-ts/src',
      '@supra/supra-node-state': '/libs/supra-node-state/src',
      '@supra/supra-i18n': '/libs/supra-i18n/src',
      '@supra/supra-artifacts': '/libs/supra-artifacts/src',
      '@supraai/supra-message-ts': '/libs/supra-message-ts/src',
      '@supraai/supra-node-state': '/libs/supra-node-state/src',
      '@supraai/supra-i18n': '/libs/supra-i18n/src',
      '@supraai/supra-ui': '/libs/supra-ui/src',
      '@supraai/supra-artifacts': '/libs/supra-artifacts/src',
    },
  },
  esbuild: {
    supported: {
      'top-level-await': true,
      bigint: true,
    },
  },
});