import { Link } from "react-router";
import loginBg from "../assets/image-login.png";
import logo from "../logo/wallet.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ActionButton from "../components/ActionButton";

function Register() {
  const [loginForm, setLoginForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const navigate = useNavigate();

  const [submit, setSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (submit) {
      const handleSubmit = async (e) => {
        try {
          const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginForm),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const responseData = await response.json();
          console.log("Success:", responseData);
          alert("Data submitted successfully!");
        } catch (error) {
          console.error("Error:", error);
          alert("There was an error submitting your data.");
        }
      };
      handleSubmit();
    }
  }, [submit, email, username]);

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    console.log(loginForm);
    // navigate("/");
  };

  return (
    <section className="flex w-full h-screen bg-white">
      <div className="flex flex-col w-1/2 items-center justify-center">
        <div>
          <img className="w-[290px] mx-auto" src={logo} alt="logo" />
          <form className="flex flex-col mt-24 gap-y-5">
            <input
              className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
              name="name"
              type="name"
              placeholder="Nama Lengkap"
              onChange={(e) => handleChange(e)}
            />
            <input
              className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
              name="email"
              type="Email"
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
            <input
              className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
              name="avatar"
              type="foto profil"
              placeholder="Link foto profil"
              onChange={(e) => handleChange(e)}
            />
            <ActionButton
              disabled={!loginForm.email || !loginForm.password}
              onClick={handleSubmit}
            >
              Register
            </ActionButton>
          </form>
          <div className="w-full mt-4 text-black">
            Sudah punya akun?{" "}
            <Link to="/" className="text-[#19918F] text-left">
              Login di sini
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

export default Register;
