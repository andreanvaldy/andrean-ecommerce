import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Simpan ke localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Hapus dari localStorage
  };

  return { user, login, logout };
};

export default useAuth;
