import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    brotliSize: false, // faster builds
    sourcemap: false, // enable for debugging
    outDir: "build",
  },
  plugins: [reactRefresh()]
})
