const express = require("express");

const router = express.Router();

const {
  browse,
} = require("../../../controllers/task-homeAction");

router.get("/", browse);

// router.post("/add", addTask);

module.exports = router;