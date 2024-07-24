const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    next();
    return false;
  }
  const decoded = jwt.verify(refreshToken, process.env.APP_SECRET);

  if (!decoded.id) {
    res.status(401).send("Access Denied.");
  } else {
    next();
  }

  return true;
};

exports.auth = auth;
