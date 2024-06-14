/* eslint-disable import/no-extraneous-dependencies */
import { useNavigate } from "react-router-dom";
import "./welcome.css";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import logo from "../../assets/images/logo-welcome.png";


function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="welcome-page">
      <section className="group-button">
        <button
          type="button"
          className="login-btn"
          onClick={() => navigate("/Connection")}
        >
          Login
        </button>
        <button
          type="button"
          className="signup-btn"
          onClick={() => navigate("/Connection")}
        >
          Sign Up
        </button>
      </section>
      <p className="font-style">DEV LOG</p>
      <img src={logo} className="logo-devlog" alt="Logo DevLog with slogan" />
      <span>
        <AutoAwesomeIcon style={{ color: "yellow" }} />
        "MADE BY DEVS FOR DEVS"
        <AutoAwesomeIcon style={{ color: "yellow" }} />
      </span>
      <text>(DAMN, Did I write that myself??)</text>
    </div>
  );
}

export default Welcome;
