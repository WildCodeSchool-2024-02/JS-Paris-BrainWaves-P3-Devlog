const express = require("express");
const { auth } = require("../../../services/auth");

const router = express.Router();

const { browse } = require("../../../controllers/collaboratorAction");

router.get("/", auth, browse);

module.exports = router;
