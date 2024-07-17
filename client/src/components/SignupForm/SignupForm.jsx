import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SignupForm.css";
import logo from "../../assets/images/logo.png";

function SignupForm() {
  async function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState(""); // confirm password

  async function signup() {
    if (email && password) {
      if (password !== cPassword) {
        toast("Password and confirmation are not the same");
        return false;
      }
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/signup`, {
        method: "POST",
        body: JSON.stringify({
          toto: "toto",
          email,
          password,
          username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => json);

      toast("Signed up successfuly, redirecting...");

      await sleep(1500);

      navigate("/login");
      return true;
    }

    return false;
  }

  return (
    <div className="signup-container">
      <form className="signup-form">
        <img src={logo} alt="logo" className="logo" />

        <input
          placeholder="Username"
          className="form-input"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />

        <input
          placeholder="Email"
          className="form-input"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          placeholder="Password"
          className="form-input"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />

        <input
          placeholder="Confirm Password"
          className="form-input"
          type="password"
          onChange={(e) => {
            setCPassword(e.target.value);
          }}
          required
        />
        <button type="button" className="form-btn" onClick={signup}>
          Signup
        </button>
        <p>
          You already have an account?{" "}
          <span className="signuptxt">
            <a href="/login">Login</a>
          </span>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignupForm;
