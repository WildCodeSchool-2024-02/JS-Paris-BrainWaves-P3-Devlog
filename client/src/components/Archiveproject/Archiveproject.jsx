import { useState, useEffect } from "react";
import "./archiveproject.css";
import useAuthContext from "../../services/context";
import Header from "../Header/Header";

function ArchiveProject() {
  const { auth } = useAuthContext();
  const [projects, setProjects] = useState([]);

  const takebackProject = async (id) => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/projects/archive/${id}/0`,
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );

    setProjects(projects.filter((elem) => elem.is_archived !== 0));
  };
  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`
      );
      const data = await response.json();
      setProjects(data.filter((elem) => elem.is_archived === 1));
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteProject = async (projectId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
        method: "DELETE",
      });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <>
      <Header />
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
    </>
  );
}

export default ArchiveProject;
