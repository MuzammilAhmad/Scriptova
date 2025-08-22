const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["content", "code"],
      default: "content",
    },
  },
  {
    timestamps: true,
  }
);

//! Compile to form the model
const ContentHistory = mongoose.model("ContentHistory", historySchema);
module.exports = ContentHistory;
// This file defines the ContentHistory model for the application, including fields for user reference and content
// history. It also includes timestamps for tracking creation and updates.
// The model is then exported for use in other parts of the application.
// This model is used to manage content history for users, allowing for tracking of changes or updates
// made to content over time. It is essential for maintaining a record of user interactions with the content,
