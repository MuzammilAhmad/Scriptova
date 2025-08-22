const express = require("express");

const openAIRouter = express.Router();

const isAuthenticated = require("../MIDDLEWARES/isAuthenticated");
const checkApiRequestLimit = require("../MIDDLEWARES/checkApiRequestLimit");

const {
  openAIController,
  codeGenerationController,
} = require("../controllers/openAIController");

openAIRouter.post(
  "/generate-content",
  isAuthenticated,
  checkApiRequestLimit,
  openAIController
);

openAIRouter.post(
  "/generate-code",
  isAuthenticated,
  checkApiRequestLimit,
  codeGenerationController
);

module.exports = openAIRouter;
