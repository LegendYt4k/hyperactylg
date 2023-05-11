import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.jsx'),
      output: {
        format: 'es',
        entryFileNames: 'bundle.js',
        chunkFileNames: '[hash].js',
        assetFileNames: '[name].[ext]',
      },
    },
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
  },
});
