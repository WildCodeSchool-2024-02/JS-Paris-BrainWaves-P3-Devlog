const AbstractRepository = require("./AbstractRepository");

class TaskRepository extends AbstractRepository {
  constructor() {
    super({ table: "task" });
  }

  async getAll(id) {
    const query = `SELECT * FROM ${this.table} JOIN project ON project.id = task.Project_id WHERE project.User_id = ?`;
    const [results] = await this.database.query(query, [id]);
    return results;
  }

  async getById(projectId) {
    const query = `SELECT * FROM ${this.table} WHERE Project_id = ?`;
    const [results] = await this.database.query(query, [projectId]);
    return results;
  }

  async create(item) {
    return this.database.query(
      `INSERT INTO task (name, description, is_archived, section, Project_id) VALUES (?, ?, ?, ?, ?)`,
      [item.task, item.description, 0, item.section, item.projectId]
    );
  }

  async archive(taskId) {
    const query = `UPDATE ${this.table} SET status = 'archived' WHERE Task_id = ?`;
    await this.database.execute(query, [taskId]);
  }
}

module.exports = TaskRepository;
