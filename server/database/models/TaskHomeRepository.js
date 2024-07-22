const AbstractRepository = require("./AbstractRepository");

class TaskHomeRepository extends AbstractRepository {
  constructor() {
    super({ table: "task" });
  }

  async getAll() {
    const query = `select * from ${this.table}`;
    const [result] = await this.database.query(query);
    console.log(result)
    return rows;
  }

  async readAll() {

    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async read(id) {
    const query = 'SELECT * FROM task WHERE task_id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows;
  }
}

module.exports = TaskHomeRepository;
