const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reference: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    subscriptionPlan: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    monthlyRequestCount: {
      type: Number,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

//! Compile to form the model
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
// This file defines the Payment model for the application, including fields for user reference, payment reference
// currency, status, subscription plan, and amount. It also includes timestamps for tracking creation and updates.
// The model is then exported for use in other parts of the application.
// This model is used to manage payment transactions and their associated details within the application.
// It allows for tracking user payments, their status, and the subscription plans associated with those payments.
// The model is essential for handling payment processing and user subscriptions in the application.
