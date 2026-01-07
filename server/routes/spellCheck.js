const express = require("express");
const spellCheckRoute = express.Router();
const axios = require("axios");

spellCheckRoute.post("/", async (req, res) => {
    const { sentence } = req.body;
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                //here we specify what other required/optional parameters we want to pass to the API endpoint
                model: "gpt-4o-mini",
                messages: [
                    { 
                        role: "system", 
                        content: "You are a helpful assistant that checks and corrects spelling errors in the following text. Only return the corrected text without any additional comments or context.",
                    },
                    {
                        role: "user",
                        content: sentence
                    }
                ],
                max_completion_tokens: 100,
                temperature: 0.6,
            },
            {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                }
            }
        );

        const correctedText = response.data.choices[0].message.content.trim();
        res.json({ correctedText });

    } catch (error) {
        console.error("Error checking spelling in spellCheck.js:", error);
        res.status(500).json({ error: error.message });
    }
});

//export
module.exports = spellCheckRoute
