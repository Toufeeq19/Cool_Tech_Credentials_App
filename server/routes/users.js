// Import the Express framework
let express = require("express");
// Create a new router instance
let router = express.Router();

// Import controllers for user operations
const DisplayUsers = require("../controllers/usersDisplay.controller");
const DeleteUser = require("../controllers/usersDelete.controller");
const EditUser = require("../controllers/usersEdit.controller");

// Define a route for displaying users (GET request)
router.get("/", DisplayUsers.display); // Call the display method from the DisplayUsers controller

// Define a route for editing a user (PUT request)
router.put("/", EditUser.update); // Call the update method from the EditUser controller

// Define a route for deleting a user (DELETE request)
router.delete("/", DeleteUser.delete); // Call the delete method from the DeleteUser controller

// Export the router module for use in other parts of the application
module.exports = router;
