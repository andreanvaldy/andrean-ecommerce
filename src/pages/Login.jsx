import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "@/styles/global.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Password yang dimasukkan:", form.password);  // Cek password yang dimasukkan
  
    // Validasi email dan password
    if (!form.email.includes("@")) {
      setError("Masukkan alamat email yang valid.");
      return;
    }
  
    if (form.password.length < 6) {
      setError("Password harus minimal 6 karakter.");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:3000/api/Login", form);

      localStorage.setItem("authToken", res.data.token);
  
      console.log("Respon login:", res.data);  // Cek respons dari server
      alert("Login berhasil!");
      navigate("/Home");
    } catch (error) {
      setError(error.response?.data?.message || "Login gagal.");
    }
  };
  

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
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

        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p style={styles.registerText}>
        Belum punya akun?{" "}
        <Link to="/Register" style={styles.registerLink}>sign up</Link>
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
    backgroundColor: "#007bff",
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
  registerText: {
    marginTop: "15px",
    fontSize: "0.9rem",
  },
  registerLink: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Login;
