const argon2 = require("argon2");
const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(item) {
    const [result] = await this.database.query(
      "INSERT INTO user(email, user_name, password, is_admin) VALUES(?, ?, ?, 0)",
      [item.email, item.username, await argon2.hash(item.password)]
    );

    if (result.insertId) {
      return result.insertId;
    }
    return false;
  }

  async login(item) {
    const [[result]] = await this.database.query(
      "SELECT id, password FROM user WHERE user_name=?",
      [item.username]
    );

    if (result) {
      if (await argon2.verify(result.password, item.password)) {
        return result;
      }
    }
    return null;
  }

  async getById(id) {
    const [result] = await this.database.query(
      "SELECT * FROM user WHERE id=?",
      [id]
    );

    return result;
  }

  async updateUserName(id, newName) {
    const [result] = await this.database.query(
      "UPDATE user SET user_name=? WHERE id=?",
      [newName, id]
    );
    return result.affectedRows > 0;
  }

  async updateProfilePic(id, profilePic) {
    const [result] = await this.database.query(
      "UPDATE user SET profilePic=? WHERE id=?",
      [profilePic, id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = UserRepository;
