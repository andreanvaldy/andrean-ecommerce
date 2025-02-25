import { useNavigate } from "react-router-dom"; //Hook dari react-router-dom untuk melakukan navigasi antar halaman.
import { Link } from "react-router-dom"; //Komponen bawaan dari react-router-dom untuk navigasi tanpa reload halaman.

function Navbar() {
  const navigate = useNavigate();  // Hook untuk navigasi
  const handleSearch = (event) => {
    event.preventDefault(); //Mencegah form melakukan reload halaman setelah dikirim.
    const query = event.target.search.value;
    console.log("Pencarian:", query); // Ganti dengan logika pencarian
    
    // Mencari produk yang sesuai dengan query
    const product = staticProducts.find((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    if (product) {
      // Jika produk ditemukan, arahkan ke halaman produk tersebut
      navigate(`/product/${product.id}`);
    } else {
      alert("Produk tidak ditemukan!"); // Jika produk tidak ditemukan
    }

    event.target.reset(); // Reset input pencarian
  };

  //logout lalu ke login
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/Login");
  };

  //Mengecek Status Login
  const isLoggedIn = localStorage.getItem("authToken");


  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>Andrean Store</h1>
      <form style={styles.searchForm} onSubmit={handleSearch}>
        
      </form>
      <ul style={styles.navLinks}>
        <li><Link to="/Home" style={styles.link}>Home</Link></li>
        <li><Link to="/shop" style={styles.link}>Shop</Link></li>
        <li><Link to="/cart" style={styles.link}>Cart</Link></li>
        <li><Link to="/orders" style={styles.link}>Orders</Link></li>
        {isLoggedIn ? (
          <Link to="/Login" style={styles.link} onClick={handleLogout}>Logout</Link>
        ) : (
          <li><Link to="/Login" style={styles.link}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#789",
    color: "#fff",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    cursor: "pointer",
    background: "none",  // Tambahkan ini
    border: "none",       // Hilangkan border tombol
    fontSize: "16px",     // Samakan dengan teks lainnya
    padding: "0",         // Hindari padding bawaan button
  },
};
export default Navbar;
