// Import the JWT library for token operations
const jwt = require("jsonwebtoken");
// Load environment variables
require("dotenv").config();
const jwt_token = process.env.JWT_TOKEN; // JWT secret token

// Define the VerifyUser class to handle user verification
class VerifyUser {
  // User uses JWT to try and log in, ensuring no tampering
  static verify(req, res) {
    // Extract the token from the authorization header
    const token = req.headers["authorization"].split(" ")[1];
    try {
      // Verify the token using the secret
      const decoded = jwt.verify(token, jwt_token);
      // Respond with the decoded user information
      res.send({
        nickname: decoded.nickname,
        email: decoded.email,
        ouDivision: decoded.ouDivision,
        role: decoded.role,
      });
    } catch (e) {
      // If token verification fails, respond with 401 Unauthorized
      res.sendStatus(401);
    }
  }
}

// Export the VerifyUser class for use in other modules
module.exports = VerifyUser;
