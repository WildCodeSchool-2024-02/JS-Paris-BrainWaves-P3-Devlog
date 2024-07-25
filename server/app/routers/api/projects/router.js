const express = require("express");
const { auth } = require("../../../services/auth");

const {
  browse,
  read,
  create,
  archive,
  deleteProject,
} = require("../../../controllers/projectActions");

const router = express.Router();

router.get("/", auth, browse);
router.post("/create", auth, create);
router.delete("/:id", auth, deleteProject);
router.get("/archive/:id/:isArchived", auth, archive);
router.get("/:id", auth, read);

module.exports = router;
