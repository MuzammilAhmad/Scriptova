const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const checkApiRequestLimit = asyncHandler(async (req, res, next) => {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Find the User
  const user = await User.findById(req?.user?.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  let requestLimit = 0; // Default value

  // Set request limit based on subscription plan
  if (user?.subscriptionPlan === "Trial") {
    requestLimit = user?.monthlyRequestCount || 10;
  } else if (user?.subscriptionPlan === "Free") {
    requestLimit = user?.monthlyRequestCount || 5;
  } else if (user?.subscriptionPlan === "Basic") {
    requestLimit = user?.monthlyRequestCount || 50;
  } else if (user?.subscriptionPlan === "Premium") {
    requestLimit = user?.monthlyRequestCount || 100;
  }

  // Check if the user has exceeded their API request limit
  if (user?.apiRequestCount >= requestLimit) {
    return res.status(429).json({
      message: "API request limit exceeded. Please upgrade your plan.",
    });
  }

  // Proceed to the next middleware or route handler
  next();
});

module.exports = asyncHandler(checkApiRequestLimit);
