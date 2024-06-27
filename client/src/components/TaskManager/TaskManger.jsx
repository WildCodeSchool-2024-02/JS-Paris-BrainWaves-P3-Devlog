import { useState, useRef, useEffect } from "react";
import "./taskmanager.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";

function TaskManager() {
  const [currentTab, setCurrentTab] = useState("todo");
  const [newTaskText, setNewTaskText] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, text: "Navbar slide urgent issue immediately" },
      { id: 2, text: "gitpush connection+SignUp page" },
      { id: 3, text: "Homepage to be done before Friday" },
    ],
    process: [
      { id: 1, text: "building features for Homepage" },
      { id: 2, text: "gathering all features" },
      { id: 3, text: "Homepage is presenting on Friday" },
    ],
    finish: [
      { id: 1, text: "Completed WelcomePage, LoginPage, SignupPage" },
      { id: 2, text: "Completed project review" },
    ],
  });

  const taskListRef = useRef(null);

  // fetch Tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/task");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };
    fetchTasks();
  }, []);

  const scrollToTop = () => {
    taskListRef.current.scrollTop = 0;
  };

  function toggleInputVisible() {
    setInputVisible(!isInputVisible);
    setButtonVisible(!buttonVisible);
  }

  function addTask() {
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      status: "todo",
    };
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask],
    }));
    setNewTaskText("");
    setInputVisible(false);
    setButtonVisible(true);
  }

  function deleteTask(taskId) {
    const updatedTasks = {};
    Object.keys(tasks).forEach((project) => {
      updatedTasks[project] = tasks[project].filter(
        (task) => task.id !== taskId
      );
    });
    setTasks(updatedTasks);
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
        {tasks[currentTab].map((task) => (
          <div key={task.id} id={`task-${task.id}`} className="task-item">
            <p>{task.text}</p>
            <div id="button-delete">
              <button
                type="button"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
              >
                <RiDeleteBin5Line />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskManager;
