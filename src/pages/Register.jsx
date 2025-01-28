import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "@/styles/global.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!form.name.trim()) {
      setError("Nama tidak boleh kosong.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Masukkan alamat email yang valid.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password harus minimal 6 karakter.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/Register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert(response.data.message || "Registrasi berhasil!");
      navigate("/Login");
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Registrasi gagal.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Nama:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Masukkan nama"
          style={styles.input}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Masukkan email"
          style={styles.input}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Masukkan password"
          style={styles.input}
        />

        <label>Konfirmasi Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          placeholder="Konfirmasi password"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
      <p style={styles.loginText}>
        Sudah punya akun?{" "}
        <Link to="/login" style={styles.loginLink}>
          Login
        </Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
  loginText: {
    marginTop: "15px",
    fontSize: "0.9rem",
  },
  loginLink: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Register;
