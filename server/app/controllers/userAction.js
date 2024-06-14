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

const loginAction = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const dbResponse = await tables.users.login({ username, password });
    if (dbResponse[0] && dbResponse[0].id) {
      return res.json({
        success: "logged in",
        dbresponse: dbResponse,
      });
    }
    return res.json({
      error: "not found",
    });
  } catch (e) {
    next(e);
  }

  return false;
};

module.exports = {
  signupAction,
  loginAction,
};
