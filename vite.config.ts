import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Dev server proxy: forward API calls to backend running on 4001
  server: {
    proxy: {
      '/auth': { target: 'http://localhost:4001', changeOrigin: true },
      '/institution': { target: 'http://localhost:4001', changeOrigin: true },
      '/verify': { target: 'http://localhost:4001', changeOrigin: true },
      '/admin': { target: 'http://localhost:4001', changeOrigin: true },
      '/student': { target: 'http://localhost:4001', changeOrigin: true }
    }
  }
  ,
  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
