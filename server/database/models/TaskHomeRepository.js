const AbstractRepository = require("./AbstractRepository");

class TaskHomeRepository extends AbstractRepository {
  constructor() {
    super({ table: "task" });
  }

  async getAll(projectId) {
    const query = `SELECT * FROM ${this.table} WHERE Project_id = ?`;
    const results = await this.database.query(query, [projectId]);
    return results;
  }
/*
  async create(name, description, projectId, section) {
    return this.database.query(
      `INSERT INTO task (name, description, is_archived, Project_id, section) VALUES (?, ?, 0, ?, ?)`,
      [name, description, projectId, section]
    );
  } */
} 

module.exports = TaskHomeRepository;
