const AbstractRepository = require("./AbstractRepository");

class TaskRepository extends AbstractRepository {
    constructor() {
        super({ table: "Task" });
    }

    async getAll() {
        const query = `SELECT * FROM ${this.table}`;
        const results = await this.database.query(query);
        return results;
    }

    async create(taskDetails) {
        const { text, status, userId, projectId } = taskDetails;

        console.info(projectId)
        const query = `INSERT INTO ${this.table} (name, description, is_achived, Project_id1) VALUES (?, ?, 0, ?)`;
        const [result] = await this.database.query(query, [text, status, projectId]);
        return { Task_id: result.insertId, text, userId, status };
    }

    async archive(taskId) {
        const query = `UPDATE ${this.table} SET status = 'archived' WHERE Task_id = ?`;
        await this.database.execute(query, [taskId]);
    }
}

module.exports = TaskRepository;
