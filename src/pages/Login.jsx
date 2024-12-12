import { Link } from "react-router";
import loginBg from "../assets/image-login.png";
import logo from "../logo/wallet.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ActionButton from "../components/ActionButton";

function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const Userdata = localStorage.getItem("login");
    if (Userdata) {
      navigate("/dashboard");
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3000/users"); // Ganti dengan URL API kamu
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();

          setData(data);
          setLoading(false);
        } catch (error) {
          console.error("fetch error");
        }
      };
      fetchData();
    }
  }, [1]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    localStorage.setItem("login", JSON.stringify(loginForm));

    e.preventDefault();
    const user = data.find(
      (user) =>
        user.email === loginForm.email && user.password === loginForm.password
    );

    if (user) {
      // Jika ditemukan, simpan data ke localStorage dan navigasi ke dashboard
      localStorage.setItem(
        "login",
        JSON.stringify({
          email: user.email,
          password: user.password,
          id: user.id,
        })
      );
      navigate("/dashboard");
    } else {
      // Jika tidak ditemukan, tampilkan alert
      alert("Email atau password salah");
    }
  };

  return (
    <section className="flex w-full h-screen bg-white">
      <div className="flex flex-col w-1/2 items-center justify-center">
        <div>
          <img className="w-[290px] mx-auto" src={logo} alt="logo" />
          <form className="flex flex-col mt-24 gap-y-5" onSubmit={handleSubmit}>
            <input
              className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
            <input
              className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
            <ActionButton
              disabled={!loginForm.email || !loginForm.password}
              onClick={handleSubmit}
            >
              Login
            </ActionButton>
          </form>
          <div className="w-full mt-4 text-black">
            Belum punya akun?{" "}
            <Link to="/register" className="text-[#19918F] text-left">
              Daftar di sini
            </Link>
          </div>
        </div>
      </div>
      <img
        src={loginBg}
        alt="login background"
        className="w-1/2 object-cover"
      />
    </section>
  );
}

export default Login;
