// Import the Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define a schema for storing user entries
const usersSchema = new mongoose.Schema({
  nickname: {
    type: String, // Nickname of the user
    required: true, 
  },
  email: {
    type: String,
    required: true, 
    lowercase: true, 
  },
  password: {
    type: String, 
    required: true, // Password is required
  },
  ouDivision: [String], 
  role: {
    type: String,
    required: true, 
  },
  dateCreated: {
    type: Date, 
    immutable: true,
    default: () => Date.now(), // Default to the current date and time when created
  },
  archive: Boolean, 
});

// Export the model for the user schema
module.exports = mongoose.model("User", usersSchema);
