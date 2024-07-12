import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useNavigate } from "react-router-dom";
import "./welcome.css";
import logo from "../../assets/images/logo-welcome.png";
import Footer from "../../components/Footer/Footer";

function Welcome() {
  const navigate = useNavigate();
  return (
    <main>
      <div className="welcome-page">
        <section className="group-button">
          <button
            type="button"
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            type="button"
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </section>
        <p className="font-style">DEV LOG</p>
        <img src={logo} className="logo-devlog" alt="Logo DevLog with slogan" />

        <div className="test-logo">
          <AutoAwesomeIcon
            className="left-icon"
            style={{ color: "yellow", fontSize: "50px" }}
          />

          <span className="gradient-text">"MADE BY DEVS FOR DEVS"</span>

          <AutoAwesomeIcon
            className="right-icon"
            style={{ color: "yellow", fontSize: "50px" }}
          />
        </div>

        <text>(DAMN, Did I write that myself??)</text>
      </div>
      <Footer />
    </main>
  );
}

export default Welcome;
