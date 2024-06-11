const db = require("../../../../database/client");

const createUser = (username, email, password) => {
  try {
    db.query(
      "INSERT INTO users(email, username, password, is_admin) VALUES(?, ?, ?, 0)",
      [email, username, password]
    );
    return {
      success: {
        message: "User Created",
      },
    };
  } catch {
    return {
      error: {
        message: "Database Error",
      },
    };
  }
};

module.exports = {
  createUser,
};
