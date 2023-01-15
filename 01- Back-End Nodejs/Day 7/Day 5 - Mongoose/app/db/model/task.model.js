const mongoose = require("mongoose");
const Task = new mongoose.model("Task", {
  title: {
    type: String,
    trim: true,
    required: true,
    minLength: 5,
    maxLength: 100,
    unique: true,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  dueDate: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
