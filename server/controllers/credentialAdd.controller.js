// Import the Password schema model for password operations
const PasswordSchema = require("../models/passwordSchema.model");

// Define the AddPassword class to handle adding new passwords
class AddPassword {
  static create(req, res) {
    // Extract fields from the request body
    const email = req.body.email; // User's email
    const ouDivision = req.body.ouDivision; // Organizational unit division
    const title = req.body.title; // Title of the password entry
    const website = req.body.website; // Website associated with the password
    const username = req.body.username; // Username for the account
    const password = req.body.password; // Password for the account

    // Create a new password entry using the PasswordSchema
    const newUsernamePasswordDetail = new PasswordSchema({
      ouDivision: ouDivision,
      title: title,
      website: website,
      createdBy: email,
      username: username,
      password: password,
      archive: false, // Set archive status to false by default
    });

    // Save the new password entry to the database
    newUsernamePasswordDetail.save(function (err, data) {
      if (err) {
        // Handle error during save
        res.status(500).send({
          message: "Some error occurred while creating the new Password.",
        });
      } else {
        // Respond with the saved data
        res.send(data);
      }
    });
  }
}

// Export the AddPassword class for use in other modules
module.exports = AddPassword;
