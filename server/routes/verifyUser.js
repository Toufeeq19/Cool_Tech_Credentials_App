// Import the Express framework
let express = require("express");
// Create a new router instance
let router = express.Router();
// Load environment variables from .env file
require("dotenv").config();

// Import the controller for verifying users
const VerifyUser = require("../controllers/userJWTVerify.controller");

// Define a route for verifying users (GET request)
router.get("/", VerifyUser.verify); // Call the verify method from the VerifyUser controller

// Export the router module for use in other parts of the application
module.exports = router;
