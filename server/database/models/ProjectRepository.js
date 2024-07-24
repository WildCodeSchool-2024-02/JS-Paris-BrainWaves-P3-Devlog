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

  async deleteProject(id) {
    const query = `delete from ${this.table} where id=${id}`;
    return this.database.query(query);
  }

  async archive(id, isArchived) {
    const query = `UPDATE ${this.table} SET is_archived=${isArchived} WHERE id=${id}`;
    return this.database.query(query);
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

  async create(name, teamId, userId, isArchived =0) { // defaut value for is_archive is 0 = not archived
    const query = `insert into ${this.table} (name, team_id, user_id, is_archived) values (?, ?, ?, ?)`;
    const [result] = await this.database.query(query, [name, teamId, userId, isArchived]);
    return result.insertId;
  }
}

module.exports = ProjectRepository;
