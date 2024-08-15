const express = require("express"); // Import express module
const dotenv = require("dotenv"); // Import dotenv module to load environment variables
const db = require("./config/mongoose"); // Import the mongoose configuration to connect to the database
const auth = require("./routers/authrout"); // Import the authentication router module
const app = express(); // Create an instance of express

app.use(express.json()); // Middleware to parse JSON bodies in requests

dotenv.config(); // Load environment variables from .env file

app.use("/", auth); // Use the authentication router for handling routes starting with "/"

// Default error handling middleware
app.use((err, req, res, next) => {
    if (res.headersSent) { // Check if headers have already been sent
        return res.status(200).json({ message: "Success" }); // If headers are sent, respond with success
    }
    res.status(500).json({ error: err.message || "Internal Server Error" }); // Otherwise, respond with an error message
});

// Start the server and listen on the port specified in environment variables
app.listen(process.env.PORT, () => {
    console.log(`Running on ${process.env.PORT} port`); // Log a message indicating the server is running
});
