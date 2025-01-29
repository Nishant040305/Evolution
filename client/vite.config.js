import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import compression from 'vite-plugin-compression';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    compression({
      algorithm: 'gzip', // or 'gzip'
      threshold: 1024, // Compress files larger than 1KB
    }),
  ],
});
