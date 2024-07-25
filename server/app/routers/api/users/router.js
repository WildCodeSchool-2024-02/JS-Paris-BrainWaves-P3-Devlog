const express = require("express");
const { auth } = require("../../../services/auth");

const router = express.Router();


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
router.put("/update-name", auth, updateUserName);
router.put("/update-profile-pic", upload.single("profilePic"), updateProfilePic);
module.exports = router;
