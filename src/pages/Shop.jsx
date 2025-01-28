import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "@/styles/global.css";


// Data produk statis


const Shop = () => {
  const [products, setProducts] = useState([]); // State untuk menyimpan data produk
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const { cart, addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  

  // Fetch data dari backend saat komponen pertama kali di-render
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search); 
    const category = searchParams.get('category'); // Ambil kategori dari query string
    console.log('Kategori yang dipilih:', category); // Log kategori
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading true sebelum fetch
        const response = await fetch("http://localhost:3000/api/product");
        if (!response.ok) {
          throw new Error("Gagal mengambil produk");
        }
        const data = await response.json();
        setProducts(data); // Simpan data produk

        // Filter produk berdasarkan kategori jika ada
        if (category) {
          const filtered = data.filter(product => product.category === category);
          setFilteredProducts(filtered); // Menyaring produk berdasarkan kategori
        } else {
          setFilteredProducts(data); // Menampilkan semua produk jika tidak ada kategori yang dipilih
        }
      } catch (err) {
        console.error("Error saat mengambil produk:", err.message);
        setError("Terjadi kesalahan saat memuat produk.");
      } finally {
        setLoading(false); // Set loading false setelah selesai fetch
      }
    };

    fetchProducts(); // Memanggil fungsi fetch untuk mendapatkan produk

  }, [location.search]); // Menambahkan location.search sebagai dependensi agar react memantau perubahan kategori


  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleAddToCart = (productId) => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      addToCart(product); // Tambahkan produk ke keranjang
      navigate("/cart");  // Arahkan ke halaman Cart setelah menambahkan produk
    }
  };

  const handleBuyNow = (productId) => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      console.log("Produk yang dikirim ke Checkout:", product); // Debug log
  
      navigate("/checkout", { 
        state: { 
          product: { 
            ...product, 
            price: Number(product.price),  // Pastikan harga dalam angka
            quantity: 1 
          } 
        } 
      });
    }
  };
  
  const handleBuyClick = () => {
    navigate("/Checkout"); // Pindah ke halaman checkout
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang Anda kosong! Tambahkan produk terlebih dahulu.");
    } else {
      navigate("/orders", { state: { cart } }); // Kirim data cart ke halaman orders
      clearCart(); // Bersihkan keranjang setelah checkout
    }
  };

  return (
    <div className="shop-container">
  <h1>Shop</h1>

  <div className="search-container">
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Cari produk..."
      className="search-input"
    />
  </div>

  {error && <p style={{ color: "red" }}>{error}</p>}
  {loading ? (
    <p>Loading products...</p>
  ) : (
    <div className="product-list">
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(({ _id, name, price, image }) => (
            <div key={_id} className="product-card">
              <img
                src={image || "/images/default.jpg"}
                alt={name}
                className="product-image"
              />
              <h2>{name}</h2>
              <p>Rp {price.toLocaleString()}</p>
              <button
                className="add-to-cart-btn styled-button"
                onClick={() => handleAddToCart(_id)} // Gunakan handleAddToCart yang sudah diperbaiki
              >
                Add to Cart
              </button>

              <button
                className="buy-now-btn styled-button yellow"
                onClick={() => handleBuyNow(_id)}
              >
                Beli
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )}

  <div className="checkout-container">
    <button className="checkout-btn" onClick={() => navigate("/checkout")}>
      Checkout ({cart.length} Items)
    </button>
  </div>
</div>

  );
};

export default Shop;
