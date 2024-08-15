const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token verification

// Middleware function to verify JWT token
module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Get the Authorization header from the request

    // Check if Authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied. Invalid or no token provided.' });
    }

    // Extract the token part from the Authorization header
    const token = authHeader.split(' ')[1]; // Split the header to get the token (split by space and take the second part)

    try {
        // Verify the token using jwt.verify and process.env.JWT_SECRET
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the verified user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' }); // Handle errors if token verification fails
    }
};