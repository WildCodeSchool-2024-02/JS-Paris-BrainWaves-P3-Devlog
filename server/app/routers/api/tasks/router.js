const express = require("express");

const router = express.Router();

const { browse, getByStatus } = require("../../../controllers/taskActions");

router.get("/", browse);

router.get("/status/:status", getByStatus);

// router.post('/task', addTask);

module.exports = router;
