const express = require("express");

const router = express.Router();

const {
  browse,
  addTask,
  deleteTask,
  add,
} = require("../../../controllers/taskActions");

router.get("/project/:id", browse);
router.post("/", add);
router.delete("/", deleteTask);
router.post("/add", addTask);


module.exports = router;
