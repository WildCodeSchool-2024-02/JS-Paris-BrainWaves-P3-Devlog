const express = require("express");

const router = express.Router();

const { browse, getByStatus, addTask } = require("../../../controllers/taskActions");

router.get("/", browse);

router.get("/status", getByStatus);

router.post("/addtask", addTask);

module.exports = router;
