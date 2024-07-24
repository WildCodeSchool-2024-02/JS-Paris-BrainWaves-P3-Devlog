import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAuthContext from "../../services/context";
import "./tablecard.css";
import "./modal.css";

function Tablecard({ projectId }) {
  const { auth } = useAuthContext();
  const [dataTask, setDataTask] = useState([]);
  const [title, setTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSection, setNewSection] = useState("Backlog");
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchDataTask = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/project/${projectId}`,
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

      setDataTask(receptionData);
    } catch (error) {
      console.error("Error fetching dataTask", error);
    }
  };

  useEffect(() => {
    const fetchDataProject = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dataProject = await response.json();
        setTitle(dataProject.name);
      } catch (error) {
        console.error("Error fetching project data", error);
      }
    };
    fetchDataTask();
    fetchDataProject();
  }, [projectId]);

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewTask("");
    setNewDescription("");
    setNewSection("Backlog");
    setSelectedTask(null);
  };

  const handleTaskSubmit = async () => {
    if (newTask) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/tasks`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              task: newTask,
              projectId,
              description: newDescription,
              section: newSection,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const receptionData = await response.json();
        setDataTask(receptionData);
      } catch (error) {
        console.error("Error fetching dataTask", error);
      }
      setDataTask([
        ...dataTask,
        {
          id: dataTask.length,
          name: newTask,
          description: newDescription,
          section: newSection,
        },
      ]);
      handleModalClose();
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskDelete = (taskId) => {
    setDataTask(dataTask.filter((task) => task.id !== taskId));
  };
  const renderTasks = (section) =>
    dataTask
      .filter((task) => task.section.toLowerCase() === section.toLowerCase())
      .map((task) => (
        <li key={task.id} role="presentation">
          <div
            className="task-item"
            role="presentation"
            onClick={() => handleTaskClick(task)}
          >
            <strong>{task.name}</strong>
          </div>
          <RiDeleteBin6Line
            className="delete-icon"
            onClick={() => handleTaskDelete(task.id)}
          />
        </li>
      ));

  return (
    <>
      <div className="title">
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <h1 role="presentation" onClick={handleTitleClick}>
            {title}
          </h1>
        )}
      </div>
      <button className="add-task-button" type="button" onClick={handleAddTask}>
        Ajouter une tâche
      </button>
      <div className="table-container">
        <h1>Backlog</h1>
        <hr />
        <ul className="task-list">{renderTasks("Backlog")}</ul>
      </div>
      <div className="table-afaire">
        <h1>A Faire</h1>
        <hr />
        <ul className="task-list">{renderTasks("A Faire")}</ul>
      </div>
      <div className="table-encours">
        <h1>En Cours</h1>
        <hr />
        <ul className="task-list">{renderTasks("En Cours")}</ul>
      </div>
      <div className="table-terminer">
        <h1>Terminer</h1>
        <hr />
        <ul className="task-list">{renderTasks("Terminer")}</ul>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-button"
              type="button"
              onClick={handleModalClose}
            >
              &times;
            </button>
            {selectedTask ? (
              <>
                <h2>{selectedTask.task}</h2>
                <p>{selectedTask.description}</p>
              </>
            ) : (
              <>
                <h2>Ajouter une nouvelle tâche</h2>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter new task"
                />
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Enter description"
                />
                <select
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                >
                  <option value="Backlog">Backlog</option>
                  <option value="A Faire">A Faire</option>
                  <option value="En Cours">En Cours</option>
                  <option value="Terminer">Terminer</option>
                </select>
                <button type="button" onClick={handleTaskSubmit}>
                  Ajouter
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

Tablecard.propTypes = {
  projectId: PropTypes.number.isRequired,
};

export default Tablecard;
