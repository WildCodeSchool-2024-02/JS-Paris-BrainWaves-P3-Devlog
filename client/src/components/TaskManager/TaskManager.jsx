import { useState, useRef, useEffect } from "react";
import "./taskmanager.css";

function TaskManager() {
  const [currentTab, setCurrentTab] = useState("todo");
  const [tasks, setTasks] = useState({ todo: [], process: [], finish: [] });

  const taskListRef = useRef(null);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/taskhome`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const receptionData = await response.json();
      console.log("Fetched data:", receptionData); // Log the fetched data
      const tasksOrganised = {
        todo: receptionData.filter((task) => task.section === "todo"),
        process: receptionData.filter((task) => task.section === "process"),
        finish: receptionData.filter((task) => task.section === "finish"),
      };
      console.log("Organised tasks:", tasksOrganised); // Log the organised tasks
      setTasks(tasksOrganised);
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
      <div ref={taskListRef} className="task-list">
        {(tasks[currentTab] || []).map((task) => (
          <div key={task.id} id={`task-${task.id}`} className="task-item">
            <p>Task ID: {task.id}</p>
            <p>Description: {task.name}</p>
          </div>
        ))}
      </div>
      <div className="control-btn">
        <button type="button" onClick={scrollToTop} className="scroll-top-btn">
          Scroll to Top
        </button>
      </div>
    </div>
  );
}

export default TaskManager;
