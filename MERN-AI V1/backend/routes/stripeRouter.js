const express = require("express");

const stripeRouter = express.Router();

const isAuthenticated = require("../MIDDLEWARES/isAuthenticated");
const {
  handleStripePayment,
  handleFreeSubscription,
  verifyPayment,
} = require("../controllers/handleStripePayment");

stripeRouter.post("/checkout", isAuthenticated, handleStripePayment);
stripeRouter.post("/free-plan", isAuthenticated, handleFreeSubscription);
stripeRouter.post("/verify-payment/:paymentId", isAuthenticated, verifyPayment);

module.exports = stripeRouter;
