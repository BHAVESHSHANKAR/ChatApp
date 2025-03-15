const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());

// ✅ Proper CORS Configuration
app.use(
  cors({
    origin: "*", // Change to specific domain if required
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Serverless Function (Vercel does NOT support `app.listen()`)
app.post("/message", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key is missing" });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        contents: [{ role: "user", parts: [{ text: message }] }],
      }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    res.json({ reply });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching response from Gemini" });
  }
});

// ✅ Export function for Vercel
module.exports = app;
