import "./footer.css";
import devlogImage from "../../assets/images/devlog.png";
import instaImage from "../../assets/images/logo.instagram.png";
import linkImage from "../../assets/images/logo.linkedin.png";
import faceImage from "../../assets/images/logo.facebook.png";

function Footer() {
  return (
    <footer className="footer">
      <section className="footer-container">
        <div className="footer-devlog">
          {" "}
          <img src={devlogImage} alt="DevLog" className="devlog-image" />
        </div>
        <div className="footer-content">
          <div className="about">
            {" "}
            <h2 className="footer-tilte">A propos</h2>{" "}
            <p>
              Notre histoire de la création <br />
              de ce bel outil
            </p>
          </div>

          <div className="apps">
            {" "}
            <h2 className="footer-tilte">Apps</h2>{" "}
            <p>
              Télécharger notre application DevLog en <br />
              version Desktop et Mobile
            </p>{" "}
          </div>

          <div className="contact">
            {" "}
            <h2 className="footer-tilte"> Contact</h2>{" "}
            <p>
              Contacter Nous <br />
              Où nous trouver
            </p>
          </div>

          <div className="popular-tool">
            {" "}
            <h2 className="footer-tilte">Outil populaire</h2>{" "}
            <p>
              Free Website Builder <br />
              Gestion des tâches
            </p>
          </div>
        </div>
      </section>

      <section className="footer-link">
        <div className="link-clpsm">
          <div className="copyright">
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

          <hr className="hr-line-2" />

          <div>
            {" "}
            <p className="cookies">🍪Manage Cookies</p>{" "}
          </div>
        </div>

        <div className="icon-network">
          <img src={instaImage} alt="DevLog" />
          <img src={linkImage} alt="DevLog" />
          <img src={faceImage} alt="DevLog" />
        </div>
      </section>

      <div className="copyright-responsive">
        <div>
          <p>Copyright 2024</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
