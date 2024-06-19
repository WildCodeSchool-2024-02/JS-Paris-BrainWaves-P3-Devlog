/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState } from "react";
import "./taskmanager.css";
import { useNavigate } from "react-router-dom";
import { number } from "prop-types";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";

function TaskManager() {
  const [currentTab, setCurrentTab] = useState("todo");
  const [newTaskText, setNewTaskText] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true); // new state to control button visibility
  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, text: "Navbar slide urgent issue immediately" },
      { id: 2, text: "gitpush connection+SignUp page" },
      { id: 3, text: "Homepage to be done before Firday" },
    ],
    inProgress: [
      { id: 1, text: "building features for Homepage" },
      { id: 2, text: "gathering all features" },
      { id: 3, text: "Homepage is presenting on Friday" },
    ],
    done: [
      { id: 1, text: "Completed WelcomePage, LoginPage, SignupPage" },
      { id: 2, text: "Completed project review" },
    ],
  });

  function toggleInputVisible() {
    setInputVisible(!isInputVisible);
    setButtonVisible(!buttonVisible); // optional toggle button visibility when input toggles
  }

  function addTask() {
    if (!newTaskText.trim()) return; // prevent adding empty or whitespace-only tasks
    const newTask = {
      id: Date.now(), // unique Id based on current timestamp
      text: newTaskText, // text from input
      status: "todo",
    }; // default newtask to do
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask], // append new task to the todo array
    }));
    setNewTaskText("");
    setInputVisible(false); // hide input afer adding task
    setButtonVisible(true); // show button again if you need add more tasks
  }

  function deleteTask(taskId) {
    const updatedTasks = {};
    for (const project in tasks) {
      updatedTasks[project] = tasks[project].filter(
        (task) => task.id !== taskId
      );
    }
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
          onClick={() => setCurrentTab("inProgress")}
          className={currentTab === "inProgress" ? "active" : ""}
        >
          En cours
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab("done")}
          className={currentTab === "done" ? "active" : ""}
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
            <IoIosAddCircleOutline />
            Créer une tâche
          </button>
        )}
        {isInputVisible && (
          <div>
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Enter task description"
              autoFocus
            />
            <button type="button" onClick={addTask}>
              Add Task
            </button>
          </div>
        )}
      </div>
      <div className="task-list">
        {tasks[currentTab].map((task) => (
          <div key={task.id} className="task-item">
            <p>{task.text}</p>
            <button type="button" onClick={() => deleteTask(task.id)}>
              <RiDeleteBin5Line />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskManager;
