const mongoose = require("mongoose"); // Import mongoose module

// Define a new schema for the Todo model
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String, // Define the type of the title field as String
      required: true, // Make the title field required
    },
    description: {
      type: String, // Define the type of the description field as String
      required: true, // Make the description field required
    },
    user: {
      type: mongoose.Types.ObjectId, // Reference to User model by ObjectId /mongo db document _id is typeof ObjectId
      ref: "User", // Referencing the "User" model
      required: true, // Ensure a user ID is always provided
    }
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Add a custom query method to the schema for searching todos by title
taskSchema.query.searchTask = function (searchitem) {
  return this.find({ title: new RegExp(searchitem, "i") }); // Use a regular expression for case-insensitive search
};

// Create a model named "Task" using the todoSchema
const Task = mongoose.model("Task", taskSchema);

// Export the Todo model
module.exports = Task;
