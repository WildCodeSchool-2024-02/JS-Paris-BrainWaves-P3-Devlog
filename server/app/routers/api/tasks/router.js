const express = require("express");
const { auth } = require("../../../services/auth");

const router = express.Router();

const {
  browse,
  addTask,
  deleteTask,
  add,
} = require("../../../controllers/taskActions");

router.get("/project/:id", auth, browse);
router.post("/", auth, add);
router.delete("/", auth, deleteTask);
router.post("/add", auth, addTask);

module.exports = router;
