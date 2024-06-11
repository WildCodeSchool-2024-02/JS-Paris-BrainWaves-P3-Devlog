const tables = require("../../database/tables");

const signupAction = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const dbResponse = await tables.users.create({ email, username, password });
    const createdUser = await tables.users.getById(dbResponse);
    res.json(createdUser);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signupAction,
};
