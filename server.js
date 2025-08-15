import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // stored in .env

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(message);
    const text = (await result.response).text();
    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Server error" });
  }
});

app.listen(5500, () => console.log("Server running on http://127.0.0.1:5500/index.html"));
