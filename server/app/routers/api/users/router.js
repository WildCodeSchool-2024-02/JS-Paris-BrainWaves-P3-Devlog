const express = require("express");

const router = express.Router();

const {
  signupAction,
  loginAction,
} = require("../../../controllers/userAction");



router.get("/", (req, res) => {
  res.json("working");
});

router.post("/signup", signupAction);
router.post("/login", loginAction);

module.exports = router;
