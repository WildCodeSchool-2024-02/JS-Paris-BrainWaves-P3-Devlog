// Import the repository modules responsible for handling data operations on the tables
const UserRepository = require("./models/userRepository");

const TaskRepository = require("./models/TaskRepository");
const ItemRepository = require("./models/ItemRepository");

const ProjectRepository = require("./models/ProjectRepository");

const TaskHomeRepository = require("./models/TaskHomeRepository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.users = new UserRepository();
tables.task = new TaskHomeRepository();
tables.task = new TaskRepository(); 
tables.item = new ItemRepository();
tables.projects = new ProjectRepository(); 

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
