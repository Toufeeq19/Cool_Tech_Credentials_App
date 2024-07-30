// Import the Password schema model for password operations
const PasswordSchema = require("../models/passwordSchema.model");

// Define the DeletePassword class to handle password deletion
class DeletePassword {
  static delete(req, res) {
    // Extract the ID from the request body
    const id = req.body.id;

    // Find the password entry by ID and delete it
    PasswordSchema.findByIdAndDelete(id).then(
      (result) => {
        // Respond with the result of the deletion
        res.send(result);
      },
      (error) => {
        // Handle error during deletion
        res.send(error.message);
      }
    );
  }
}

// Export the DeletePassword class for use in other modules
module.exports = DeletePassword;
