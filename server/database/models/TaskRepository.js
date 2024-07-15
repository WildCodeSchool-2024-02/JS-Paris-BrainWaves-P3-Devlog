const AbstractRepository = require("./AbstractRepository");

class TaskRepository extends AbstractRepository {
    constructor() {
        super({ table: "User_has_Task" });
    }
 
    async getAll() {
        const query = `SELECT * FROM ${this.table}`;
        const results = await this.database.query(query);
        return results;
    }

    async create(taskDetails) {
        const { text, userId, status } = taskDetails;
        const query = `INSERT INTO ${this.table} (text, User_id, status, Task_id) VALUES (?, ?, ?, ?)`;
        const [result] = await this.database.execute(query, [text, userId, status]);
        return { Task_id: result.insertId, text, userId, status };
    } 

    async archive(taskId) {
        const query = `UPDATE ${this.table} SET status = 'archived' WHERE Task_id = ?`;
        await this.database.execute(query, [taskId]);
    }
} 

module.exports = TaskRepository;
