const express = require("express");

const router = express.Router();

const {
  browse,
  deleteTask,
  add,
} = require("../../../controllers/taskActions");

router.get("/project/:id", browse);
router.post("/", add);
router.delete("/", deleteTask);



module.exports = router;
