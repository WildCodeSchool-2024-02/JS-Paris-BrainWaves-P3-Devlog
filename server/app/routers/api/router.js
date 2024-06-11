const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRoutes = require("./users/router"); // Management des utilisateurs
const tablesRoutes = require("./tables/router"); // Management des tableaux

router.use("/users", usersRoutes);
router.use("/tables", tablesRoutes);
/* ************************************************************************* */

module.exports = router;
