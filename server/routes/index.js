// Import the Express framework
let express = require("express");
// Create a new router instance
let router = express.Router();

// Define a route for the root path (GET request)
router.get("/", function (req, res, next) {
  // Render the "index" view with a title
  res.render("index", { title: "Password Manager Express Backend" });
});

// Export the router module for use in other parts of the application
module.exports = router;
