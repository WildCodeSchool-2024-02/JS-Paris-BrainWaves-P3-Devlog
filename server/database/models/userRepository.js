const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(item) {
    const [result] = await this.database.query(
      "INSERT INTO user(email, username, password, is_admin) VALUES(?, ?, ?, 0)",
      [item.email, item.username, item.password]
    );

    return result.insertId;
  }

  async getById(id) {
    const [result] = await this.database.query(
      "SELECT * FROM user WHERE id=?",
      [id]
    );

    return result;
  }
}

module.exports = UserRepository;
