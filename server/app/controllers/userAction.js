const tables = require("../../database/tables");

const signupAction = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const dbResponse = await tables.users.create({ email, username, password });
    const createdUser = await tables.users.getById(dbResponse);
    if(createdUser === true){
      res.json({"success":"created"})
    }else{
      res.json({"error":"invalid"})
    }
  } catch (e) {
    next(e);
  }
};

const loginAction = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const dbResponse = await tables.users.login({ username, password });
    if (dbResponse === true) {
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
