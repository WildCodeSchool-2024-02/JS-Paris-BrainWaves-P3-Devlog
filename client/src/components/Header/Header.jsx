import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile.jpg";

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopover, setShowPopover] = useState(false);

  const handleNavigate = () => {
    navigate("/");
  };

  const handleSearch = () => {};

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  return (
    <header>
      <div id="header">
        <div className="logo-home">
          <img
            src={logo}
            role="presentation"
            alt="Logo"
            className="logo"
            onClick={handleNavigate}
          />
          <button
            className="rounded-button"
            type="button"
            onClick={handleNavigate}
          >
            Accueil
          </button>
        </div>
        <div className="search-container">
          <RiSearchLine className="search-icon" />
          <input
            type="text"
            placeholder=" Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div
          className="img-container"
          onKeyDown={togglePopover}
          role="presentation"
          onClick={togglePopover}
        >
          <img src={profile} alt="profile" className="profile" />
          {/* Popover */}
          {showPopover && (
            <div className="popover">
              <div className="popoverWriting">
                <ul>
                  <li>Compte</li>
                  <div className="popoverMailImg">
                    <li>
                      <img src={profile} alt="profile" className="profile" />
                    </li>
                    <div className="popoverName">
                      <p>John Doe</p>
                      <p>John.Doe@gmail.com</p>
                    </div>
                  </div>
                  <li>Déconnexion</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
