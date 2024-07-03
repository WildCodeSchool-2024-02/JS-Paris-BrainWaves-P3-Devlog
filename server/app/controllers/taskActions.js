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
        const { userId, status } = req.body;
        if (!userId || !status) {
            return res.status(400).json({ message: 'Missing required information: userId and status' });
        }
        const [results] = await tables.task.addTask(req.body);
        res.status(201).json(results);
    } catch (error) {
        next(error);
    } return true;
};

module.exports = { browse, addTask }; 