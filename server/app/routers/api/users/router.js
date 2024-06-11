const express = require("express");
const { signupAction } = require("../../../controllers/userAction");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("working");
});

router.post("/signup", signupAction);

module.exports = router;
