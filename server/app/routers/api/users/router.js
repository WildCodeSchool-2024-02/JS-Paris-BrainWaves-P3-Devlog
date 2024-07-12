const express = require("express");
const {
  signupAction,
  loginAction,
  logoutAction,
  refresh,
} = require("../../../controllers/userAction");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("working");
});


router.get("/logout", logoutAction);
router.post("/signup", signupAction);
router.post("/login", loginAction);
router.get("/refresh", refresh);


module.exports = router;
