import { useState, useRef, useEffect } from "react";
import "./taskmanager.css";
import { IoIosAddCircleOutline } from "react-icons/io";


function TaskManager() {
  const [currentTab, setCurrentTab] = useState("todo");
  const [newTaskText, setNewTaskText] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [projectId ] = useState(3);
  const taskListRef = useRef(null);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setTasks(data.filter((elem) => elem.Project_id === projectId));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const scrollToTop = () => {
    if (taskListRef.current) {
      taskListRef.current.scrollTop = 0;
    }
  };

  const toggleInputVisible = () => {
    setInputVisible(!isInputVisible);
    setButtonVisible(!buttonVisible);
  };

  function addTask() {
    if (!newTaskText.trim()) return;

    const newTask = {
      task: newTaskText,
      section: "todo",
      description: "description",
      projectId,
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTasks();
      })
      .catch((error) => console.error("Error:", error));
    setInputVisible(false);
  }
  return (
    <div className="task-manager">
      <div className="span">Mes tâches</div>
      <div className="tabs">
        <button
          type="button"
          onClick={() => setCurrentTab("todo")}
          className={currentTab === "todo" ? "active" : ""}
        >
          À faire
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab("process")}
          className={currentTab === "process" ? "active" : ""}
        >
          En cours
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab("finish")}
          className={currentTab === "finish" ? "active" : ""}
        >
          Terminé
        </button>
      </div>
      <div className="add-task">
        {buttonVisible && (
          <button
            type="button"
            className="add-task-btn"
            onClick={toggleInputVisible}
          >
            <IoIosAddCircleOutline /> Créer une tâche
          </button>
        )}
        {isInputVisible && (
          <div>
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
              placeholder="Enter task description"
            />
            <div className="control-btn">
              <button
                type="button"
                onClick={scrollToTop}
                className="scrool-top-btn"
              >
                Scroll to Top
              </button>
            </div>
            <button type="button" onClick={addTask}>
              Add Task
            </button>
          </div>
        )}
      </div>
      <div ref={taskListRef} className="task-list">
        {tasks.map((task) => (
          <div
            key={task.Task_id}
            id={`task-${task.Task_id}`}
            className="task-item"
          >
            <p>{task.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TaskManager;
