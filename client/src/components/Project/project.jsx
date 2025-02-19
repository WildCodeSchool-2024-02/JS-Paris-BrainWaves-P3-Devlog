import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../services/context";
import "./project.css";
import sproject from "../../assets/images/sproject.png";
import Popover from "../PopoverProject/Popover";

function Project() {
  const { auth } = useAuthContext();
  const [dataProject, setDataProject] = useState([]);
  const [showPopover, setShowPopover] = useState(false);

  const navigate = useNavigate();

  const fetchDataProject = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const receptionData = await response.json();
      setDataProject(receptionData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.isLogged) fetchDataProject();
  }, [auth]);

  const handleCreateProject = async (newProjectName) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
          body: JSON.stringify({
            name: newProjectName,
            user_id: auth?.user?.id,
            is_archive: 0,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newProject = await response.json();
      setShowPopover(false);
      navigate(`/table/${newProject.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="project-container">
      <h1>Projets</h1>
      <ul className="project-list">
        {dataProject.map((value) => (
          <div
            key={`data-${value.id}`}
            className="container-item"
            role="presentation"
            onClick={() => navigate(`/table/${value.id}`)}
          >
            <figure className="project-figure">
              <img src={sproject} alt="sproject" className="project-img" />
            </figure>
            <li className="project-item">
              <div className="project-content">{value.name}</div>
            </li>
          </div>
        ))}
      </ul>
      <button
        className="create-project-button"
        type="button"
        onClick={() => setShowPopover(true)}
      >
        CRÉER UN PROJET
      </button>
      {showPopover && (
        <Popover
          onClose={() => setShowPopover(false)}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
}
export default Project;