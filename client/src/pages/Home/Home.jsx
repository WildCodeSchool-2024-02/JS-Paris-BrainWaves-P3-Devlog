import { useState, useRef, useEffect } from "react";
import "./home.css";
import TaskManager from "../../components/TaskManager/TaskManager";
import Project from "../../components/Project/project";
import Header from "../../components/Header/Header";
import profile from "../../assets/images/profile.jpg";

function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [inputValue, setInputValue] = useState(userName);
  const userId = 1;
  const inputRef = useRef(null);

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

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('failed to fetch user data');
        }
        const data = await response.json();
        setUserName(data.userName);
        setInputValue(data,userName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserName();
  }, [userId, userName]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const updateUserName = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/update-name`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, newName: inputValue })
        });
        if (!response.ok) {
          throw new Error('Failed to update user name');
        }
         await response.json();
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
          <img src ={profile} className="user-pic" alt="User Profile" />
          <button type="button" className="modify-btn" onClick={handleEditClick}>Modifier</button>
        </div>
        <div id="main-content">
          <div className="task-manager-section">
            <TaskManager />
          </div>
          <div className="projects-collaborators-section">
              <Project />
            </div>
          </div>
        </div>
    </>
  );
}

export default Home;
