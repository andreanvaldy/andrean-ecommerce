import { useParams } from "react-router-dom"; //Hook dari react-router-dom untuk mendapatkan parameter id dari URL (misalnya /product/1).
import { useState, useEffect } from "react"; //useState → Hook dari React untuk menyimpan data produk, status loading, dan error.
//seEffect → Hook yang digunakan untuk menjalankan efek samping, seperti mengambil data produk saat komponen pertama kali dimuat.
import "@/styles/global.css";

//Inisialisasi Komponen ProductDetail
const ProductDetail = () => {
  const { id } = useParams(); //Mengambil id produk dari URL, misalnya jika URL adalah /product/2, maka id = 2.
  const [product, setProduct] = useState(null); //product menyimpan data produk yang diambil dari API.
  const [loading, setLoading] = useState(true); // menyimpan status apakah data masih dalam proses pengambilan.
  const [error, setError] = useState(null); //menyimpan pesan error jika terjadi kesalahan saat mengambil data.

  //Mengambil Data Produk saat Komponen Dimuat
  useEffect(() => { // Efek ini akan dijalankan setiap kali id berubah.
    const fetchProduct = async () => { //Fungsi yang digunakan untuk mengambil data produk berdasarkan id.
      try {
        // Simulate API call with sample data (replace with actual API call)
        // const data = {
        //   1: { id: 1, name: "Laptop Gaming", price: 15000000, image: "/images/laptop.jpg", description: "Laptop gaming dengan spesifikasi tinggi." },
        //   2: { id: 2, name: "Smartphone 5G", price: 8000000, image: "/images/smartphone.jpg", description: "Smartphone dengan teknologi jaringan 5G." },
        //   3: { id: 3, name: "Headset Wireless", price: 1200000, image: "/images/headset.jpg", description: "Headset dengan kualitas suara premium." }
        // };

        if (data[id]) {
          setProduct(data[id]);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  
  
  //Menampilkan Detail Produk
  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="product-price">Rp {product.price.toLocaleString()}</p>
        <p className="product-description">{product.description}</p>
        <button className="btn-add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
