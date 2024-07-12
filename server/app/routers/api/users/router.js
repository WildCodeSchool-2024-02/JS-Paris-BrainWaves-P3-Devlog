const express = require("express");

const router = express.Router();

const {
  signupAction,
  loginAction,
  logoutAction,
  refresh,
} = require("../../../controllers/userAction");



router.get("/", (req, res) => {
  res.json("working");
});


router.get("/logout", logoutAction);
router.post("/signup", signupAction);
router.post("/login", loginAction);
router.get("/refresh", refresh);


module.exports = router;
