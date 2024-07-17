const express = require("express");

const router = express.Router();

const { browse } = require("../../../controllers/collaboratorAction");

router.get("/", browse);

module.exports = router;
