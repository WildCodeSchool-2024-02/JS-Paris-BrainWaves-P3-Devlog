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

    async getByStatus(status) {
        const query = `SELECT * FROM ${this.table} WHERE status = ?`;
        const [results] = await this.database.query(query, [status]);
        return results;
    }

 /*   async addTask(taskDetails) {
        const { User_id, status } = taskDetails;
        const query = `INSERT INTO ${this.table} (User_id, status) VALUES (?, ?)`;
        const [result] = await this.database.execute(query, [User_id, status]);
        return { Task_id: result.insertId, User_id, status };
    } */
} 

module.exports = TaskRepository;
