import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('vuex')) return 'vendor-vue'
            if (id.includes('element-plus')) return 'vendor-ui'
            if (id.includes('leaflet')) return 'vendor-map'
            if (id.includes('echarts') || id.includes('zrender')) return 'vendor-chart'
            if (id.includes('gsap')) return 'vendor-anim'
          }
        }
      }
    },
    chunkSizeWarningLimit: 1500
  },
  optimizeDeps: {
    include: ['vue', 'vuex', 'element-plus', 'leaflet', 'echarts', 'gsap']
  }
})
