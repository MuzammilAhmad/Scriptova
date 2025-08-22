const asyncHandler = require("express-async-handler");
const calculateNextBillingDate = require("../utils/calculateNextBillingDate");
const shouldRenewSubscriptionPlan = require("../utils/shouldRenewSubscriptionPlan");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");
const User = require("../models/User");

//--Stripe Payment Handler--//
const handleStripePayment = asyncHandler(async (req, res) => {
  const { amount, subscriptionPlan } = req.body;

  //Get the User
  const user = req?.user;

  try {
    //Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100, // Convert to cents
      currency: "usd",
      // add metadata to track user and subscription plan
      metadata: {
        userId: user?._id?.toString(),
        userEmail: user?.email,
        subscriptionPlan,
      },
    });

    // Send the response
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent?.client_secret,
      paymentIntentId: paymentIntent?.id,
      metadata: paymentIntent?.metadata,
      message: "Payment Intent Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to Create Payment Intent",
    });
  }
});

//--Verify Payment--//
const verifyPayment = asyncHandler(async (req, res) => {
  // Get the payment intent id
  const { paymentId } = req.params;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (paymentIntent.status === "succeeded") {
      //Get the user from the metadata
      const metadata = paymentIntent?.metadata;
      const subscriptionPlan = metadata?.subscriptionPlan;
      const userEmail = metadata?.userEmail;
      const userId = metadata?.userId;

      //Find the user and update their subscription plan and next billing date
      const userFound = await User.findById(userId);
      if (!userFound) {
        return res.status(404).json({
          success: false,
          message: "User  Not Found",
        });
      }

      // Get the payment details
      const amount = paymentIntent?.amount / 100; // Convert back to dollars
      const currency = paymentIntent?.currency;
      const paymentId = paymentIntent?.id;

      // Create a new payment record
      const newPayment = await Payment.create({
        user: userId,
        email: userEmail,
        subscriptionPlan,
        amount,
        currency,
        status: "success",
        reference: paymentId, // Use paymentId as reference
      });

      // Check for the subscription plan
      //Basic Plan
      if (subscriptionPlan === "Basic") {
        const updatedUser = await User.findByIdAndUpdate(userId, {
          subscriptionPlan: "Basic",
          nextBillingDate: calculateNextBillingDate(),
          monthlyRequestCount: 10, // Reset to 10 credits
          apiRequestCount: 0, // Reset API request count
          $addToSet: { payments: newPayment?._id }, // Add payment to user's payments array
        });
        res.status(200).json({
          success: true,
          message:
            "Payment Verified Successfully, You Are Now Subscribed to the Basic Plan!",
          user: updatedUser,
        });
      }

      //Premium Plan
      if (subscriptionPlan === "Premium") {
        const updatedUser = await User.findByIdAndUpdate(userId, {
          subscriptionPlan: "Premium",
          nextBillingDate: calculateNextBillingDate(),
          monthlyRequestCount: 15, // Reset to 15 credits
          apiRequestCount: 0, // Reset API request count
          $addToSet: { payments: newPayment?._id }, // Add payment to user's payments array
        });
        res.status(200).json({
          success: true,
          message:
            "Payment Verified Successfully, You Are Now Subscribed to the Premium Plan!",
          user: updatedUser,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to Verify Payment",
    });
  }
});

//--Handle Free Subscription--//
const handleFreeSubscription = asyncHandler(async (req, res) => {
  //Get the login User
  const user = req?.user;

  //   if (!user) {
  //     return res.status(401).json({
  //       success: false,
  //       message: "User not authenticated",
  //     });
  //   }

  //Check if user should be renewed or not
  try {
    if (shouldRenewSubscriptionPlan(user)) {
      //Update User account
      user.subscriptionPlan = "Free";
      user.monthlyRequestCount = 5; // Reset to 5 credits
      user.apiRequestCount = 0; // Reset API request count

      //Calculate the next billing date
      user.nextBillingDate = calculateNextBillingDate();

      const newPayment = await Payment.create({
        user: user._id,
        amount: 0,
        currency: "usd",
        subscriptionPlan: "Free",
        status: "success",
        reference: Math.random().toString(36).substring(7),
        monthlyRequestCount: 5,
      });

      //Push the new payment to the user's payments array
      user.payments.push(newPayment?._id);

      //Save the user
      await user.save();

      //Send response
      res.status(200).json({
        success: true,
        message: "You Have Successfully Subscribed to the Free Plan!",
        user,
      });

      // Optionally, you can also send a confirmation email here
      // Will do it later

      // Create new payment and save it to the database
    } else {
      res.status(403).json({
        success: false,
        message:
          "You're Already Subscribed to a Plan. No Renewal is Due at this Time",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to handle free subscription",
    });
  }
});

module.exports = {
  handleStripePayment,
  handleFreeSubscription,
  verifyPayment,
};
