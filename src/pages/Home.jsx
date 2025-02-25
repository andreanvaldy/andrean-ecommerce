import React from "react";
import { Link } from "react-router-dom"; //Digunakan untuk navigasi tanpa reload halaman.
import "@/styles/global.css";

//struktur halaman
const Home = () => {
  return (
    <div>
      {/* Main Container */}
      <div className="container">
        
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Categories</h2>
          <ul>
          {[
  { icon: "fas fa-desktop", label: "Computer", path: "computer" }, 
  { icon: "fas fa-mobile-alt", label: "Smartphone", path: "smartphone" }, 
  { icon: "fas fa-headphones", label: "Accessories", path: "accessories" }
].map((item, index) => (
  <li key={index} className="sidebar-item">
    <i className={item.icon}></i> 
    <Link to={`/shop?category=${item.path}`} className="category-link">
      {item.label}
    </Link>
  </li>
))}

          </ul>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          {/* Main Banner */}
          <div className="main-banner">
            <div className="banner-text">
              <h2>Our Best</h2>
              <h1>IPHONE 6 PLUS</h1>
              <p>3D Touch, 12MP Photos, 4K Video, One Powerful Phone.</p>
            </div>
            <img
              src="https://storage.googleapis.com/a1aa/image/AFQ3DetFIfiGL0eTM05apgjf5MdeDoHfk7xWml6yYm79skyBF.jpg"
              alt="iPhone 6 Plus"
              className="banner-img"
            />
          </div>

          {/* Small Banners */}
          <div className="small-banners">
            {[ 
              {
                src: "https://storage.googleapis.com/a1aa/image/ofFK1pQ12ehqckhYNqV0zBDMGiEilQnaSVNr9UsoNbfwkUOoA.jpg",
                alt: "Fashion",
                category: "komputer"
              },
              {
                src: "https://storage.googleapis.com/a1aa/image/s3z0ka8A0yrsJlyXPPokpYM3njaZDRiXetOkH0al1tmXJlDKA.jpg",
                alt: "Smartphones",
                category: "smartphones"
              },
              {
                src: "https://storage.googleapis.com/a1aa/image/eSMEjmR2Wk0LFy48fTfiMbbo0GFeL7ChJYvABKfttsqZTS5gC.jpg",
                alt: "Tablet",
                category: "accesoris"
              }
            ].map((item, index) => (
              <div key={index} className="small-banners-item">
                <img src={item.src} alt={item.alt} className="small-banner-img"/>
                {/* Perubahan pada link See More untuk menambahkan query parameter kategori */}
                <Link to={`/shop?category=${item.category}`} className="btn">See More</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;


// Kode ini membuat halaman Home untuk eCommerce dengan fitur: ✅ Sidebar kategori dengan ikon.
// ✅ Banner utama produk unggulan.
// ✅ Banner kecil untuk kategori tambahan.
// ✅ Navigasi menggunakan query parameter ke halaman Shop.