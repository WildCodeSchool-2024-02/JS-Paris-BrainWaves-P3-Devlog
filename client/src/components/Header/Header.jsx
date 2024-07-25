import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../assets/images/logo_blanc.png";
import profile from "../../assets/images/profile.jpg";
import useAuth from "../../services/context/index";

function Header() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);

  function logout() {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
      method: "GET",
      credentials: "include",
    });
    navigate("/login");
  }
  useEffect(() => {
    if (auth !== null && auth && auth.user) {
      setEmail(auth.user.email);
      setUserName(auth.user.user_name);
    }
  }, [setUserName, auth]);
  const handleNavigate = () => {
    navigate("/home");
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
          <GiHamburgerMenu className="burger-icon" onClick={handleNavigate} />
          <button
            className="rounded-button"
            type="button"
            onClick={handleNavigate}
          >
            Accueil
          </button>
          <IoHomeOutline className="home-icon" onClick={handleNavigate} />
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
                  <li className="account">Compte</li>
                  <div className="popoverMailImg">
                    <li>
                      <img src={profile} alt="profile" className="profile" />
                    </li>
                    <div className="popoverName">
                      <p>{userName}</p>
                      <p>{email}</p>
                    </div>
                  </div>
                  <li
                    className="deconnection"
                    onClick={logout}
                    role="presentation"
                  >
                    Déconnexion
                  </li>
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
