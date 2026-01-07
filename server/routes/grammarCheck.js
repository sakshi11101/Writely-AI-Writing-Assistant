const express = require("express");
const grammarCheck = express.Router();
const axios = require("axios");

grammarCheck.post("/", async (req, res) => {
  const { sentence } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that checks and corrects grammar errors in the following text. Only return the corrected text without any additional comments or context.",
          },
          {
            role: "user",
            content: `${sentence}`,
          },
        ],
        max_tokens: 100,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const correctedText = response.data.choices[0].message.content.trim();
    res.json({ correctedText });
  } catch (error) {
    console.error("Error checking grammar:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = grammarCheck;
