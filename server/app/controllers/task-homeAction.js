const tables = require("../../database/tables");


const browse = async (req, res, next) => {
  try {
    const tasks = await tables.task.getAll();
    console.log(tasks)
    if (!tasks || tasks.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const tasks = await tables.task.read(id);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, read };


