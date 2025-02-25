import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import "@/styles/global.css"; // Pastikan file ini ada di lokasi yang tepat



// Import CartProvider untuk menyediakan konteks cart
import { CartProvider } from "./context/CartContext"; 

function App() {
  return (
    <CartProvider> {/* Membungkus seluruh aplikasi dengan CartProvider */}
      <Router>
        <Navbar /> {/* Navbar muncul di semua halaman */}
        <div className="main-content"> {/* Pembungkus konten utama */}
          <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

            {/* Lindungi halaman Checkout dan Orders */}
  {/* <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
  <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} /> */}
          </Routes>
        </div>
        <Footer /> {/* Footer muncul di semua halaman */}
      </Router>
    </CartProvider>
  );
}

export default App;

//App.jsx adalah pusat aplikasi React yang menangani routing, context provider, serta menampilkan Navbar dan Footer di setiap halaman.
// Semua halaman diatur menggunakan Routes dan Route dari react-router-dom.
// CartProvider digunakan agar state keranjang belanja bisa diakses di seluruh aplikasi.
// Navigasi dilakukan dengan Router, dan halaman yang aktif ditampilkan di dalam Routes.