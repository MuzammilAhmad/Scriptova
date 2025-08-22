const express = require("express");
const usersRouter = require("./routes/usersRouter");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/connectDB");
const errorHandler = require("./MIDDLEWARES/errorMiddleware.js");
const openAIRouter = require("./routes/openAIRouter.js");
const stripeRouter = require("./routes/stripeRouter.js");
const cron = require("node-cron");
const User = require("./models/User");
const cors = require("cors");

require("dotenv").config(); // Load environment variables

connectDB();
const app = express();
const PORT = process.env.PORT || 8090;

//---Cron Job for trial period---//
// second, minute, hour, day of month, month, day of week
// This cron job runs every day at midnight (0 0 * * *) to check trial periods
cron.schedule("0 0 * * *", async () => {
  console.log("Running Cron Job for Trial Period");
  try {
    //Get the current date
    const today = new Date();

    await User.updateMany(
      {
        // Find users whose trial is active and has expired date is less than today
        trialActive: true,
        trialExpires: { $lt: today },
      },
      {
        trialActive: false, // Set trialActive to false
        subscriptionPlan: "Free", // Set subscription plan to Free
        monthlyRequestCount: 5, // Reset monthly request count to 5 for free plan
      }
    );
  } catch (error) {
    console.error("Error in Cron Job for Trial Period:", error);
  }
});

//---Cron Job for free plan---//
// second, minute, hour, day of month, month, day of week
// This cron job runs on the first day of every month at midnight (0 0 1 * * *)
cron.schedule("0 0 1 * * *", async () => {
  console.log("Running Cron Job for Free Plan");
  try {
    //Get the current date
    const today = new Date();

    await User.updateMany(
      {
        subscriptionPlan: "Free", // Find users whose subscription plan is Free
        nextBillingDate: { $lt: today }, // Ensure the next billing date is less than today
      },
      {
        monthlyRequestCount: 0, // Reset monthly request count to 0 for free plan
      }
    );
  } catch (error) {
    console.error("Error in Cron Job:", error);
  }
});

//---Cron Job for basic plan---//
// second, minute, hour, day of month, month, day of week
// This cron job runs on the first day of every month at midnight (0 0 1 * * *)
// It resets the monthly request count for users on the Basic plan
cron.schedule("0 0 1 * * *", async () => {
  console.log("Running Cron Job for Basic Plan");
  try {
    const today = new Date();

    await User.updateMany(
      {
        subscriptionPlan: "Basic", // Find users whose subscription plan is Basic
        nextBillingDate: { $lt: today }, // Ensure the next billing date is less than today
      },
      {
        monthlyRequestCount: 0, // Reset monthly request count to 0 for free plan
      }
    );
  } catch (error) {
    console.error("Error in Cron Job:", error);
  }
});

//---Cron Job for premium plan---//
// second, minute, hour, day of month, month, day of week
// This cron job runs on the first day of every month at midnight (0 0 1 * * *)
cron.schedule("0 0 1 * * *", async () => {
  console.log("Running Cron Job for Premium Plan");
  try {
    //Get the current date
    const today = new Date();

    await User.updateMany(
      {
        subscriptionPlan: "Premium", // Find users whose subscription plan is Premium
        nextBillingDate: { $lt: today }, // Ensure the next billing date is less than today
      },
      {
        monthlyRequestCount: 0, // Reset monthly request count to 0 for free plan
      }
    );
  } catch (error) {
    console.error("Error in Cron Job:", error);
  }
});

//---Middleware---//
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow requests from the client URL
  credentials: true, // Allow cookies to be sent with requests
};
app.use(cors(corsOptions)); // Enable CORS with the specified options

//---Routes---//
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/openai", openAIRouter);
app.use("/api/v1/stripe", stripeRouter); // Stripe routes

//---Error Handling Middleware---//
app.use(errorHandler);

//---Start the Server---//
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
