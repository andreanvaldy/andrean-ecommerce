import { useContext, useState } from "react"; //useContext → Menggunakan data dari CartContext untuk mengambil isi keranjang belanja
// useState → Mengelola state dalam komponen untuk menyimpan data checkout..
import { CartContext } from "../context/CartContext"; //Context yang menyimpan daftar produk dalam keranjang (cart).
import { useNavigate, useLocation, Link } from "react-router-dom"; //useNavigate → Untuk mengarahkan pengguna ke halaman lain setelah checkout
// useLocation → Untuk mendapatkan data yang dikirim dari halaman sebelumnya.
// Link → Untuk navigasi antar halaman tanpa reload..
import axios from "axios"; //Untuk mengirim data pesanan (order) ke backend melalui API.

function Checkout() {
  const { cart, clearCart } = useContext(CartContext); //cart → Daftar produk dalam keranjang belanja
  // clearCart → Fungsi untuk mengosongkan keranjang setelah checkout..
  const navigate = useNavigate(); //Untuk berpindah halaman setelah checkout.
  const location = useLocation(); //Untuk menangkap data produk yang dikirim dari halaman sebelumnya.

  //. Menentukan Produk yang Akan di Checkout
  const selectedProduct = location.state?.product; //Jika pengguna checkout langsung dari halaman produk, maka hanya satu produk yang diproses
  const itemsToCheckout = selectedProduct
    ? [{ ...selectedProduct, price: Number(selectedProduct.price), quantity: 1 }]
    : cart.map(item => ({ ...item, price: Number(item.price), quantity: item.quantity || 1 }));

    //Menghitung Total Harga
  const subtotal = itemsToCheckout.reduce((sum, item) => sum + item.price * item.quantity, 0);//Menggunakan reduce() untuk menjumlahkan harga total semua produk di keranjang.
  
  //Menentukan Ongkos Kirim
  const [shippingCost, setShippingCost] = useState(10000); //shippingCost (default 10000) sebagai biaya pengiriman awal.
  const totalWithShipping = subtotal + shippingCost; //totalWithShipping menghitung total pesanan termasuk ongkos kirim.

  const shippingOptions = [
    { id: "standard", name: "Standard (Rp10.000)", cost: 10000 },
    { id: "express", name: "Express (Rp25.000)", cost: 25000 },
  ];

  const handleShippingChange = (event) => {
    const selectedOption = shippingOptions.find(opt => opt.id === event.target.value);
    setShippingCost(selectedOption ? selectedOption.cost : 10000);
  };

  //Mengelola Form Checkout
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit-card",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Mengirim Pesanan ke Backend
  const handleSubmit = async (e) => { 
    e.preventDefault();
    console.log("Tombol Place Order diklik!"); 

    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      alert("Harap isi semua bidang yang diperlukan.");
      return;
    }

    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString(),
      total: totalWithShipping,
      shippingCost: shippingCost,
      address: form.address,
      status: "Pending",
      items: itemsToCheckout.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
      })),
      customer: form.name,  // Mengirimkan nama sebagai customer
      email: form.email,    // Mengirimkan email
  };
  
  console.log("data yang dikirim ke backend:", newOrder);
    try {
      const response = await axios.post("http://localhost:3000/api/orders", newOrder); //Menggunakan axios.post() untuk mengirim pesanan ke backend (http://localhost:3000/api/orders).
      console.log("Order berhasil disimpan ke database:", response.data);
      navigate("/orders", { state: { newOrder: response.data } });

      if (clearCart) clearCart();
    } catch (error) {
      console.error("Gagal menyimpan order ke database:", error.response?.data || error.message);
    }
  };

  //Menampilkan Pesan Jika Tidak Ada Produk
  if (!selectedProduct && cart.length === 0) {
    return (
      <h2>
        Tidak ada produk untuk checkout. <Link to="/shop">Kembali ke toko</Link>
      </h2>
    );
  }

  

  return (
    // Tampilan Form Checkout
    <div style={styles.container}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="name">Nama:</label>
        <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required style={styles.input} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required style={styles.input} />

        <label htmlFor="address">Alamat:</label>
        <textarea id="address" name="address" value={form.address} onChange={handleChange} required style={styles.textarea} />

        <label htmlFor="shipping">Metode Pengiriman:</label>
        <select id="shipping" onChange={handleShippingChange} style={styles.select}>
          {shippingOptions.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>

        <label htmlFor="paymentMethod">Metode Pembayaran:</label>
        <select id="paymentMethod" name="paymentMethod" value={form.paymentMethod} onChange={handleChange} style={styles.select}>
          <option value="credit-card">Kartu Kredit</option>
          <option value="paypal">PayPal</option>
          <option value="bank-transfer">Transfer Bank</option>
        </select>

        <h3>Subtotal: Rp {subtotal.toLocaleString()}</h3>
        <h3>Ongkos Kirim: Rp {shippingCost.toLocaleString()}</h3>
        <h2>Total: Rp {totalWithShipping.toLocaleString()}</h2>

        <button type="submit" style={styles.button} aria-label="Place your order">
          Checkout
        </button>
      </form>
    </div>
  );
}

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
    marginTop: "15px",  // Tambahkan margin atas biar gak nempel ke total harga
    marginBottom: "30px",  // Tambahkan margin bawah biar ada jarak di bawah tombol
  },
};

export default Checkout;
