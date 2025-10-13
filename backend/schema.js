const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  description: { type: String, required: true },
  type: { type: String, enum: ["question", "answer"], required: true }
});

const chatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: [contentSchema]
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
