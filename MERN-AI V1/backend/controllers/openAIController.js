const asyncHandler = require("express-async-handler");
const axios = require("axios");
ContentHistory = require("../models/ContentHistory");
const User = require("../models/User");

//--OpenAI Controller--//

const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is Required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1",
      {
        // model: "gpt-3.5-turbo",
        model: "gpt-3.5-turbo-instruct",
        prompt,
        // prompt: `Generate a blog post on the topic: ${prompt}`,
        max_tokens: 40,
        // messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Send the response back to the client
    const content = response?.data?.choices[0].text?.trim();

    //Saving History
    const newContent = await ContentHistory.create({
      user: req?.user._id,
      content,
    });

    // Push content to the user's history
    const userFound = await User.findById(req?.user?.id);
    if (userFound) {
      userFound.history.push(newContent?._id);

      //Update the user's API request count
      userFound.apiRequestCount += 1;

      //Deduct credits
      userFound.monthlyRequestCount -= 1;

      await userFound.save();
    }
    // Return the generated content
    res.status(200).json({ content });
  } catch (error) {
    console.error("Error Calling OpenAI API:", error);
    res.status(500).json({ message: "Error Calling OpenAI API" });
  }
});

const codeGenerationController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Send the response back to the client
    const content = response?.data?.choices[0].text?.trim();

    //Saving History
    const newContent = await ContentHistory.create({
      user: req?.user._id,
      content,
      type: "code",
    });

    // Push content to the user's history
    const userFound = await User.findById(req?.user?.id);
    if (userFound) {
      userFound.history.push(newContent?._id);

      //Update the user's API request count
      userFound.apiRequestCount += 1;

      //Deduct credits
      userFound.monthlyRequestCount -= 1;

      await userFound.save();
    }

    // Return the generated content
    res.status(200).json({ content });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ message: "Error calling OpenAI API" });
  }
});

module.exports = {
  openAIController,
  codeGenerationController,
};
