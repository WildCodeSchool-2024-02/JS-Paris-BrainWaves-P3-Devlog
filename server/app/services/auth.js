const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
     const authHeader = req.headers.authorization;
     if (!authHeader) {
          return res.status(403).json({ error: "no token provied" });
     }
     const token = authHeader.split('')[1];
     if (!token) {
          return res.status(403).json({ error: "no token provided" });
     }
     jwt.verify(token, process.env.APP_SECRET, (error, decoded) => {
          if (error) {
               return res.status(500).json({ error: "failed to authenticate token" });
          }
          req.userId = decoded.id;
          next();
          return (true);
     }); return (true);
};

module.exports = { verifyToken };