import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./tablecard.css";
import "./modal.css";

function Tablecard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("DEV LOG");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSection, setNewSection] = useState("Backlog");
  const [selectedTask, setSelectedTask] = useState(null);

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

  const handleTaskSubmit = () => {
    if (newTask) {
      setTasks([
        ...tasks,
        {
          id: tasks.length,
          task: newTask,
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
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const renderTasks = (section) =>
    tasks
      .filter((task) => task.section === section)
      .map((task) => (
        <li key={task.id} role="presentation">
          <div
            className="task-item"
            role="presentation"
            onClick={() => handleTaskClick(task)}
          >
            <strong>{task.task}</strong>
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

export default Tablecard;
