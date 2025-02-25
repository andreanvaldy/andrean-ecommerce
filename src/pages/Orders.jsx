import { useLocation, useNavigate } from "react-router-dom";//useLocation → Mendapatkan data dari navigasi sebelumnya, seperti state yang dikirim dari halaman Checkout.
//useNavigate → Mengarahkan pengguna ke halaman lain setelah melakukan suatu aksi.
import { useState, useEffect, useContext } from "react";//Hooks dari React untuk mengelola state, efek samping, dan akses ke CartContext.
import axios from "axios"; //Digunakan untuk melakukan request ke backend (API)..
import { CartContext } from "@/context/CartContext"; //Menggunakan konteks global untuk mendapatkan dan mengelola data keranjang (clearCart untuk menghapus isi keranjang).
import "@/styles/global.css";

function Orders() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const cart = location.state?.cart || []; //Mengambil data produk yang dikirim dari halaman Checkout. Jika tidak ada, maka cart akan berupa array kosong.
  const newOrder = location.state?.newOrder || null; //Mengambil data pesanan baru yang dikirim dari halaman sebelumnya.
  const [orders, setOrders] = useState([]); //Menyimpan daftar pesanan yang sudah dibuat.
  const shippingCost = 10000; // Biaya ongkir tetap Rp 10.000

  //State untuk Alamat Pengiriman
  const [form, setForm] = useState({
    address: '',
  });
  
  // const handleFormChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // Fungsi untuk Membuat Order Baru
  const handlePlaceOrder = async () => {
    const finalTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + shippingCost;
    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString(),
      total: finalTotal,
      address: form.address,  // Mengambil alamat dari form
      shippingCost: shippingCost, // Kirim ongkir ke backend
      status: "Pending",
      items: cart,
    };

   

  try {
    // Kirim data order ke backend untuk disimpan di MongoDB
    const response = await axios.post("http://localhost:3000/api/orders", newOrder);
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
  // const saveOrderToDatabase = async (order) => {
  //   try {
  //     const orderData = {
  //       id: "ORD1738730436126",
  //       date: new Date().toISOString(),
  //       total: 34990,
  //       shippingCost: 10000,
  //       address: "ddfefef",
  //       status: "Pending",
  //       items: orderItems, // Pastikan orderItems sudah terisi dan terstruktur dengan benar
  //     };
  //     const response = await axios.post("http://localhost:3000/api/orders", orderData);
  //     console.log("Order berhasil disimpan", response.data);
  //   } catch (error) {
  //     console.error("Gagal menyimpan order ke database:", error);
  //   }
  // };

  // Ambil orders dari database saat pertama kali load
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/orders");
      console.log("Data orders dari backend:", response.data); // Debugging
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error mengambil orders dari database:", error);
    }
  };

  // Ambil data orders saat halaman pertama kali dimuat
  useEffect(() => {
    fetchOrders();
  }, []);

  // Pastikan newOrder disimpan ke backend sebelum ditampilkan
  useEffect(() => {
    if (newOrder) {
      console.log("New Order yang masuk:", newOrder); // Debugging
      (async () => {
        try {
          const response = await axios.post("http://localhost:3000/api/orders", newOrder);
          console.log("Order berhasil disimpan ke database:", response.data); // Debugging
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
 

  // const handleDeleteOrder = async (orderId) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
  //     setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
  //   } catch (error) {
  //     console.error("Gagal menghapus order dari database:", error);
  //   }
  // };

  // Menggabungkan cart yang tidak ada di dalam orders (untuk menghindari duplikat)
  const filteredCart = cart.filter(item => 
    !orders.some(order => 
      order.items.some(orderItem => orderItem._id === item._id)
    )
  );

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
  
      {orders && orders.length > 0 ? (
        <div className="order-history">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3 className="order-title">Order ID: {order._id}</h3>
              <p className="order-date">
                Tanggal: {new Date(order.date).toLocaleDateString("id-ID")}
              </p>
              <p className="order-total">
                <strong>Total: Rp {order.total?.toLocaleString("id-ID")}</strong>
              </p>
              <p className="order-status">
                Status: <strong>{order.status}</strong>
              </p>
              <p className="order-address">
                Alamat: {order.address || "Alamat tidak tersedia"}
              </p>
  
              <h4>Items:</h4>
              <ul className="order-items">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <li key={index} className="order-item">
                      <img
                        src={item.image || "https://via.placeholder.com/100"}
                        alt={item.name}
                        className="order-image"
                      />
                      <div className="order-details">
                        <p className="order-name">{item.name}</p>
                        <p className="order-price">
                          Rp {item.price?.toLocaleString("id-ID")}
                        </p>
                        <p className="order-quantity">Quantity: {item.quantity}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No items found.</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
  
}

//Jika ada orders, maka daftar order akan ditampilkan.
// Setiap order menampilkan:
// ID Order
// Tanggal
// Total harga
// Status
// Alamat pengiriman
// Daftar item dalam order


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
