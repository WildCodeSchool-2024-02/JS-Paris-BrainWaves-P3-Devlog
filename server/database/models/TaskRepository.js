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

}

module.exports = TaskRepository;
