// Import the Express framework
let express = require("express");
// Create a new router instance
let router = express.Router();

// Import the controller for registering new users
const RegisterNewUser = require("../controllers/registerNewUser.controller");

// Define a route for registering a new user (POST request)
router.post("/", RegisterNewUser.create); // Call the create method from the RegisterNewUser controller

// Export the router module for use in other parts of the application
module.exports = router;
