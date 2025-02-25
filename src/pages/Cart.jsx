import { useContext } from "react"; //Hook untuk mengakses CartContext, yang menyimpan state terkait keranjang belanja.
import { CartContext } from "../context/CartContext"; //Berisi data keranjang belanja (cart) dan fungsi untuk mengelola cart.
import { Link } from "react-router-dom"; //omponen dari react-router-dom untuk navigasi antar halaman.
import "@/styles/global.css";
import { useNavigate } from "react-router-dom";//Hook untuk berpindah halaman dengan navigate().
import { useLocation } from "react-router-dom";

// Mendefinisikan Komponen Cart
function Cart() {
  const { cart, removeFromCart, clearCart, totalAmount, setCart } = useContext(CartContext); //setCart: Fungsi untuk memperbarui state keranjang (tidak digunakan di kode ini). clearcrcart Fungsi untuk mengosongkan keranjang (tidak digunakan di kode ini).
  const navigate = useNavigate();
  const shippingCost = totalAmount > 0 ? 10000 : 0; // Simulasi biaya ongkir Rp 10.000 jika ada produk di keranjang

  //Menangani Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang Anda kosong! Tambahkan produk terlebih dahulu.");
    } else {
      navigate("/checkout");
    }
  };

  //Checkout Satu Produk
  const handleProductCheckout = (productId) => {
    const productToCheckout = cart.find((item) => item._id === productId);
    if (productToCheckout) {
      navigate("/checkout", { state: { product: productToCheckout } });
    }
  };

  //Format Harga ke Rupiah
  const formatPrice = (price) => {
    return price.toLocaleString("id-ID", {
      minimumFractionDigits: 0, // Tanpa desimal jika angkanya bulat
      maximumFractionDigits: 2, // Maksimal 2 desimal jika ada pecahan
    });
  };
  

  //Struktur Tampilan 
  return (
    <div style={styles.cartContainer}>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop">Go shopping</Link></p>
      ) : (
        <>
          <table style={styles.cartTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Product</th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}>Quantity</th>
                <th style={styles.tableHeader}>Subtotal</th>
                <th style={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td style={styles.productInfo}>
                    <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} style={styles.productImage} />
                    <span>{item.name}</span>
                  </td>
                  <td style={styles.priceColumn}>Rp {formatPrice(item.price)}</td>
                  <td style={styles.quantityColumn}>{item.quantity}</td>
                  <td style={styles.subtotalColumn}>Rp {formatPrice(item.price * item.quantity)}</td>
                  <td style={styles.actionColumn}>
                    <button onClick={() => handleProductCheckout(item._id)} style={styles.checkoutProductButton}>Checkout Product</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.cartSummary}>
            <h3>Cart Totals</h3>
            <p>Subtotal: <span>Rp {formatPrice(totalAmount)}</span></p>
<p>Shipping Cost: <span>Rp {formatPrice(shippingCost)}</span></p>
<p>Total: <strong>Rp {formatPrice(totalAmount + shippingCost)}</strong></p>
            <button style={styles.checkoutButton} onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  cartContainer: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
  },
  cartTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px"
  },
  tableHeader: {
    textAlign: "center",
    padding: "10px",
    fontWeight: "bold",
    backgroundColor: "#f1f1f1"
  },
  productInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textAlign: "left"
  },
  productImage: {
    width: "50px",
    height: "50px",
    borderRadius: "5px"
  },
  priceColumn: {
    textAlign: "center",
    padding: "10px",
    fontSize: "16px"
  },
  quantityColumn: {
    textAlign: "center",
    padding: "10px",
    fontSize: "16px"
  },
  subtotalColumn: {
    textAlign: "center",
    padding: "10px",
    fontSize: "16px"
  },
  actionColumn: {
    textAlign: "center",
    padding: "10px"
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px"
  },
  cartSummary: {
    textAlign: "right",
    fontSize: "16px",
    marginTop: "20px"
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  },
  checkoutProductButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
  }
};

export default Cart;

//Kode Cart.jsx ini sudah cukup lengkap, dengan fitur utama:

// Menampilkan produk dalam keranjang.
// Menghitung total belanja dan biaya pengiriman.
// Menyediakan checkout per produk atau keseluruhan.
// Menggunakan React Context API untuk menyimpan data keranjang.
// Masih ada beberapa fungsi yang bisa ditambahkan, seperti:
// ✅ Menghapus produk dari keranjang.
// ✅ Menambah/mengurangi jumlah produk.
