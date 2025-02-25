import { defineConfig } from 'vite' //igunakan untuk mendefinisikan konfigurasi secara eksplisit.
import react from '@vitejs/plugin-react'
import path from 'path' //Digunakan untuk mengatur alias path, agar lebih mudah mengakses file di dalam proyek

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Alias untuk folder src
    },
  },
  css: {
    preprocessorOptions: {
      // Anda bisa menambahkan pengaturan CSS tambahan di sini jika diperlukan
    },
  },
})

//ile vite.config.js berfungsi untuk mengatur proyek React menggunakan Vite.
// Menggunakan plugin React resmi untuk mendukung JSX & Fast Refresh.
//  Menambahkan alias @ untuk folder src agar impor file lebih mudah.
//  Bisa diperluas dengan pengaturan CSS tambahan seperti SCSS atau LESS.
