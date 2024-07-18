const AbstractRepository = require("./AbstractRepository");

class TaskRepository extends AbstractRepository {
    constructor() {
        super({ table: "Task" });
    }

    async getAll(projectId) {
        const query = `SELECT * FROM ${this.table} WHERE Project_id1 = ?`;
        const results = await this.database.query(query[projectId]);
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
        const query = `UPDATE ${this.table} SET is_archived = 1 WHERE id = ?`;
        await this.database.execute(query, [taskId]);
    }
}

module.exports = TaskRepository;
