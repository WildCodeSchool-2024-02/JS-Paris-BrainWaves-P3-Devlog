/* eslint-disable camelcase */
const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const [tasks] = await tables.projects.getAll();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await tables.projects.deleteProject(id);
    return res.json(result);
  } catch (err) {
    next(err);
  }
  return true;
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await tables.projects.read(id);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, user_id, is_archived = 0 } = req.body;
    if (!name || !user_id) {
      return res.status(400).json({ error: "missing required fields " });
    }
    const projectId = await tables.projects.create(name, user_id, is_archived);
    const newProject = await tables.projects.read(projectId);
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
  return true;
};

const archive = async (req, res, next) => {
  try {
    const { id, isArchived } = req.params;
    const result = await tables.projects.archive(id, isArchived);
    return res.json(result);
  } catch (err) {
    next(err);
  }
  return true;
};

module.exports = { browse, read, create, archive, deleteProject };
