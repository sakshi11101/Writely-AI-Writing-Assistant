require("dotenv").config;
const express = require("express");
const cors = require("cors");
const analyzeRoute = require("./routes/analyze");
const grammarCheckRoute = require("./routes/grammarCheck");
const spellCheckRoute = require("./routes/spellCheck");
const app = express();
const PORT = process.env.PORT || 8000;

/* Middlewares - code that runs between request and response. Analog to how when we arrive at airport
security checks or valid Id act as middleware and then route us to our plane
Request -> Middleware -> Route -> Response (Middleware can modify request and response, it can also reject request)*/

app.use(express.json());  //reads json data from request body and convert to javascript object
app.use(cors());  //it allows for cross-origin requests

//Routes
app.use("/api/analyze", analyzeRoute);
app.use("/api/grammarCheck", grammarCheckRoute);
app.use("/api/spellCheck", spellCheckRoute);

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});