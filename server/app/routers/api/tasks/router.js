const express = require("express");

const router = express.Router();

const { browse, addTask } = require("../../../controllers/taskActions");

const { verifyToken } = require("../../../services/auth");

router.get("/", verifyToken, browse);

router.post("/add", verifyToken, addTask);


module.exports = router;
