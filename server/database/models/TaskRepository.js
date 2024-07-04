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

    async addTask(taskDetails) {
        const { userId, status } = taskDetails;
        const query = `INSERT INTO ${this.table} (User_id, status, Task_id) VALUES (?, ?)`;
        const [result] = await this.database.execute(query, [userId, status]);
        return { Task_id: result.insertId, userId, status };
    } 
} 

module.exports = TaskRepository;
