const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const signupAction = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const dbResponse = await tables.users.create({ email, username, password });
    const createdUser = await tables.users.getById(dbResponse);

    if (createdUser[0] === true) {
      res.json(createdUser[1]);
    } else {
      res.json({ error: "invalid" });
    }
  } catch (e) {
    next(e);
  }
};

const loginAction = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const dbResponse = await tables.users.login({ username, password });
    if (dbResponse[0] === true) {
      const refreshToken = jwt.sign(
        { id: dbResponse[1] },
        process.env.APP_SECRET,
        {
          expiresIn: "7d",
        }
      );
      return res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "lax",
        })
        .json({
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

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).send("Access Denied.");
  }
  const decoded = jwt.verify(refreshToken, process.env.APP_SECRET);
  const accessToken = jwt.sign(
    { id: decoded.id, role: decoded.role },
    process.env.APP_SECRET,
    {
      expiresIn: "1h",
    }
  );

  if(decoded.id){
    const user = await tables.users.getById(decoded.id);
    delete user[0].password
    return res.header("Authorization", accessToken).json(user);
  }
  return res.status(401).send("Access Denied.");
};

const logoutAction = async ({ res }) => {
  res.clearCookie("refreshToken").sendStatus(200);
};

module.exports = {
  signupAction,
  loginAction,
  logoutAction,
  refresh,
};
