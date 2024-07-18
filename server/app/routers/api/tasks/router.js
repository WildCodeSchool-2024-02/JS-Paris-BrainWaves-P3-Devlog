const express = require("express");

const router = express.Router();

const {
  browse,
  addTask,
  deleteTask,
  add,
} = require("../../../controllers/taskActions");

router.get("/", browse);
router.post("/", add);

router.post("/add", addTask);

router.delete("/delete/:taskId", deleteTask);

module.exports = router;
