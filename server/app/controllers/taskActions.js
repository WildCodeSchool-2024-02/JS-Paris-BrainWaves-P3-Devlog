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
        const status = req.body;
        const tasks = await tables.task.getByStatus(status);
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

module.exports = { browse, getByStatus, };
