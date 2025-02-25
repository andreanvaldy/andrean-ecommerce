import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("authToken"); // Cek apakah user sudah login

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect ke Login jika belum login
  }

  return children; // Jika sudah login, izinkan akses halaman
};

export default ProtectedRoute;

//ini untuk mengunci semua halaman sebelum login dulu