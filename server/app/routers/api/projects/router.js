const express = require("express");

const { browse, read, create } = require("../../../controllers/projectActions");

const router = express.Router();

router.get("/", browse);

router.get("/:id", read);

router.post("/create", create);

module.exports = router;
