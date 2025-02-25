import { createContext, useState } from "react";


export const CartContext = createContext(); //CartContext adalah context global yang akan digunakan untuk menyimpan dan mengelola state keranjang belanja.

//meskipun berpindah produk dalam keranjang akan tetap ada
const getCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : []; // Jika ada data di localStorage, parsing JSON, jika tidak, gunakan array kosong
};


export function CartProvider({ children }) { //rtProvider adalah komponen pembungkus yang akan menyediakan state keranjang (cart) ke seluruh aplikasi
// { children } digunakan agar komponen lain dalam aplikasi bisa mengakses CartContext..
  const [cart, setCart] = useState([]); //cart adalah state yang menyimpan daftar produk dalam keranjang
  // setCart adalah fungsi untuk memperbarui state cart.
  // useState([]) menginisialisasi keranjang belanja dengan array kosong..

  // Hitung total jumlah barang dalam keranjang
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Hitung total harga barang dalam keranjang
  const totalAmount = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  

  //Menambahkan Produk ke Keranjang
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
    setCart([]);
    localStorage.removeItem("cart"); // Hapus cart dari localStorage saat dikosongkan
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
