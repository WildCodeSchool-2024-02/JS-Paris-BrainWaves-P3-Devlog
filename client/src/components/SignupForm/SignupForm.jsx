import { useState } from "react";
import "./SignupForm.css";
import logo from "../../assets/images/logo.png";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signup() {
    if (email && password) {
      const data = await fetch("http://localhost:3310/api/users/signup", {
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

      if (!data || !data[0] || !data[0].id) {
        return false;
      }

      return true;
    }

    return false;
  }

  return (
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
      <button type="button" className="form-btn" onClick={signup}>
        Login
      </button>
      <p>
        You already have an account?{" "}
        <span className="signuptxt">
          <a href="/login">Login</a>
        </span>
      </p>
    </form>
  );
}

export default SignupForm;
