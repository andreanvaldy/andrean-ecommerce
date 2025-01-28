import { createContext, useState } from "react";


export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Hitung total jumlah barang dalam keranjang
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Hitung total harga barang dalam keranjang
  const totalAmount = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, price: Number(product.price) }];
      }
    });
  };

  // Cek apakah cart benar-benar diperbarui
  console.log("Cart Data:", cart);
  console.log("Total Amount Updated:", totalAmount);
  
  // Hapus produk dari keranjang
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId)); // Pastikan '_id' digunakan
  };

  // Perbarui jumlah produk di keranjang
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId); // Hapus produk jika jumlahnya kurang dari atau sama dengan nol
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === productId ? { ...item, quantity } : item // Memperbarui quantity produk
        )
      );
    }
  };

  // Kosongkan seluruh keranjang
  const clearCart = () => {
    setCart([]); // Menghapus semua item dari keranjang
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>

    
  );
}
