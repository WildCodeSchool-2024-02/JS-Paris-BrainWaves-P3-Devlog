import { useState, useRef, useEffect } from "react";
import "./home.css";
import TaskManager from "../../components/TaskManager/TaskManager";
import Project from "../../components/Project/project";
import Collaborater from "../../components/Collaborater/Collaborater";
import Header from "../../components/Header/Header";
import useProfile from "../../components/Profile/Profile";

function Home() {
  const userId = 1;
  const {
    userName,
    profilePic,
    fetchUserName,
    updateUserName,
    updateProfilePic,
  } = useProfile(userId);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(userName);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserName();
  }, [fetchUserName]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing) {
      updateUserName(inputValue);
    }
  }, [isEditing, inputValue, updateUserName]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleInputBlur();
    }
  };

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await updateProfilePic(file);
    }
  };

  return (
    <>
      <Header />
      <div className="home-page">
        <p>Accueil</p>
        <div className="user-info">
          {isEditing ? (
            <input
              className="edit-input"
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
            />
          ) : (
            <h2>{`Bonjour, ${userName}`}</h2>
          )}
          <div
            className="user-pic"
            role="button"
            onClick={handleProfilePicClick}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleProfilePicClick();
            }}
            tabIndex="0"
            style={{ backgroundImage: `url(${profilePic})` }}
            aria-label="Change profile picture"
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="modify-btn"
            onClick={handleEditClick}
          >
            Modifier
          </button>
        </div>
        <div id="main-content">
          <div className="task-manager-section">
            <TaskManager />
          </div>
          <div id="pro-collab-section">
            <div className="projects-collaborators-section">
            <Project />
            <Collaborater />
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
