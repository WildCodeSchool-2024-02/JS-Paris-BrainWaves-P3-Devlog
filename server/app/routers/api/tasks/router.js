const express = require("express");


const router = express.Router();

const { browse , getByStatus} = require("../../../controllers/taskActions");

router.get("/", browse);

router.get("/task/status/:status", getByStatus);


module.exports = router;
