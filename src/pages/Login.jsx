import { useState } from "react"; //Hook dari React untuk mengelola state.
import { useNavigate, Link } from "react-router-dom";// useNavigate → Hook dari react-router-dom untuk navigasi ke halaman lain
// Link → Komponen dari react-router-dom untuk membuat navigasi ke halaman lain..
import "@/styles/global.css";
import axios from "axios"; //Library untuk melakukan HTTP request ke backend.


function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");  // Menyimpan error untuk email
  const [passwordError, setPasswordError] = useState("");  // Menyimpan error untuk password

  //Fungsi ini menangani perubahan pada input email dan password.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Fungsi untuk Mengirim Form (Login)
  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");  // Reset error email
    setPasswordError("");  // Reset error password
  
    // Validasi email dan password
    if (!form.email.includes("@")) {
      setEmailError("Masukkan alamat email yang valid.");
      return;
    }

    if (form.password.length < 6) {
      setPasswordError("Password harus minimal 6 karakter.");
      return;
    }
  
    //Mengirim Data ke Backend
    try {
      const res = await axios.post("http://localhost:3000/api/Login", form);

      localStorage.setItem("authToken", res.data.token);
  
      console.log("Login berhasil!");
      console.log("Email yang digunakan: ", form.email);
      console.log("Password yang digunakan: ", form.password);  // Cek password yang digunakan

      alert("Login berhasil!");
      navigate("/Home");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login gagal.";

      // Jika error berkaitan dengan email, tampilkan di atas kolom email
      if (errorMessage.toLowerCase().includes("email")) {
        setEmailError(errorMessage);
      } else {
        // Jika error berkaitan dengan password, tampilkan di atas kolom password
        setPasswordError(errorMessage);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      
      {/* Menampilkan error email di atas kolom email */}
      {emailError && <p style={styles.error}>{emailError}</p>}

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

        {/* Menampilkan error password di atas kolom password */}
        {passwordError && <p style={styles.error}>{passwordError}</p>} 
        
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
    marginTop: "5px",  // Memberi jarak sedikit agar tidak terlalu rapat dengan input
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