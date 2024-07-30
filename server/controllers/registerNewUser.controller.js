// Import the User schema model for user operations
const UserSchema = require("../models/usersSchema.model");
// Import JWT for token operations
const jwt = require("jsonwebtoken");
// Load environment variables
require("dotenv").config();
const jwt_token = process.env.JWT_TOKEN; // JWT secret token

// Define the RegisterNewUser class to handle user registration
class RegisterNewUser {
  static create(req, res) {
    // Extract fields from the request body
    const email = req.body.email; // User's email
    const nickname = req.body.nickname; // User's nickname
    const password = req.body.password; // User's password
    const ouDivision = req.body.ouDivision; // User's organizational unit division

    const substring = "@cooltech.com"; // Valid email domain

    // Check if the email includes the valid domain
    if (email.includes(substring)) {
      // Check if the email is already registered
      UserSchema.where("email")
        .equals(email)
        .then((result) => {
          if (result.length === 0) {
            // Create a new user if not already registered
            const newRegisteredUser = new UserSchema({
              email: email,
              nickname: nickname,
              password: password,
              role: "normal", // Default role
              ouDivision: ouDivision,
              archive: false, // Set archive status to false by default
            });

            // Save the new user to the database
            newRegisteredUser.save(function (err, data) {
              if (err) {
                // Handle error during save
                res.status(500).send({
                  message: "Some error occurred while creating the new User.",
                });
              } else {
                // Create a JWT token for the new user
                let payload = {
                  nickname: nickname,
                  email: email,
                  role: "normal",
                  ouDivision: [ouDivision],
                };
                const token = jwt.sign(JSON.stringify(payload), jwt_token, {
                  algorithm: "HS256", // Signing algorithm
                });
                // Respond with the token
                res.send({
                  token: token,
                });
              }
            });
          } else {
            // If already registered, respond with a message
            res.send({
              token: "already registered",
            });
          }
        })
        .catch((error) => {
          // Handle error during query
          res.send(error.message);
        });
    } else {
      // If email does not have the valid domain, respond with a failure message
      res.send({
        token: "failed",
      });
    }
  }
}

// Export the RegisterNewUser class for use in other modules
module.exports = RegisterNewUser;
