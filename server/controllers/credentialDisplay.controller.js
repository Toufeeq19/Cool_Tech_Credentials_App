// Import the Password schema model for password operations
const PasswordSchema = require("../models/passwordSchema.model");

// Define the DisplayPasswords class to handle displaying passwords
class DisplayPasswords {
  static display(req, res) {
    // Extract the organizational unit division from the request parameters
    const ouDivisionParam = req.params.data;

    // Find password entries that match the organizational unit division
    PasswordSchema.where("ouDivision")
      .equals(ouDivisionParam)
      .sort("website") // Sort the results by website
      .then((result) => {
        // Respond with the found results
        res.send({
          result,
        });
      })
      .catch((error) => {
        // Handle error during query
        res.send(error.message);
      });
  }
}

// Export the DisplayPasswords class for use in other modules
module.exports = DisplayPasswords;
