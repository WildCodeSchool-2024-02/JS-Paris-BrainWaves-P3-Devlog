const express = require("express");

const {
  browse,
  read,
  create,
  archive,
  deleteProject,
} = require("../../../controllers/projectActions");

const router = express.Router();

router.get("/", browse);
router.post("/create", create);
router.delete("/:id", deleteProject);
router.get("/archive/:id/:isArchived", archive);
router.get("/:id", read);

module.exports = router;
