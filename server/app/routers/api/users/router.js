const express = require("express");
const {
  signupAction,
  loginAction,
} = require("../../../controllers/userAction");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("working");
});

router.post("/signup", signupAction);
router.post("/login", loginAction);

module.exports = router;
