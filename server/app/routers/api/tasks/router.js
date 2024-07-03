const express = require("express");

const router = express.Router();

const { browse, addTask } = require("../../../controllers/taskActions");

router.get("/", browse);

router.post("/addtask", addTask);

module.exports = router;
