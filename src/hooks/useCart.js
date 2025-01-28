import { useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState(() => {
    // Mengambil data keranjang dari localStorage jika ada
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Simpan ke localStorage
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Simpan ke localStorage
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // Hapus dari localStorage
  };

  const getTotalItems = () => {
    return cart.length;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return { cart, addToCart, removeFromCart, clearCart, getTotalItems, getTotalPrice };
};

export default useCart;
