// Import the User schema model for user operations
const UserSchema = require("../models/usersSchema.model");

// Define the UserEdit class to handle updating user information
class UserEdit {
  static update(req, res) {
    // Extract fields from the request body
    const id = req.body.id; // ID of the user to update
    const email = req.body.email; // Updated email
    const nickname = req.body.nickname; // Updated nickname
    const password = req.body.password; // Updated password
    const ouDivision = req.body.ouDivision; // Updated organizational unit division
    const role = req.body.role; // Updated role

    // Find the user by ID and update their information
    UserSchema.findByIdAndUpdate(id, {
      $set: {
        nickname: nickname,
        email: email,
        password: password,
        ouDivision: ouDivision,
        role: role,
      },
    }).then(
      (result) => {
        // Respond with the updated user data
        res.send(result);
      },
      (error) => {
        // Handle error during update
        res.send(error.message);
      }
    );
  }
}

// Export the UserEdit class for use in other modules
module.exports = UserEdit;
