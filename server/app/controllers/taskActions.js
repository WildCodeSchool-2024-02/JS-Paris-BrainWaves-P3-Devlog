const tables = require("../../database/tables");

const browse = async (req, res, next) => {
    try {
        const {projectId} = req.query.body;
        if (!projectId) {
            return res.status(400).json({ message: "missing "});
        }
        const tasks = await tables.task.getAll(projectId);
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }return(true)
};

const addTask = async (req, res, next) => {
    try {
        const { text, status, projectId } = req.body;
        const userId = req.body.user.id;

        console.info(projectId)

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