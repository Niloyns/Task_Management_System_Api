const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords
const User = require('../model/UserSchema'); // Import the User model
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for creating JWT tokens

// Register/signup function
module.exports.signup = async (req, res) => {
    console.log("signup"); // Log the signup process
    try {
        const { name, username, password } = req.body; // Destructure the name, username, and password from the request body

        // Check if a user with the given username already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(500).json({ message: "Username already exists" }); // Return error if the username already exists
        }

        // Hash the password with bcrypt
        const hashpassword = await bcrypt.hash(password, 10);

        // Create a new user instance with the provided name, username, and hashed password
        const newuser = new User({
            name: name,
            username: username,
            password: hashpassword
        });

        // Save the new user to the database
        await newuser.save();

        // Send a success response
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

// Change password function
module.exports.changePassword = async (req, res) => {
    try {
        const { username, currentpassword, newpassword } = req.body; // Destructure the username, currentPassword, and newPassword from the request body

        // Find the user by username
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" }); // Return error if user is not found
        }

        // Verify the current password
        const isMatch = await bcrypt.compare(currentpassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" }); // Return error if current password is incorrect
        }

        // Hash the new password
        const hashNewPassword = await bcrypt.hash(newpassword, 10);

        // Update the user's password with the new hashed password
        user.password = hashNewPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" }); // Return success message
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: error.message }); // Respond with a server error
    }
};

// Login function
module.exports.login = async (req, res) => {
    const { username, password } = req.body; // Destructure username and password from the request body

    try {
        const user = await User.findOne({ username: username }); // Find user by username
        if (!user) { // If user is not found
            return res.status(400).json({ message: 'Invalid username or password' }); // Respond with an error message
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); // Compare provided password with stored hashed password
        if (!isPasswordValid) { // If password is not valid
            return res.status(400).json({ message: 'Invalid username or password' }); // Respond with an error message
        }

        // Create a JWT token with user ID and username, and set expiration time
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '10h' });
        res.status(200).json({ token: token }); // Respond with the token

    } catch (error) {
        console.error(error); // Log any errors
        res.status(500).json({ error: 'Internal server error' }); // Respond with a server error message
    }
};
