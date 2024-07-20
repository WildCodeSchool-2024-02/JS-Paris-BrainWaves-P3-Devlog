const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const user = await tables.user.readAll();

    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { browse };
