// Import the Express framework
let express = require("express");
// Create a new router instance
let router = express.Router();

// Import controllers for handling password operations
const DisplayPasswords = require("../controllers/credentialDisplay.controller");
const AddPassword = require("../controllers/credentialAdd.controller");
const EditPassword = require("../controllers/credentialEdit.controller");
const DeletePassword = require("../controllers/credentialDelete.controller");

// Define a route for displaying passwords (GET request)
router.get("/:data", DisplayPasswords.display); // Display passwords based on provided data parameter

// Define a route for adding a new password (POST request)
router.post("/", AddPassword.create); // Call the create method from the AddPassword controller

// Define a route for editing an existing password (PUT request)
router.put("/", EditPassword.update); // Call the update method from the EditPassword controller

// Define a route for deleting a password (DELETE request)
router.delete("/", DeletePassword.delete); // Call the delete method from the DeletePassword controller

// Export the router module for use in other parts of the application
module.exports = router;
