import { useState } from "react";
import "./archiveproject.css";

function ArchiveProject() {
  const [projects, setProjects] = useState([]);

  //   useEffect(() => {
  //     fetchProjects();
  //   }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const takebackProject = async (projectId) => {
    try {
      await fetch(`/api/projects/${projectId}/archive`, { method: "POST" });
      fetchProjects();
    } catch (error) {
      console.error("Error archiving project:", error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="archive-container">
      <h2>Projets Archivés</h2>
      <div className="archive-list">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <img
              src={project.logo}
              alt={project.name}
              className="project-logo"
            />
            <span>{project.name}</span>
            <button type="button" onClick={() => takebackProject(project.id)}>
              ↥
            </button>
            <button type="button" onClick={() => deleteProject(project.id)}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArchiveProject;
