const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    try {
      req.auth = jwt.verify(token, process.env.APP_SECRET);
    } catch {
      throw new Error("Authorization header is invalid");
    }

    next();
  } catch (error) {
    next(error);
  }
  return true;
};

exports.auth = auth;
