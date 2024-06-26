import { useState, prompt} from "react";
import "./project.css";
import sproject from "../../assets/images/sproject.png";

function Project() {
  const [project, setProject] = useState([
    "Horizon Nexus",
    "Zenith Path",
    "Quantum Leap",
    "Celestial Haven",
    "Cobalt Wave",
    "Veridian Pulse",
  ]);

  const addProject = () => {
    const newProject = prompt("Entrez le nom du nouveau projet :");
    if (newProject) {
      setProject([project, newProject]);
    }
  };

  return (
    <div className="project-container">
      <h1>Projets</h1>
      <ul className="project-list">
    {project.map((proj, value) => (
          <div key={value.id} className="container-item">
            <figure className="project-figure">
              <img src={sproject} alt="sproject" className="project-img" />
            </figure>
            <li className="project-item">
              <div className="project-content">{proj}</div>
            </li>
          </div>
        ))}
      </ul>
      <button
        className="create-project-button"
        type="button"
        onClick={addProject}
      >
        CRÉER UN PROJET
      </button>
    </div>
  );
}

export default Project;
