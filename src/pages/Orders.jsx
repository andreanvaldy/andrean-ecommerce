import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "@/styles/global.css";

function Orders() {
  const location = useLocation();
  const navigate = useNavigate();

  const cart = location.state?.cart || [];
  const newOrder = location.state?.newOrder || null;
  const [orders, setOrders] = useState([]);

  const handlePlaceOrder = async () => {
  const newOrder = {
    id: `ORD${Date.now()}`, // ID unik
    date: new Date().toISOString(), // Tanggal
    total: finalTotal, // Total harga
    status: "Pending", // Status pesanan
    items: finalCart, // Produk yang dipesan
  };

  try {
    // Kirim data order ke backend untuk disimpan di MongoDB
    const response = await axios.post("http://localhost:3000/api/Order", newOrder);
    console.log("Order berhasil disimpan ke database:", response.data);

    // Mengarahkan ke halaman Orders dengan membawa data order
    navigate("/orders", { state: { newOrder: response.data } });

    // Clear Cart setelah berhasil memesan
    clearCart();
  } catch (error) {
    console.error("Gagal menyimpan order ke database:", error);
  }
};



  // Fungsi untuk menyimpan order ke MongoDB
  const saveOrderToDatabase = async (order) => {
    try {
      const response = await axios.post("http://localhost:3000/api/orders", order);
      console.log("Order berhasil disimpan ke database:", response.data);
      return response.data; // Mengembalikan order yang disimpan
    } catch (error) {
      console.error("Gagal menyimpan order ke database:", error);
      return null;
    }
  };

  // Ambil orders dari localStorage & database saat pertama kali load
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/orders");
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error mengambil orders dari database:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Ambil data orders saat pertama kali render
  }, []);

  // Tambahkan newOrder ke database jika ada
  useEffect(() => {
    if (newOrder) {
      (async () => {
        try {
          const response = await axios.post("http://localhost:3000/api/orders", newOrder);
          setOrders((prevOrders) => [response.data, ...prevOrders]);
        } catch (error) {
          console.error("Gagal menyimpan order ke database:", error);
        }
      })();
    }
  }, [newOrder]);

  const handleReorder = (order) => {
    navigate("/checkout", { state: { product: order.items[0] } });
  };
 

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error("Gagal menghapus order dari database:", error);
    }
  };

  // Menggabungkan cart yang tidak ada di dalam orders (untuk menghindari duplikat)
  const filteredCart = cart.filter(item => 
    !orders.some(order => 
      order.items.some(orderItem => orderItem._id === item._id)
    )
  );

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>

      {filteredCart.length > 0 && (
        <div className="order-summary">
          <h3>Products Purchased:</h3>
          <ul className="order-list">
            {filteredCart.map((item, index) => (
              <li key={index} className="order-item">
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="order-image"
                />
                <div className="order-details">
                  <p className="order-name">{item.name}</p>
                  <p className="order-price">Rp {item.price?.toLocaleString("id-ID") || "0"}</p>
                  <p className="order-quantity">Quantity: {item.quantity}</p>
                  <button className="reorder-btn" onClick={() => handleReorder(item)}>Beli Lagi</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {filteredCart.length === 0 && <p>No products purchased yet.</p>}

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="order-history">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3 className="order-title">Order ID: {order.id}</h3>
              <p className="order-date">Tanggal: {new Date(order.date).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) || "Tidak diketahui"}</p>
              <p className="order-total"><strong>Total: Rp {order.total?.toLocaleString("id-ID") || "0"}</strong></p>
              <p className="order-status">Status: <strong>{order.status || "Pending"}</strong></p>

              <h4>Items:</h4>
              <ul className="order-items">
                {Array.isArray(order.items) ? order.items.map((item, index) => (
                  <li key={index} className="order-item">
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.name}
                      className="order-image"
                    />
                    <div className="order-details">
                      <p className="order-name">{item.name}</p>
                      <p className="order-price">Rp {item.price?.toLocaleString("id-ID") || "0"}</p>
                      <p className="order-quantity">Quantity: {item.quantity}</p>
                    </div>
                  </li>
                )) : <p>No items available.</p>}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = `
.orders-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.order-summary, .order-history {
  margin-top: 20px;
}

.order-list, .order-items {
  list-style: none;
  padding: 0;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.order-image {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 15px;
  object-fit: cover;
}

.order-details {
  flex-grow: 1;
}

.order-name {
  font-size: 16px;
  font-weight: bold;
}

.order-price, .order-quantity {
  font-size: 14px;
  color: #555;
}

.order-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-bottom: 15px;
}

.order-status {
  font-weight: bold;
  color: #27ae60;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Orders;
