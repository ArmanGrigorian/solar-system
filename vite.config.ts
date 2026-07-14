import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three-vendor';
            if (id.includes('lucide')) return 'lucide-vendor';
            if (id.includes('recharts')) return 'recharts-vendor';
            if (id.includes('framer-motion')) return 'framer-vendor';
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            if (id.includes('jspdf') || id.includes('html2canvas')) return 'pdf-vendor';
            if (id.includes('@ai-sdk') || id.includes('zod')) return 'ai-vendor';
            return 'vendor';
          }
        }
      }
    }
  }
})
