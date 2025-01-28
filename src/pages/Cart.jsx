import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "@/styles/global.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart, totalAmount, setCart } = useContext(CartContext); // Pastikan `setCart` ada di context
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang Anda kosong! Tambahkan produk terlebih dahulu.");
    } else {
      navigate("/checkout");
    }
  };


  const handleProductCheckout = (productId) => {
    const productToCheckout = cart.find(item => item._id === productId);
    if (productToCheckout) {
      // Arahkan ke halaman checkout dengan produk yang dipilih
      navigate("/checkout", { state: { product: productToCheckout } });
    }
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        // Jika produk sudah ada di keranjang, tingkatkan jumlahnya
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Jika produk belum ada di keranjang, tambahkan produk baru dengan jumlah 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  const handleIncrease = (productId) => {
    setCart((prevCart) => {
      console.log("Before increase:", prevCart); // Debug log sebelum perubahan
      const updatedCart = prevCart.map((item) => {
        if (item._id === productId) {
          console.log("Increasing quantity for product", item); // Debug log untuk item yang diubah
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
  
      console.log("After increase:", updatedCart); // Debug log setelah perubahan
      return updatedCart;
    });
  };
  
  const handleDecrease = (productId) => {
    setCart((prevCart) => {
      console.log("Before decrease:", prevCart); // Debug log sebelum perubahan
      const updatedCart = prevCart.map((item) => {
        if (item._id === productId && item.quantity > 1) {
          console.log("Decreasing quantity for product", item); // Debug log untuk item yang diubah
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
  
      console.log("After decrease:", updatedCart); // Debug log setelah perubahan
      return updatedCart;
    });
  };
  

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
                <th style={styles.tableHeader}>Action</th> {/* Kolom tambahan untuk aksi checkout produk */}
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td style={styles.productInfo}>
                    <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} style={styles.productImage} />
                    <span>{item.name}</span>
                  </td>
                  <td style={styles.priceColumn}>Rp {item.price.toFixed(2)}</td>
                  <td style={styles.quantityColumn}>
                    <div style={styles.quantityControl}>
                    
                      <span>{item.quantity}</span>
                   
                    </div>
                  </td>
                  <td style={styles.subtotalColumn}>Rp {(item.price * item.quantity).toFixed(2)}</td>
                  <td style={styles.actionColumn}>
                    {/* Tombol checkout untuk setiap produk */}
                    <button onClick={() => handleProductCheckout(item._id)} style={styles.checkoutProductButton}>Checkout Product</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.cartSummary}>
            <h3>Cart totals</h3>
            <p>Subtotal: <span>RP{totalAmount.toFixed(2)}</span></p>
            <p>Shipping: <span>Flat rate: RP1000</span></p>
            <p>Total: <strong>Rp{(totalAmount + 10).toFixed(2)}</strong></p>
            <button style={styles.checkoutButton} onClick={handleCheckout}>Proceed to checkout</button>
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
