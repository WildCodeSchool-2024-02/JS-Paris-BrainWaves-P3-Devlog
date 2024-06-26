const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRoutes = require("./users/router"); // Management des utilisateurs
const projectsRoutes = require("./projects/router"); // Management des projects

router.use("/users", usersRoutes);
router.use("/projects", projectsRoutes);
/* ************************************************************************* */

module.exports = router;
