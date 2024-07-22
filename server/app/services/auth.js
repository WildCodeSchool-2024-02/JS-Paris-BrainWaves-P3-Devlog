const jwt = require('jsonwebtoken');
const tables = require('../../database/tables');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    const user = await tables.users.getById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.user = user[0]; // Attach the user object to the request
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
