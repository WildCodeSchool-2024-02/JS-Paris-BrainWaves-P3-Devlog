const argon2 = require('argon2');
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

    if(result.insertId){
      return true
    }
    return false;
  }

  async login(item) {
    const [result] = await this.database.query(
      "SELECT id, password FROM user WHERE user_name=?",
      [item.username]
    );


    if(result[0] && result[0].password){
      if(await argon2.verify(result[0].password, item.password)){
        return [true, result[0].id]
      }
    }

    return [false, result[0].id]
  }

  async getById(id) {
    const [result] = await this.database.query(
      "SELECT * FROM user WHERE id=?",
      [id]
    );

    return result;
  }

  async updateUserName(id, newName) {
    const [result] = await this.database.query('UPDATE user SET username=? WHERE id=?', [newName, id]
    ); 
    return result; 
 }
  
}

module.exports = UserRepository;
