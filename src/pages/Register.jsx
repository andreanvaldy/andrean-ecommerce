import { useState } from "react"; //Hook dari React untuk menyimpan state dalam komponen.
import { useNavigate, Link } from "react-router-dom"; //Hook dari react-router-dom untuk mengarahkan pengguna ke halaman lain setelah registrasi berhasil
// Link → Komponen dari react-router-dom yang digunakan untuk membuat navigasi ke halaman login..
import "@/styles/global.css";
import axios from "axios"; //Digunakan untuk mengirim permintaan HTTP ke backend.

//Inisialisasi Komponen Register
function Register() {
  const navigate = useNavigate(); //useNavigate() → Digunakan untuk navigasi setelah pengguna berhasil mendaftar.
  const [form, setForm] = useState({
    //Menyimpan data input form yang diisi oleh pengguna.
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(""); // Menyimpan pesan error jika ada kesalahan dalam validasi atau saat mengirim data ke backend.

  //untuk Menyimpan Input Pengguna
  // Mengambil nilai dari input form yang diisi pengguna.
  // Menggunakan spread operator (...form) untuk mempertahankan data lama, lalu memperbarui hanya satu field yang berubah.

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //untuk Mengirim Data ke Backend
  const handleSubmit = async (e) => {
    e.preventDefault(); //e.preventDefault() → Mencegah halaman melakukan reload ketika form dikirim.

    console.log("Form data :", form); // Menampilkan data form di console sebelum dikirim ke backend untuk debugging.

    // Validasi Input Sebelum Dikirim ke Backend haru sesuai semua
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

    //Mengirim Data ke Backend Menggunakan axios
    try {
      const response = await axios.post("http://localhost:3000/api/Register", { //Mengirim data ke endpoint /api/Register di backend melalui metode POST.
        name: form.name, //Mengirimkan nama, email, dan password ke backend.
        email: form.email,
        password: form.password,
      });

      console.log("Respons dari backend:", response.data); // Menampilkan respons dari backend untuk debugging.d


      alert(response.data.message || "Registrasi berhasil!"); //Menampilkan pesan sukses setelah registrasi.
      navigate("/Login"); //Mengarahkan pengguna ke halaman login setelah berhasil registrasi.
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Registrasi gagal.");
    }
  };

  //Menampilkan pesan error jika ada kesalahan.
// Jika ada error, maka <p> akan muncul dengan warna merah.

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
