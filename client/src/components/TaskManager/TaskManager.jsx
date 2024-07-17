import { useState, useRef, useEffect } from "react";
import "./taskmanager.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";

function TaskManager() {
  const [currentTab, setCurrentTab] = useState("todo");
  const [newTaskText, setNewTaskText] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [tasks, setTasks] = useState({});
  const [taskToDelete, setTaskToDelete] = useState(null);

  const taskListRef = useRef(null);

  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/tasks`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const tasksOrganised = {
          todo: data.filter((task) => task.status === "todo"),
          process: data.filter((task) => task.status === "process"),
          finish: data.filter((task) => task.status === "finish"),
        };
        setTasks(tasksOrganised);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (taskToDelete !== null) {
      const deleteTask = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/delete/${taskToDelete}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete task');
          }

          const updatedTasks = {};
          Object.keys(tasks).forEach((project) => {
            updatedTasks[project] = tasks[project].filter((task) => task.id !== taskToDelete);
          });

          setTasks(updatedTasks);
          setTaskToDelete(null);
        } catch (error) {
          console.error(error);
        }
      };
      deleteTask();
    }
  }, [taskToDelete, tasks]);

  const scrollToTop = () => {
    if (taskListRef.current) {
      taskListRef.current.scrollTop = 0;
    }
  };

  function toggleInputVisible() {
    setInputVisible(!isInputVisible);
    setButtonVisible(!buttonVisible);
  }

  function addTask() {
    if (!newTaskText.trim()) return;
    const newTask = {
      userId: 1,
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

  const handleDelete = (taskId) => {
    setTaskToDelete(taskId);
  };

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
        {(tasks[currentTab] || []).map((task) => (
          <div key={task.Task_id} id={`task-${task.Task_id}`} className="task-item">
            <p>Task ID: {task.Task_id}</p>
            <div id="button-delete">
              <button
                type="button"
                onClick={() => handleDelete(task.id)}
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
