const tables = require("../../database/tables");

const browse = async ({ res, next }) => {
    try {
        const [tasks] = await tables.task.getAll();
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

const getByStatus = async (req, res, next) => {
    try {
        const { status } = req.params;
        const tasks = await tables.task.getByStatus(status);
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
}

const addTask = async (req, res, next) => {
    try {
        const [results] = await tables.task.addTask(req.body);
        res.status(201).json(results);
    } catch (error) {
        next(error);
}
}


module.exports = { browse, getByStatus, addTask }; 