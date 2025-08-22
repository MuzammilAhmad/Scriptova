const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import the User model

// This middleware checks if the user is authenticated by verifying the JWT token.

const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in cookies first (existing behavior)
  if (req.cookies.token) {
    token = req.cookies.token;
  }
  // If no cookie token, check Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];

  }

  if (token) {
    try {
      //!Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // the actual login user
      // Add user to the request object
      req.user = await User.findById(decoded?.id).select("-password"); // Exclude password from the user object
      return next(); // Call the next middleware or route handler
    } catch (error) {
      return res
        .status(401)
        .json({
          message: "Invalid token. Please sign in again.",
        });
    }
  } else {
    return res
      .status(401)
      .json({
        message: "Oops! You're not logged in. Please sign in to continue.",
      });
  }
});

module.exports = isAuthenticated;
