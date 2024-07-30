// Import the User schema model for user operations
const UserSchema = require("../models/usersSchema.model");

// Define the DisplayUsers class to handle displaying user information
class DisplayUsers {
  static display(req, res) {
    // Retrieve all users from the database and sort by email
    UserSchema.find()
      .sort("email") // Sort the results by email
      .then((result) => {
        // Respond with the list of users
        res.send({
          result,
        });
      })
      .catch((error) => {
        // Handle error during the query
        res.send(error.message);
      });
  }
}

// Export the DisplayUsers class for use in other modules
module.exports = DisplayUsers;
