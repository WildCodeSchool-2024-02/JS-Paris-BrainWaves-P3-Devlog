const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");
const UserRepository = require("../../database/models/userRepository");

const signupAction = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const dbResponse = await tables.users.create({ email, username, password });
    const createdUser = await tables.users.getById(dbResponse);

    if (createdUser[0].id) {
      res.json({
        ok: createdUser[0],
      });
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

    if (dbResponse) {
      const token = jwt.sign({ id: dbResponse.id }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign(
        { id: dbResponse.id },
        process.env.APP_SECRET,
        {
          expiresIn: "30d",
        }
      );
      return res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "lax",
        })
        .json({
          user: dbResponse,
          token,
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

  if (decoded.id) {
    const user = await tables.users.getById(decoded.id);
    if (user && user[0] && user[0].password) {
      delete user[0].password;
      return res.header("Authorization", accessToken).json(user);
    }
  }
  return res.status(401).send("Access Denied.");
};

const logoutAction = async ({ res }) => {
  res.clearCookie("refreshToken").sendStatus(200);
};

const updateUserName = async (req, res, next) => {
  try {
    const { newName } = req.body;
    const userId = req.user.id;

    const isUpdated = await UserRepository.updateUserName(userId, newName);

    if (isUpdated) {
      const updatedUser = await UserRepository.getById(userId);
      const accessToken = jwt.sign({ id: userId }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.json(updatedUser[0]);
    } else {
      res.json(400).json({ error: "Unsuccessfully" });
    }
  } catch (error) {
    next(error);
  }
};

const updateProfilePic = async (req, res, next) => {
  try {
    console.info(req.file, req.user);
    const uploadDest = `http://localhost:${process.env.PORT}/upload/`;
    if (req.file) req.body.profile_pic = uploadDest + req.file.filename;
    const isUpdated = await UserRepository.updateProfilePic(
      req.user.id,
      req.body.profile_pic
    );
    if (isUpdated) {
      const updatedUser = await UserRepository.getById(req.user.id);
      res.status(200).json(updatedUser[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupAction,
  loginAction,
  logoutAction,
  refresh,
  updateUserName,
  updateProfilePic,
};
