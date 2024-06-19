import "./footer.css";
import devlogimage from "../../assets/images/devlog.png";
import instaimage from "../../assets/images/logo.instagram.png";
import linkimage from "../../assets/images/logo.linkedin.png";
import faceimage from "../../assets/images/logo.facebook.png";

function Footer() {
  return (
    <section id="footer">
      <section id="footer-container">
        <div className="footer-devlog">
          {" "}
          <img src={devlogimage} alt="DevLog" id="devlog-image" />
        </div>
        <div className="footer-content">
          <div id="a-propos">
            {" "}
            <h2>A propos</h2>{" "}
            <p>
              Notre histoire de la création <br />
              de ce bel outil
            </p>
          </div>

          <div id="apps">
            {" "}
            <h2>Apps</h2>{" "}
            <p>
              Télécharger notre application DevLog en <br />
              version Desktop et Mobile
            </p>{" "}
          </div>

          <div id="contact">
            {" "}
            <h2> Contact</h2>{" "}
            <p>
              Contacter Nous <br />
              Où nous trouver
            </p>
          </div>

          <div id="outil-populaire">
            {" "}
            <h2>Outil populaire</h2>{" "}
            <p>
              Free Website Builder <br />
              Gestion des tâches
            </p>
          </div>
        </div>
      </section>

      <section id="footer-link">
        <div className="link-clpsm">
          <div>
            <p>Copyright 2024</p>
          </div>

          <div>
            {" "}
            <p>📜Legal Stuff</p>
          </div>

          <hr className="hr-line" />

          <div>
            {" "}
            <p>🔐Private Policy</p>
          </div>

          <hr className="hr-line" />

          <div>
            {" "}
            <p>🛡️Security</p>
          </div>

          <hr className="hr-line" />

          <div>
            {" "}
            <p>🍪Manage Cookies</p>{" "}
          </div>
        </div>

        <div className="icone-network">
          <img src={instaimage} alt="DevLog" className="network" />
          <img src={linkimage} alt="DevLog" className="network" />
          <img src={faceimage} alt="DevLog" className="network" />
        </div>
      </section>
    </section>
  );
}

export default Footer;
