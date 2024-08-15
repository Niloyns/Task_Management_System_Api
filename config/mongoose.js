const mongoose = require("mongoose"); // Import mongoose module
const dotenv = require("dotenv"); // Import dotenv module to load environment variables

dotenv.config(); // Load environment variables from .env file

// Connect to MongoDB using the MONGO_URL environment variable
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("mongodb connection success"); // Log success message if connection is successful
    })
    .catch((err) => {
        console.error("mongodb connection error:", err); // Log error message if connection fails
    });

module.exports = mongoose; // Export the mongoose instance for use in other parts of the application
