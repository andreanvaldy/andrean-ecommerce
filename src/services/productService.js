// Mengambil semua produk dari API
// Mengambil daftar produk
export const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products"); // Sesuaikan URL sesuai API Anda
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};

// Mengambil detail produk berdasarkan ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`); // Menggunakan template string
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    throw error;
  }
};

// Menambahkan produk ke keranjang
export const addProductToCart = async (productId, quantity) => {
  try {
    const response = await fetch("http://localhost:3000/cart", { // URL dalam string biasa
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to add product to cart");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    throw error;
  }
};

// Memperbarui jumlah produk dalam keranjang
export const updateProductInCart = async (cartItemId, quantity) => {
  try {
    const response = await fetch(`http://localhost:3000/cart/${cartItemId}`, { // Menggunakan template string
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      throw new Error("Failed to update product quantity in cart");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating product in cart:", error.message);
    throw error;
  }
};

// Menghapus produk dari keranjang
export const removeProductFromCart = async (cartItemId) => {
  try {
    const response = await fetch(`http://localhost:3000/cart/${cartItemId}`, { // Menggunakan template string
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to remove product from cart");
    }
    return await response.json();
  } catch (error) {
    console.error("Error removing product from cart:", error.message);
    throw error;
  }
};
