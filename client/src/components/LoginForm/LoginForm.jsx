import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./LoginForm.css";
import logo from "../../assets/images/logo.png";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    if (username && password) {
      const resp = await fetch("http://localhost:3310/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => json);
      if(resp.success){
        toast("Success, logging in...");
      }
      if (resp.error) {
        toast("Invalid email or password");
      }
      return true;
    }

    return false;
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <img src={logo} alt="logo" className="logo" />
        <input
          placeholder="Username"
          className="form-input"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          placeholder="Password"
          className="form-input"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="button" className="form-btn" onClick={login}>
          Login
        </button>
        <p>
          You don't have an account?{" "}
          <span className="signuptxt">
            <a href="/signup">Signup</a>
          </span>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;
