const mongoose = require("mongoose"); // Import mongoose module

// Define a new schema for the UserSchema model
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Define the type of the name field as String
      required: true, // Make the name field required
    },
    username: {
      type: String, // Define the type of the username field as String
      required: true, // Make the username field required
      unique: true // Make the username field unique
    },
    password: {
      type: String, // Define the type of the password field as String
      required: true, // Make the password field required
    }
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Export the User model
module.exports = mongoose.model("User", UserSchema);
