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

 /* const edit = async (req, res, next) => {
  try {
    console.info(req.file, req.auth);
    const uploadDest = `http://localhost:${process.env.APP_PORT}/upload/`;
  
    if (req.file) req.body.avatar = uploadDest + req.file.filename;
    const [result] = await tables.user.upload(req.body, req.auth.id);

    if (result.affectedRows > 0) {
    const [[user]] = await tables.user.read(req.auth.id);
    res.status(200).json(user);
  }
  else res.sendStatus(404);
 } catch (error) {
   next(error);
 }
} */
module.exports = {
  signupAction,
  loginAction,
};
