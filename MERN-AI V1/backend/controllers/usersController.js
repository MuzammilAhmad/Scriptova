const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//----------Register----------//
const register = asyncHandler(
  async (req, res) => {
    // try {
    // Destructure the request body
    const { username, email, password } = req.body;
    //Validate the input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // return res.status(400).json({ message: "User already exists" });
      res.status(400);
      throw new Error("User Already Exists");
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Add the date the trial will expire
    newUser.trialExpires = new Date(
      // 1 month from now
      new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
    ); // trialPeriod in days

    // Save the user
    await newUser.save();
    res.json({
      status: true,
      message: "User Registration Successful",
      user: {
        // id: newUser._id,
        // username: newUser.username,
        // email: newUser.email,
        // trialExpires: newUser.trialExpires,
        username,
        email,
      },
    });
  }

  // catch (error) {
  // console.error("Error during registration:", error);
  // return res.status(500).json({ message: "Internal server error" });
  //   throw new Error(error);
  // }
  // });
);

//----------Login----------//
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validate the input
  if (!email || !password) {
    return res.status(400).json({ message: "All Fields are Required" });
  }
  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  //Generate a JWT token
  // Sent token into cookie, httpOnly, secure, sameSite

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "3d" } // Token expiration time
  );

  // console.log("JWT Token:", token);

  // Set the token in a cookie
  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax", // Lax for dev, Strict for prod
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });

  // Return the user data
  res.json({
    // status: true,
    status: "success",
    message: "Login Successful",
    token: token, // Include token in response for localStorage
    _id: user?._id,
    username: user?.username,
    email: user?.email,
  });
});

//----------Logout----------//
const logout = asyncHandler(async (req, res) => {
  // Clear the cookie
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    maxAge: 1, // Set maxAge to 1 to delete the cookie
  });
  // res.clearCookie("token");

  res.status(200).json({ message: "Logout successful" });
});

//----------Profile----------//
const userProfile = asyncHandler(async (req, res) => {
  // Get the user ID from the JWT token

  // const userId = "68613789349037d67860201a";
  // const user = await User.findById(userId).select("-password");
  // const user = await User.findById(req.user._id).select("-password");

  const user = await User.findById(req?.user?.id)
    .select("-password")
    .populate("payments")
    .populate({
      path: "history",
      options: { sort: { createdAt: -1 } },
    });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.status(200).json({
      status: "success",
      message: "User profile Retrieved Successfully",
      user,
    });
  }
}); // Return user profile

//----------Check User Auth Status----------//
// const checkAuth = asyncHandler(async (req, res) => {
//   const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
//   if (decoded) {
//     res.json({
//       isAuthenticated: true,
//     });
//   } else {
//     res.json({
//       isAuthenticated: false,
//     });
//   }
// });

//----------Check User Auth Status----------//
const checkAuth = asyncHandler(async (req, res) => {
  try {
    // If we get here, the isAuthenticated middleware has already verified the token
    res.json({
      isAuthenticated: true,
      user: req.user,
    });
  } catch (error) {
    res.status(401).json({
      isAuthenticated: false,
      message: "Authentication Failed",
    });
  }
});

module.exports = {
  register,
  login,
  logout,
  userProfile,
  checkAuth,
};
