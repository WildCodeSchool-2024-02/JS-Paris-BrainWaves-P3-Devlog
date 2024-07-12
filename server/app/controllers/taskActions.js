const tables = require("../../database/tables");

const browse = async ({ res, next }) => {
    try {
        const [tasks] = await tables.task.getAll();
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

const addTask = async (req, res, next) => {
    try {
        const { userId, text, status } = req.body;
        if (!userId || !status) {
            return res.status(400).json({ message: 'Missing required information: userId and status' });
        }
        const [results] = await tables.task.create({ text, status, userId });
        res.status(201).json(results);
    } catch (error) {
        next(error);
    } return true;
};

const deleteTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        if (!taskId) {
            return res.status(400).json({ message: "missing taskId" });
        }
        await tables.task.archive(taskId);
        res.status(200).json({ message: 'task archived succefully'});
    } catch (error) {
        next(error);
    } return(true)
};

module.exports = { browse, addTask, deleteTask }; 