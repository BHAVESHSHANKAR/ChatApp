const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load API key from .env file
const cors=require('cors');
const app = express();
app.use(express.json());
const cors = require("cors");

app.use(cors({
    origin: "*", // Allow all origins (not recommended for production)
    methods: ["GET", "POST"], // Allow required methods
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.post('/message', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY; // Get API key from .env
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        contents: [{ role: "user", parts: [{ text: message }] }]
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";
    res.json({ reply });

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error fetching response from Gemini' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
