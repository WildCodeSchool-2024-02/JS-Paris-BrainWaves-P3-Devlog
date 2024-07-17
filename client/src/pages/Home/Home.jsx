import { useState, useRef, useEffect } from "react";
import "./home.css";
import TaskManager from "../../components/TaskManager/TaskManager";
import Project from "../../components/Project/project";
import Collaborator from "../../components/Collaborator/Collaborator";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import profile from "../../assets/images/profile.jpg";

function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [inputValue, setInputValue] = useState(userName);
  const [profilePic, setProfilePic] = useState(profile);
  const userId = 1;
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    setUserName(inputValue);
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
      const formData = new FormData();
      formData.append("profilePic", file);
      formData.append("userId", userId);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/update-profile-pic`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("failed to update profile picture");
        }
        await response.json();
        setProfilePic(URL.createObjectURL(file));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("failed to fetch user data");
        }
        const data = await response.json();
        setUserName(data.userName);
        setInputValue(data.userName);
        setProfilePic(data.profilePic || profile);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserName();
  }, [userId]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const updateUserName = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/update-name`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, newName: inputValue }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update user name");
        }
        setUserName(inputValue);
      } catch (error) {
        console.error(error);
      }
    };

    if (!isEditing) {
      updateUserName();
    }
  }, [userName, userId, isEditing, inputValue]);

  return (
    <>
      <Nav />
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
            accept="image/*"
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
              <Collaborator />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
