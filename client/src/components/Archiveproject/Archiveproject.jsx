import { useState, useEffect } from "react";
import "./archiveproject.css";
import useAuthContext from "../../services/context";
import sproject from "../../assets/images/sproject.png";
import Header from "../Header/Header";
import BlockRoute from "../../services/auth";

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
        `${import.meta.env.VITE_API_URL}/api/projects`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      const data = await response.json();
      setProjects(data.filter((elem) => elem.is_archived === 1));
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    if (auth?.isLogged) fetchProjects();
  }, [auth]);

  const deleteProject = async (projectId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
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
              <img src={sproject} alt={project.name} className="project-logo" />
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
        <BlockRoute />
      </div>
    </>
  );
}

export default ArchiveProject;
