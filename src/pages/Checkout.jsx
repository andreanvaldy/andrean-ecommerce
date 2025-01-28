import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";



function Checkout() {
  const { cart, totalAmount, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  
  
  const product = location.state?.product; // Ambil produk dari state
  const selectedProduct = location.state?.product;

  const itemsToCheckout = selectedProduct ? [{ ...selectedProduct, quantity: 1 }] : cart;
  const finalTotal = itemsToCheckout.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);

  console.log("Produk dari state location:", selectedProduct); // Debug log
  console.log("Items to checkout:", itemsToCheckout);


  const handlePlaceOrder = async () => {
    const newOrder = {
      id: `ORD${Date.now()}`, // ID unik
      date: new Date().toISOString(), // Tanggal
      total: finalTotal, // Total harga
      status: "Pending", // Status pesanan
      items: itemsToCheckout, // Pastikan daftar item dikirim
    };
  
    try {
      // Kirim data order ke backend untuk disimpan di MongoDB
      const response = await axios.post("http://localhost:3000/api/Orders", newOrder);
      console.log("Order berhasil disimpan ke database:", response.data);
  
      // Mengarahkan ke halaman Orders dengan membawa data order
      navigate("/orders", { state: { newOrder: response.data } });
  
      // Clear Cart setelah berhasil memesan
      clearCart();
    } catch (error) {
      console.error("Gagal menyimpan order ke database:", error);
    }
  };
  
  
  // ✅ Pastikan productFromShop dideklarasikan dengan aman
  const productFromShop = location.state?.product || null;

  console.log("Product from Shop:", productFromShop); // Debugging

  console.log("Product received in Checkout:", productFromShop); // Debugging
console.log("Cart in Checkout:", cart); // Debugging
  // ✅ Pastikan cart tidak kosong saat checkout
  
  const finalCart = productFromShop 
  ? [{ ...productFromShop, quantity: productFromShop.quantity || 1 }] 
  : Array.from(new Map(cart.map(item => [item.id, { ...item, quantity: item.quantity || 1 }])).values());

// ✅ Pastikan setiap item memiliki quantity saat menghitung total


console.log("Items to checkout:", itemsToCheckout); // Debug log
  

  const items = product ? [{ ...product, price: Number(product.price) }] : cart.map(item => ({ ...item, price: Number(item.price) }));

  
  console.log("Final Cart:", finalCart);
  console.log("Total Amount:", totalAmount);

  if (!productFromShop && cart.length === 0) {
    return (
      <h2>
        Tidak ada produk untuk checkout. <Link to="/shop">Kembali ke toko</Link>
      </h2>
    );
  }

  

  

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit-card",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.address) {
      alert("Please fill in all required fields.");
      return;
    }
          
    const newOrder = {
      id: `ORD${Date.now()}`, // ID unik
      date: new Date().toISOString().split("T")[0], // Tanggal hari ini
      total: totalAmount, // Total harga
      status: "Pending", // Status pesanan
      items: finalCart, // Produk yang dipesan
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
const updatedOrders = [...existingOrders, newOrder];
localStorage.setItem("orders", JSON.stringify(updatedOrders));

    console.log("Navigating with newOrder:", newOrder);
    alert(`Order placed successfully for ${form.name}!`);
    // Pastikan clearCart() dipanggil hanya setelah order berhasil
    clearCart();
    navigate("/orders", { state: { newOrder } }); // Arahkan ke Orders dengan data pesanan
  };

  

  return (
    <div style={styles.container}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          style={styles.input}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          style={styles.input}
        />

        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter your address"
          required
          style={styles.textarea}
        />

        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>

        <h2>Total: Rp {totalAmount.toLocaleString()}</h2>

        <button type="submit" style={styles.button} aria-label="Place your order">
          Place Order
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    resize: "vertical",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
};

styles.button[':hover'] = {
  backgroundColor: "#218838",
};

export default Checkout;