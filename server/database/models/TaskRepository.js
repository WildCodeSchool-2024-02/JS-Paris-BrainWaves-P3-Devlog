const AbstractRepository = require("./AbstractRepository");

class TaskRepository extends AbstractRepository {
  constructor() {
    super({ table: "Task" });
  }

  async getAll(projectId) {
    const query = `SELECT * FROM ${this.table} WHERE Project_id = ?`;
    const results = await this.database.query(query, [projectId]);
    return results;
  }

  async create(taskName, section, projectId, description) {
    return this.database.query(
      `INSERT INTO Task (name, description, is_archived, Project_id, section) VALUES (?, ?, ?, ?, ?)`,
      [taskName, description, 0, projectId, section]
    );
  }

  async archive(taskId) {
    const query = `UPDATE ${this.table} SET status = 'archived' WHERE Task_id = ?`;
    await this.database.execute(query, [taskId]);
  }
}

module.exports = TaskRepository;
