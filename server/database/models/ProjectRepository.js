const AbstractRepository = require("./AbstractRepository");

class ProjectRepository extends AbstractRepository {
  constructor() {
    super({ table: "project" });
  }

  async getAll() {
    const query = `select * from ${this.table}`;
    const results = await this.database.query(query);
    return results;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(name, team_id, user_id, is_archived = 0) {  // Default value for is_archived is 0 (not archived)
    const query = `INSERT INTO ${this.table} (name, team_id, user_id, is_archived) VALUES (?, ?, ?, ?)`;
    const [result] = await this.database.query(query, [name, team_id, user_id, is_archived]);
    return result.insertId;
  }
}
module.exports = ProjectRepository;
