import { useState } from "react";
import profile from "../../assets/images/profile.jpg";
import "./profile.css";

function useProfile(userId) {
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(profile);

  const fetchUserName = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserName(data.userName);
      setProfilePic(data.profilePic || profile);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserName = async (newName) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/update-name`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, newName }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user name");
      }
      setUserName(newName);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfilePic = async (file) => {
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
        throw new Error("Failed to update profile picture");
      }
      await response.json();
      setProfilePic(URL.createObjectURL(file));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    userName,
    profilePic,
    fetchUserName,
    updateUserName,
    updateProfilePic,
  };
}

export default useProfile;
