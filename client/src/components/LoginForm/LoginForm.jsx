import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginForm.css";
import logo from "../../assets/images/logo.png";
import useAuthContext from "../../services/context";

function LoginForm() {
  const { setAuth } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    if (username && password) {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.ok) {
        toast("Success, logging in...");
        try {
          const { user, token } = await resp.json();
          user.token = token;
          setAuth({ isLogged: true, user, token });
          navigate("/home");
        } catch (error) {
          toast.error("Une erreur est survenue");
        }
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
    </div>
  );
}

export default LoginForm;
