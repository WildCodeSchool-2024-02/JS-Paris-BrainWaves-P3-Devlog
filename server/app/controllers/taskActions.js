const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await tables.task.getAll(id);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const addTask = async (req, res, next) => {
  try {
    const { task, projectId, section, description } = req.body;

    if (!section || !task || !projectId || !description) {
      return res
        .status(400)
        .json({ message: "Missing required information: userId and status" });
    }

    const [results] = await tables.task.create({
      task,
      section,
      projectId,
      description,
    });
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
  return true;
};

const add = async (req, res, next) => {
  const { task, description, projectId, section } = req.body;

  try {
    const result = await tables.task.create(
    {  task,
      section,
      projectId,
      description}
    );

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(400).json({ message: "missing taskId" });
    }
    await tables.task.archive(taskId);
    res.status(200).json({ message: "task archived succefully" });
  } catch (error) {
    next(error);
  }
  return true;
};

module.exports = { browse, addTask, deleteTask, add };
