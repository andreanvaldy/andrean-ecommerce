// import { useState, useEffect } from "react";
// import { fetchProducts } from "../services/productService";

// const useProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const data = await fetchProducts(); // Ambil data dari API
//         setProducts(data);
//       } catch (err) {
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   return { products, loading, error };
// };

// export default useProducts;
