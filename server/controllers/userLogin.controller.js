// Import the User schema model for user operations
const UserSchema = require("../models/usersSchema.model");
// Import JWT for token operations
const jwt = require("jsonwebtoken");
// Load environment variables
require("dotenv").config();
const jwt_token = process.env.JWT_TOKEN; // JWT secret token

// Define the LoginUser class to handle user login
class LoginUser {
  static login(req, res) {
    // Extract email and password from the request body
    const emailParam = req.body.email; // User's email
    const password = req.body.password; // User's password

    const substring = "@cooltech.com"; // Valid email domain

    // Check if the email includes the valid domain
    if (emailParam.includes(substring)) {
      // Find the user by email
      UserSchema.where("email")
        .equals(emailParam)
        .then((result) => {
          // Check if the user exists and the password matches
          if (result.length > 0 && result[0].password === password) {
            // Create a payload for the JWT token
            let payload = {
              nickname: result[0].nickname,
              email: result[0].email,
              role: result[0].role,
              ouDivision: result[0].ouDivision,
            };
            // Generate a JWT token
            const token = jwt.sign(JSON.stringify(payload), jwt_token, {
              algorithm: "HS256", // Signing algorithm
            });
            // Respond with the generated token
            res.send({
              token: token,
            });
          } else {
            // If login fails, respond with a failure message
            res.status(403).send({
              token: "failed",
            });
          }
        })
        .catch((error) => {
          // Handle error during the query
          res.send(error.message);
        });
    } else {
      // If email does not have the valid domain respond with a failure message
      res.send({
        token: "failed",
      });
    }
  }
}

// Export the LoginUser class for use in other modules
module.exports = LoginUser;
