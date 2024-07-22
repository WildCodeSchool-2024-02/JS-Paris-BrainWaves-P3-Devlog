const express = require("express");

const {
  browse,
  read,
  archive,
  deleteProject,
} = require("../../../controllers/projectActions");

const router = express.Router();

router.get("/", browse);

router.delete("/:id", deleteProject);
router.get("/archive/:id/:isArchived", archive);
router.get("/:id", read);

module.exports = router;
