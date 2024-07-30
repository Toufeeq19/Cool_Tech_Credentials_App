// Import the Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define a schema for storing password entries
const passwordSchema = new mongoose.Schema({
  ouDivision: String, 
  title: {
    type: String, 
    required: true, 
    uppercase: true, // Automatically convert title to uppercase
  },
  website: {
    type: String, 
    required: true, 
  },
  createdBy: String, 
  username: {
    type: String, 
    required: true, 
  },
  password: {
    type: String, 
    required: true, // Password
  },
  dateCreated: {
    type: Date, // Date the entry was created
    immutable: true, 
    default: () => Date.now(), 
  },
  archive: Boolean, 
});

// Export the model for the password schema
module.exports = mongoose.model("Passwords", passwordSchema);
