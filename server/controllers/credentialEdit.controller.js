// Import the Password schema model for password operations
const PasswordSchema = require("../models/passwordSchema.model");

// Define the EditPassword class to handle updating password entries
class EditPassword {
  static update(req, res) {
    // Extract fields from the request body
    const id = req.body.id; // ID of the password entry to update
    const title = req.body.title; // Updated title
    const website = req.body.website; // Updated website
    const email = req.body.email; // Updated createdBy email
    const username = req.body.username; // Updated username
    const password = req.body.password; // Updated password

    // Find the password entry by ID and update it with new values
    PasswordSchema.findByIdAndUpdate(id, {
      $set: {
        title: title,
        website: website,
        createdBy: email,
        username: username,
        password: password,
      },
    }).then(
      (result) => {
        // Respond with the updated entry
        res.send(result);
      },
      (error) => {
        // Handle error during update
        res.send(error.message);
      }
    );
  }
}

// Export the EditPassword class for use in other modules
module.exports = EditPassword;
