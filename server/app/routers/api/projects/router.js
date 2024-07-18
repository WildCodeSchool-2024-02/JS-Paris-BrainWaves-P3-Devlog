const express = require("express");
// const { browse } = require("../../../controllers/itemActions");
const { browse } = require("../../../controllers/projectActions");

const router = express.Router();

// router.get("/", ( req, res ) => {
//     res.json("working")
// });
router.get("/:id", browse);

module.exports = router;
