const express = require("express");

const router = express.Router();

const { browse, addTask, deleteTask } = require("../../../controllers/taskActions");

router.get("/", browse);

router.post("/add", addTask);

router.delete("/delete", deleteTask);

module.exports = router;
