import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@global': path.resolve(__dirname, 'src/global'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      input: 'index.html',
      output: {
        manualChunks: {
          react: [
            'react',
            'react-dom',
            '@emotion/react',
            'react-barcode',
            'react-bootstrap',
            'react-helmet-async',
            'react-notifications',
            'react-router-dom',
            '@react-google-maps/api'
          ],
          redux: [
            'redux',
            'redux-persist',
            'redux-persist-transform-encrypt',
            '@reduxjs/toolkit',
            'react-redux'
          ],
          mui: [
            '@mui/icons-material',
            '@mui/material',
            '@mui/x-date-pickers'
          ],
          util: [
            'moment',
            'date-fns',
            'path',
            'url'
          ],
          api: [
            '@tanstack/react-query',
            'axios'
          ],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        quietDeps: true,
        api: 'modern-compiler'
      },
      scss: {
        quietDeps: true,
        api: 'modern-compiler'
      },
    },
  },
  optimizeDeps: {
    include: ['date-fns/locale']
  },
})
