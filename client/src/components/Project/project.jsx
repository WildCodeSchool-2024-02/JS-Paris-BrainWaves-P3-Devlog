import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./project.css";
import sproject from "../../assets/images/sproject.png";

function Project() {
  const [dataProject, setDataProject] = useState([]);

  const navigate = useNavigate();

  const fetchDataProject = async () => {
    try {
      const response = await fetch("http://localhost:3311/api/projects");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const receptionData = await response.json();
      setDataProject(receptionData);
    } catch (error) {
      console.error("Error fetching dataProject", error);
    }
  };

  useEffect(() => {
    fetchDataProject();
  }, []);

const handleCreateProject = () => {
  navigate("/table/:id");
};

  return (
    <div className="project-container">
      <h1>Projets</h1>
      <ul className="project-list">
        {dataProject.map((value) => (
          <div key={`data-${value.id}`} className="container-item">
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
        onClick={handleCreateProject}
      >
        CRÉER UN PROJET
      </button>
    </div>
  );
}

export default Project;
