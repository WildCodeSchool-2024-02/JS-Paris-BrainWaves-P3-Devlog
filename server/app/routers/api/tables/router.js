const express = require("express");

const router = express.Router();

<<<<<<TaskManager-Home
router.get("/", (req, res) => {
  res.json("working");
=======
router.get("/",(req, res) => {
    res.json("working");
>>>>>>dev
});

module.exports = router;