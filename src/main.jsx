import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from "./context/CartContext";
import "@/styles/global.css"; 

// Mengambil elemen root dari HTML untuk tempat aplikasi akan dirender
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render aplikasi React dengan StrictMode dan CartProvider
root.render(
  <StrictMode>
    <CartProvider> {/* Menyediakan konteks cart untuk seluruh aplikasi */}
      <App />
    </CartProvider>
  </StrictMode>
);
