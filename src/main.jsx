import React, { StrictMode } from 'react'; //StrictMode – Mode khusus yang membantu mendeteksi potensi masalah di React.
import { createRoot } from 'react-dom/client'; //Digunakan untuk merender aplikasi React ke dalam elemen HTML.
import App from './App.jsx';
import { CartProvider } from "./context/CartContext"; //Menyediakan konteks keranjang belanja (CartContext) agar bisa diakses oleh semua komponen
import "@/styles/global.css"; 

// Mengambil elemen root dari HTML untuk tempat aplikasi akan dirender
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
//Fungsi ini mengambil elemen div dengan id="root" di index.html sebagai tempat aplikasi React akan dirender.

// Render aplikasi React dengan StrictMode dan CartProvider Merender Aplikasi ke dalam Root
root.render(
  <StrictMode>
    <CartProvider> {/* Menyediakan konteks cart untuk seluruh aplikasi */}
      <App />
    </CartProvider>
  </StrictMode>
);

// main.jsx adalah entry point React yang merender aplikasi ke dalam index.html.
//  Menggunakan StrictMode untuk membantu mendeteksi error saat pengembangan.
//  CartProvider memungkinkan seluruh aplikasi mengakses data keranjang tanpa perlu mengirim prop manual.
//  Semua halaman di dalam App.jsx akan otomatis memiliki akses ke data dari CartContext.
