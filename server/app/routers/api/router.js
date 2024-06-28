const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRoutes = require("./users/router"); // Management des utilisateurs
const tablesRoutes = require("./tables/router"); // Management des tableaux
const taskRoutes = require("./tasks/router");

router.use("/users", usersRoutes);
router.use("/tables", tablesRoutes);
router.use("/task", taskRoutes);
/* ************************************************************************* */

module.exports = router;
