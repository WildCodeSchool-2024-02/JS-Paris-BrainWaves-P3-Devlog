const tables = require("../../database/tables");

const browse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [tasks] = await tables.task.getAll(id);
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

const add = async (req, res, next) => {
    const { description, projectId, section } = req.body;
    try {
        const result = await tables.task.create(
            description, projectId, section
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
        } await tables.task.archive(taskId);
        res.status(200).json({ message: "task archived succeflly" });
    } catch (error) {
        next(error);
    } return (true);
}
module.exports = { browse, deleteTask, add };
