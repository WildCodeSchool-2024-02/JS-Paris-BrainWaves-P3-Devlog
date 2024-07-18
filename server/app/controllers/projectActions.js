const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const [tasks] = await tables.projects.getAll();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
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

module.exports = { browse, read };
