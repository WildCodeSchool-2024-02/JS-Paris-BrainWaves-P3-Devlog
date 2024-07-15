const tables = require("../../database/tables");

const browse = async (req, res, next) => {
    try {
        const [tasks] = await tables.task.getAll();
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

const addTask = async (req, res, next) => {
    try {
        const { text, status } = req.body;
        const {userId} = req.userId;

        if (!userId || !status ||!text) {
            return res.status(400).json({ message: 'Missing required information: userId, status, or text' });
        }
        const [results] = await tables.task.create({ text, status, userId });
        res.status(201).json(results);
    } catch (error) {
        next(error);
    } return true;
};

module.exports = { browse, addTask }; 