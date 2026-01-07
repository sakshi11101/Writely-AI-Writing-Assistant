const express = require("express");
const axios = require("axios");
const analyzeRoute = express.Router();

/* Asynchronous means it may take time, so we can't be idle and await mean await means:
      “Pause this function until the async task finishes, then continue.”
   await cannot be used without async.
Asynchronous operations take time, and await lets your code wait for the result without blocking everything else.
*/

analyzeRoute.post("/", async (req, res) => {
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
                        content: "You are a helpful system that rephrases sentences. Only return the rephrased sentences without any additional comments or context.",
                    },
                    {
                        role: "user",
                        content: `${sentence}`
                    }
                ],
                max_completion_tokens: 100,
                temperature: 0.6,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
                },
            }
        );
        
        const rephrasedSentences = response.data.choices.map(
            (choice) => choice.message.content.trim()
        );
        res.json(rephrasedSentences)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message });
    }
});

//export
module.exports = analyzeRoute