const Task = require("../model/taskschema"); // Import the Task model

// Get all tasks
module.exports.getTask = async (req, res) => {
    try {
        const userId = req.user.id; // Get the authenticated user's ID from the request
        const userTasks = await Task.find({ user: userId }).populate('user', 'name username'); // Fetch tasks specific to the user and populate user details
        
        if (!userTasks.length) { // Check if there are no tasks for the user
            return res.status(404).json({ error: 'No tasks found for this user' }); // Respond with an error if no tasks found
        }

        console.log(userTasks); // Log the fetched tasks
        res.status(200).json({ tasks: userTasks }); // Respond with the fetched tasks
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

// Function to search for tasks by title // http://localhost:5000/task/search?task="search"
module.exports.searchTask = async (req, res) => {
    try {
        const userId = req.user.id; // Get the authenticated user's ID from the request
        const searchTerm = req.query.task; // Get the search term from the query parameters
        if (!searchTerm) {
            return res.status(400).json({ error: "Search term 'task' is required" }); // Return a 400 Bad Request if 'q' parameter is missing
        }

        const findData = await Task.find({ user: userId }).populate('user', 'name username').searchTask(searchTerm); // Use the custom query method to find tasks by title
        if (!findData.length) {
            return res.status(404).json({ message: "No tasks found" }); // Return a 404 if no tasks match the search term
        }

        res.status(200).json({ message: findData }); // Respond with the found tasks
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

// Post a new task
exports.postTask = async (req, res) => {
    try {
      const { title, description } = req.body;
      const userId = req.user.id; // Assuming req.user contains the authenticated user's ID
  
      const newTask = new Task({
        title,
        description,
        user: userId, // Assign the authenticated user's ID to the task's user field
      });
  
      await newTask.save();
      res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };

// Post multiple tasks
module.exports.multipleTask = async (req, res) => {
    const tasks = req.body.map(task => ({ // Map through each task in the request body /  param=>({key:value}) its a direct return arrow functions
        ...task, // Spread the properties of each task
        user: req.user.id, // Assign the authenticated user's ID to each task's user field
    }));

    try {
        await Task.insertMany(tasks); // Insert multiple tasks into the database
        res.status(200).json({ message: "Successfully inserted multiple tasks" }); // Respond with a success message
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

// Update a task
module.exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id }, // Find the task by ID from the request parameters
            { $set: req.body }, // Set the updated fields from the request body
            { new: true } // Return the updated document
        );
        if (!updatedTask) { // Check if the task was not found
            return res.status(404).json({ message: "Task Not Found" }); // Respond with an error if task not found
        }
        res.status(200).json({ message: updatedTask }); // Respond with the updated task
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

// Delete a task
module.exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id; // Get the ID from request params
        const deleteTask = await Task.findByIdAndDelete(taskId); // Find and delete the document by ID
        console.log(deleteTask); // Log the deleted task
        if (!deleteTask) { // Check if the task was not found
            return res.status(404).json({ message: "Task Not Found" }); // Return 404 if task not found
        }
        res.status(200).json({ message: `Deleted task with title: ${deleteTask.title}` }); // Return success message with title of deleted task
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Return error message if something goes wrong
    }
};

// Delete multiple tasks by IDs
module.exports.deleteMultipleTasksByIds = async (req, res) => {
    try {
        const ids = req.body.ids; // Assume the IDs are sent in the request body as an array
        if (!ids || !Array.isArray(ids)) { // Check if IDs are provided and are in an array format
            return res.status(400).json({ error: "No valid IDs provided" }); // Return error if IDs are not valid
        }

        const result = await Task.deleteMany({ _id: { $in: ids } }); // Use deleteMany with $in operator to match and delete the provided IDs
        if (result.deletedCount === 0) { // Check if any tasks were deleted
            return res.status(404).json({ message: "No tasks matched the provided IDs" }); // Return error if no tasks matched the provided IDs
        }
        
        res.status(200).json({ message: `${result.deletedCount} tasks deleted` }); // Return success message with the number of deleted tasks
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

