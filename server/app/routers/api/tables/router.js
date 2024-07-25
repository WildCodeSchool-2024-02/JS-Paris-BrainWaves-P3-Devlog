const express = require("express");
const { auth } = require("../../../services/auth");

const router = express.Router();

router.get("/", auth, (req, res) => {
  res.json("working");
});

module.exports = router;
