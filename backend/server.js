const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Chat = require("./schema.js");
const uri = "mongodb+srv://chat:chat@chats.0iicxdc.mongodb.net/?retryWrites=true&w=majority&appName=chats";


const app = express();
app.use(cors()); 
app.use(express.json());


async function run() {
  try {
    await mongoose.connect(uri);
    console.log(" Connected to MongoDB!");}
  catch (err) {console.error(" Database connection error:", err);}}

app.post("/chat", async (req, res) => {
  try {
    const { question, student_id } = req.body;

    // Send the question to the Python chatbot API
    const response = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
        "query": req.body.message,
        "student_id": 1001
      })
  
    });
    console.log(JSON.stringify({
        "question": req.body.message,
        "student_id": 1001
      }));
    if (!response.ok) {
      throw new Error(`Chatbot API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Chatbot response received:", data);
    // Return chatbot response to the client
    res.json({
      question,
      response: data.answer
    });

  } catch (err) {
    console.error("❌ Error contacting chatbot:", err.message);
    res.status(500).json({ error: "Failed to contact chatbot service." });
  }
});



app.get('/history', async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 }).limit(10);
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }})



run();
app.listen(5000, () => {
  console.log(`🚀 Server running on http://localhost:5000`);
});
