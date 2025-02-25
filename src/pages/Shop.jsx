import { useState, useEffect, useContext } from "react"; //Hook untuk state management & efek samping.useContext → Hook untuk menggunakan CartContext, yang menyimpan data keranjang belanja.
import { CartContext } from "../context/CartContext"; //Context yang digunakan untuk mengakses fungsi keranjang belanja (addToCart, clearCart, dll.).
import { Link, useNavigate } from "react-router-dom"; //Navigasi antar halaman
import "@/styles/global.css";
import { useLocation } from "react-router-dom"; //Mengambil query parameter dari URL (misalnya, kategori produk).


// Data produk statis


const Shop = () => {
  const [products, setProducts] = useState([]); // State untuk menyimpan data produk dari backend
  const [filteredProducts, setFilteredProducts] = useState([]); //Menyimpan produk yang difilter berdasarkan pencarian.
  const [searchQuery, setSearchQuery] = useState(""); //Menyimpan input pencarian.
  const [error, setError] = useState(""); //Menyimpan pesan error jika gagal mengambil data.
  const [loading, setLoading] = useState(true); // Loading state  Indikator loading saat mengambil data.
  const { cart, addToCart, clearCart } = useContext(CartContext); //Mengambil fungsi & data dari CartContext.
  const navigate = useNavigate(); //Untuk berpindah halaman (checkout, detail produk, dll.).
  const location = useLocation(); //Mengambil kategori dari URL (/shop?category=elektronik).
  const [category, setCategory] = useState(""); //Menyimpan kategori yang dipilih.



  

  // Menjalankan fungsi saat halaman pertama kali dimuat atau kategori berubah.dan ini Mengambil Data Produk dari Backend
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search); //Mengambil parameter category dari URL.
    const categoryFromURL = searchParams.get("category") || "";
    console.log("Kategori dari URL:", categoryFromURL); // Log kategori sebelum fetch
    setCategory(categoryFromURL); // Set kategori dari URL
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/product?category=${categoryFromURL}`);
        console.log("Fetching URL:", response.url); // Log URL untuk memastikan format benar
        if (!response.ok) {
          throw new Error("Gagal mengambil produk");
        }
        const data = await response.json();
        console.log("Data produk dari backend:", data); // Log data dari backend
        setProducts(data); //Menyimpan produk ke state.
        setFilteredProducts(data); //Menyimpan data yang bisa difilter berdasarkan pencarian.
      } catch (err) {
        setError("Terjadi kesalahan saat memuat produk.");
      } finally {
        setLoading(false); //Menonaktifkan loading setelah data dimuat.
      }
    };
    console.log('Kategori yang diperbarui:', category);
    fetchProducts(); //Mengambil data produk dari backend berdasarkan kategori.
  }, [location.search]);

  //diatas ini 
  //  Mengambil kategori dari URL menggunakan URLSearchParams.
// Menyimpan kategori ke dalam state category.
// Melakukan fetching data produk dari backend berdasarkan kategori.
// Menyimpan data yang diperoleh ke dalam state products dan filteredProducts.
// Jika terjadi error, state error akan diubah agar pesan error bisa ditampilkan.
// loading diatur true saat fetching data dan false setelah selesai.


//Menangani Perubahan Kategori
// Fungsi ini mengubah kategori dan memperbarui URL menggunakan navigate().
// Saat pengguna memilih kategori, URL diperbarui agar fetching data produk sesuai kategori.
  const handleCategoryChange = (newCategory) => {  
    setCategory(newCategory); // 
    console.log('Kategori yang dipilih :', newCategory);
    navigate(`/shop?category=${newCategory}`); // Update URL
    console.log('Kategori yang disimpan di state:', category); // menampilkan console category
   
  };

  //Filter Produk Berdasarkan Pencarian Jika pengguna
  //  mengetik di input pencarian, produk akan difilter berdasarkan nama produk yang mengandung kata kunci tersebut.
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(lowerCaseQuery)));
  }, [searchQuery, products]);

  // Menangani Perubahan Input Pencarian 
  //Fungsi ini memperbarui searchQuery sesuai input yang diketik pengguna.
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  //Menambahkan Produk ke Keranjang
//   Mencari produk berdasarkan productId.
// Jika ditemukan, produk ditambahkan ke cart menggunakan addToCart.
// Setelah itu, pengguna diarahkan ke halaman keranjang (/cart).
  const handleAddToCart = (productId) => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      addToCart(product); // Tambahkan produk ke keranjang
      navigate("/cart");  // mengarah ke halaman cart setelah memasukkan keranjang 
    } //mengarah ke halaman orders
  };

  //Membeli Produk Langsung
//   Mencari produk berdasarkan productId.
// Jika ditemukan, pengguna diarahkan ke halaman /checkout dengan membawa data produk.
  const handleBuyNow = (productId) => {
  const product = products.find((item) => item._id === productId);
  if (product) {
    navigate("/checkout", {
      state: { 
        product: { 
          ...product, 
          price: Number(product.price.toString().replace(/\D/g, "")),  // Pastikan harga menjadi angka
          quantity: 1 
        } 
      } 
    });
  }
};

  
  
  //ini tidak digunakan jadi tidak berguna
  // const handleBuyClick = () => {
  //   navigate("/Checkout"); // Pindah ke halaman checkout
  // };

  //Menangani Checkout
//   Jika keranjang kosong, tampilkan peringatan.
// Jika ada produk, pengguna diarahkan ke halaman /orders dan keranjang dikosongkan setelah checkout.
  const handleCheckout = () => {
    console.log('Checkout button clicked'); // Log untuk memastikan tombol di-klik
    if (cart.length === 0) {
      alert("Keranjang Anda kosong! Tambahkan produk terlebih dahulu.");
    } else {
      navigate("/orders", { state: { cart } }); // Kirim data cart ke halaman orders
      clearCart(); // Bersihkan keranjang setelah checkout
    }
  };

  return (
    <div className="shop-container">
      <style>{`
        .shop-container {
          max-width: 1200px;
          margin: auto;
          padding: 20px;
          text-align: center;
          background-color: #f8f8f8;
        }
        .search-container {
          margin-bottom: 20px;
        }
        .search-input {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          padding: 20px;
          justify-content: center;
        }
        .product-card {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 20px;
          background: #fff;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
          width: 100%;
        }
        .product-card:hover {
          transform: scale(1.05);
        }
        .product-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 10px;
        }
        .styled-button {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .add-to-cart-btn {
          background-color: #28a745;
          color: white;
        }
        .buy-now-btn {
          background-color: #ffc107;
          color: black;
        }
        .checkout-container {
          margin-top: 30px;
        }
        .checkout-btn {
          padding: 15px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 18px;
        }

        .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }

  .product-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    min-height: 400px; /* Menyamakan tinggi kartu */
  }

  .product-image {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
  }

  .product-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 80px; /* Memastikan teks sejajar */
  }

  .product-actions {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
  }

  .styled-button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }

  .add-to-cart-btn {
    background-color: green;
    color: white;
  }

  .buy-now-btn {
    background-color: orange;
    color: white;
  }
      `}</style>
      <h1>Shop</h1>
      <div className="search-container">
        {/* Input pencarian */}
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Cari produk..."
          className="search-input"
        />

      {/* Menampilkan status loading atau error */}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
            {/* Menampilkan produk dalam bentuk kartu */}
          {filteredProducts.map(({ _id, name, price, image }) => (
            <div key={_id} className="product-card">
              <img src={image || "/images/default.jpg"} alt={name} className="product-image" />
              <h2>{name}</h2>
              <p>Rp {price.toLocaleString()}</p>
              <button className="styled-button add-to-cart-btn" onClick={() => handleAddToCart(_id)}>
                Add to Cart
              </button>
              <button className="styled-button buy-now-btn" onClick={() => handleBuyNow(_id)}>
                Beli
              </button>
            </div>
          ))}
        </div>
      )}
       {/* Tombol Checkout */}
      <div className="checkout-container">
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          Checkout ({cart.length} Items)
        </button>
      </div>
    </div>
  );
};
// diatas ini render tampilan ya

export default Shop;
