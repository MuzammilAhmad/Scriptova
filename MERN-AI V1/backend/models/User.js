const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      //   unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    trialPeriod: {
      type: Number,
      default: 3, // Default trial period in days
    },
    trialActive: {
      type: Boolean,
      default: true,
    },
    trialExpires: {
      type: Date,
    },
    subscriptionPlan: {
      type: String,
      enum: ["Trial", "Free", "Basic", "Premium"],
      default: "Trial",
    },
    apiRequestCount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      type: Number,
      default: 10, // 10 credits  // 3 days trial
    },
    nextBillingDate: Date,
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ContentHistory",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // Include virtuals in JSON output
    },
    toObject: {
      virtuals: true, // Include virtuals in object output
    },
  }
);

// Add virtual property
// This virtual property checks if the trial is active
// It returns true if trialActive is true and the current date is before trialExpires
// This allows us to easily check if the user's trial period is still active without needing to query

// userSchema.virtual("isTrialActive").get(function () {
//   return this.trialActive && new Date() < this.trialExpires;
// });

//! Compile the schema into a model
const User = mongoose.model("User", userSchema);
module.exports = User;
// End of file: backend/models/User.js
// This file defines the User model for the application, including fields for username, email, password
// and subscription details. It also includes fields for tracking API request counts and billing information.
// The model is exported for use in other parts of the application.
// This file is part of a larger MERN stack application that includes a backend server and a frontend client.
// The backend is built using Node.js and Express, while the frontend is built using React.
// The application is designed to handle user authentication, subscription management, and API request tracking.
// The User model is used to interact with the MongoDB database, allowing for CRUD operations on user data.
// The model includes validation for required fields and unique constraints on the email field.
