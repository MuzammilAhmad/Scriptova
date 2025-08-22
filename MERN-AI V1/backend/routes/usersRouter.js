const express = require("express");
const jwt = require("jsonwebtoken");
const {
  register,
  login,
  logout,
  userProfile,
  checkAuth,
} = require("../controllers/usersController");

const isAuthenticated = require("../MIDDLEWARES/isAuthenticated");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/logout", logout);
usersRouter.get("/profile", isAuthenticated, userProfile);
// Create a separate route for auth check that doesn't require authentication
usersRouter.get("/auth/check", (req, res) => {
  try {
    let token;

    // Check for token in cookies first
    if (req.cookies.token) {
      token = req.cookies.token;
    }
    // If no cookie token, check Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.json({
        isAuthenticated: true
      });
    } else {
      res.json({
        isAuthenticated: false
      });
    }
  } catch (error) {
    res.json({
      isAuthenticated: false
    });
  }
});

module.exports = usersRouter;
