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
            <Route path="/Home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
        <Footer /> {/* Footer muncul di semua halaman */}
      </Router>
    </CartProvider>
  );
}

export default App;
