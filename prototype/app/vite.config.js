import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react({
      // Enable emotion's css prop
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
      // Treat .js files as JSX so component files in .js work
      include: /\.(jsx|js|tsx|ts)$/,
    }),
  ],
  // GitHub Pages base path
  base: '/test/prototype/app/',
  resolve: {
    alias: {
      // FamilySearch server-side path — mock with empty JSON responses
      '/coalesced-locales/dist': path.resolve(__dirname, 'src/mocks/coalesced-locales'),
    },
  },
  define: {
    // Some FS packages check process.env
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@fs/zion-ui',
      'react-router-dom',
    ],
  },
  esbuild: {
    // Treat .js files as JSX so components in .js files work
    loader: 'jsx',
  },
})
