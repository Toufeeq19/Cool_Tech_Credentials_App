// Import the Express framework
let express = require("express");
// Create a new router instance
let router = express.Router();

// Import the login controller
const LoginUser = require("../controllers/userLogin.controller");

// Define a route for user login (POST request)
router.post("/", LoginUser.login); // Call the login method from the LoginUser controller

// Export the router module for use in other parts of the application
module.exports = router;
