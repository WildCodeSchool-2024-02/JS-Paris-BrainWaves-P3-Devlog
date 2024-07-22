const express = require("express");

const router = express.Router();

const setAuth = require("../../../services/auth");

const {
  signupAction,
  loginAction,
  logoutAction,
  refresh,
  updateUserName,
  updateProfilePic,
} = require("../../../controllers/userAction");

const upload = require("../../../services/fileUpload");

router.get("/", (req, res) => {
  res.json("working");
});


router.get("/logout", logoutAction);
router.post("/signup", signupAction);
router.post("/login", loginAction);
router.get("/refresh", refresh);
router.put("/update-name",setAuth, updateUserName);
router.put("/update-profile-pic", setAuth, upload.single("profilePic"), updateProfilePic);
module.exports = router;
