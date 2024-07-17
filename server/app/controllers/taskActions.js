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
        const { text, status, projectId } = req.body;
        const userId = req.body.user.id;


        if (!userId || !status || !text || !projectId) {
            return res.status(400).json({ message: 'Missing required information: userId, status, projectId or text' });
        }

        const newTask = await tables.task.create({ text, status, userId, projectId });
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    } return true;
};

module.exports = { browse, addTask }; 