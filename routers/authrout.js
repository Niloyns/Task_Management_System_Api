const express = require("express"); // Import express module
const router = express.Router(); // Create a new router object
const Taskrout = require("./taskrout"); // Import the user routes
const { signup, login } = require("../controllers/userController"); // Import controller functions
const { verifyToken } = require("../config/verifyJwtToken"); // Import token verification middleware

// Handle the POST request to signup a new user
router.post("/signup", signup);

// Handle the POST request to login a user
router.post("/login", login);

// Use token verification middleware and user routes for all /task routes
router.use("/task", verifyToken, Taskrout);

module.exports = router; // Export the router object
