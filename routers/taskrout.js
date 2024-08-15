const express = require("express"); // Import express module
const router = express.Router(); // Create a new router object

const { 
    postTask, // Import postTask function from TaskController
    multipleTask, // Import multipleTask function from TaskController
    updateTask, // Import updateTask function from TaskController
    getTask, // Import getTask function from TaskController
    deleteTask, // Import deleteTask function from TaskController
    searchTask, // Import searchTask function from TaskController
    deleteMultipleTasksByIds // Import deleteMultipleTasksByIds function from TaskController
} = require("../controllers/TaskController"); // Import controller functions

const { changePassword } = require("../controllers/userController"); // Import changePassword function from userController

router.post("/", postTask); // Handle the POST request to create a new task
router.post("/all", multipleTask); // Handle the POST request to create multiple tasks
router.put("/:id", updateTask); // Handle the PUT request to update an existing task by ID
router.get("/", getTask); // Handle the GET request to fetch all tasks
router.get("/search", searchTask); // Handle the GET request to search tasks by title
router.delete("/:id", deleteTask); // Handle the DELETE request to delete an existing task by ID
router.post("/deleteMany", deleteMultipleTasksByIds); // Handle the DELETE request to delete multiple tasks by IDs
router.post("/change-password", changePassword); // Handle the POST request to change a user's password

module.exports = router; // Export the router object
