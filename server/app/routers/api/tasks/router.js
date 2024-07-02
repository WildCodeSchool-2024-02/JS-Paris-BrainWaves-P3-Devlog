const express = require("express");

const router = express.Router();

const { browse, getByStatus, addTask } = require("../../../controllers/taskActions");

router.get("/tasks", browse);

router.get("/status/:status", getByStatus);

router.post("/addtask", addTask);

module.exports = router;
