// Import the User schema model for user operations
const UserSchema = require("../models/usersSchema.model");

// Define the DeleteUser class to handle user deletion
class DeleteUser {
  static delete(req, res) {
    // Extract the user ID from the request body
    const id = req.body.id;

    // Find the user by ID and delete them
    UserSchema.findByIdAndDelete(id).then(
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

// Export the DeleteUser class for use in other modules
module.exports = DeleteUser;
