const AbstractRepository = require("./AbstractRepository");

class TaskRepository extends AbstractRepository {
  constructor() {
    super({ table: "User_has_Task" });
  }

  async getAll() {
    const query = `SELECT * FROM Task`;
    const results = await this.database.query(query);
    return results;
  }

  async addTask(taskDetails) {
    const { userId, status } = taskDetails;
    const query = `INSERT INTO ${this.table} (User_id, status, Task_id) VALUES (?, ?)`;
    const [result] = await this.database.execute(query, [userId, status]);
    return { Task_id: result.insertId, userId, status };
  }

  async create(task, description, projectId, section) {
    return this.database.query(
      `INSERT INTO Task (name, description, is_archived, Project_id1, section) VALUES (?, ?, ?, ?, ?)`,
      [task, description, 0, projectId, section]
    );
  }

  async archive(taskId) {
    const query = `UPDATE ${this.table} SET status = 'archived' WHERE Task_id = ?`;
    await this.database.execute(query, [taskId]);
  }
}

module.exports = TaskRepository;
