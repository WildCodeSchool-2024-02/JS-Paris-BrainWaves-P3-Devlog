const tables = require("../../database/tables");

/*
const browse = async (req, res, next) => {
  try {
    const tasks = req.body;
    const  = await tables.task.getAll(task_id);
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    next(err);
  }
}; */

const browse = async (req, res, next) => {
  try {
    // Optionally check for task_id and fetch tasks accordingly
    const { task_id } = req.body;
    let tasks;

    if (task_id) {
      const result = await tables.task.getAll(task_id);
      tasks = result[0];
    } else {
      tasks = await tables.task.getAll(); // Fetch all tasks if no task_id is provided
    }

    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};
/*
const addTask = async (req, res, next) => {
  try {
    const { name, description, section, projectId } = req.body;
    if (!name || !description || !section || !projectId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await tables.task.create(name, description, projectId, section);
    res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } next(error);
};  */

module.exports = { browse };