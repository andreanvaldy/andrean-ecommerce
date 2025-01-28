import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "@/styles/global.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simulate API call with sample data (replace with actual API call)
        const data = {
          1: { id: 1, name: "Laptop Gaming", price: 15000000, image: "/images/laptop.jpg", description: "Laptop gaming dengan spesifikasi tinggi." },
          2: { id: 2, name: "Smartphone 5G", price: 8000000, image: "/images/smartphone.jpg", description: "Smartphone dengan teknologi jaringan 5G." },
          3: { id: 3, name: "Headset Wireless", price: 1200000, image: "/images/headset.jpg", description: "Headset dengan kualitas suara premium." }
        };

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
