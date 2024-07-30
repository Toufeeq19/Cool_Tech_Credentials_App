// Import necessary modules and packages
let createError = require("http-errors"); // For creating HTTP errors
let path = require("path"); // For working with file and directory paths
const helmet = require("helmet"); // For securing HTTP headers
const bodyParser = require("body-parser"); // For parsing request bodies
let express = require("express"); // The Express framework
let cookieParser = require("cookie-parser"); // For parsing cookies
let logger = require("morgan"); // For logging HTTP requests
const mongoose = require("mongoose"); // For interacting with MongoDB

// Load environment variables from .env file
require("dotenv").config();

// Import route modules
let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let registerRouter = require("./routes/register");
let loginRouter = require("./routes/login");
let verifyUserPasswordsPageRouter = require("./routes/verifyUser");
let passwordRouter = require("./routes/password");

// Create an Express application
let app = express();

// Set the view engine to Jade and configures the views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Use middleware for logging, parsing JSON and URL-encoded data, and cookies
app.use(logger("dev")); // Log requests to the console
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies

// Security middleware
app.use(helmet()); // Set secure HTTP headers

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Define routes for the application
app.use("/", indexRouter); // Root route
app.use("/users", usersRouter); // User-related routes
app.use("/register", registerRouter); // Registration routes
app.use("/login", loginRouter); // Login routes
app.use("/verifypasswordspage", verifyUserPasswordsPageRouter); // Verify passwords page route
app.use("/password", passwordRouter); // Password-related routes

// Set up debugging and HTTP server
let debug = require("debug")("cooltech:server");
let http = require("http");

// Normalize the port value and set it for the app
let PORT = normalizePORT(process.env.PORT || "3001");
app.set("PORT", PORT);

// Create an HTTP server using the Express app
let server = http.createServer(app);

// MongoDB connection URI from environment variables
const uri = process.env.DB_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Handle MongoDB connection errors
mongoose.connection.on("error", function () {
  console.log("Could not connect to the database. Exiting now...");
  process.exit(); // Exit if connection fails
});

// Log successful connection to MongoDB
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

// Start the HTTP server and listen on the specified port
server.listen(PORT);
server.on("error", onError); // Handle server errors
server.on("listening", onListening); // Log when the server starts listening

// Function to normalize port values
function normalizePORT(val) {
  let PORT = parseInt(val, 10); // Convert port value to an integer
  if (isNaN(PORT)) {
    return val; // If not a number, return as is
  }
  if (PORT >= 0) {
    return PORT; // If valid port number, return it
  }
  return false; // Otherwise, return false
}

// Function to handle errors during server startup
function onError(error) {
  if (error.syscall !== "listen") {
    throw error; // If not a listen error, rethrow the error
  }
  let bind = typeof PORT === "string" ? "Pipe " + PORT : "PORT " + PORT; // Determine binding information
  switch (error.code) {
    case "EACCES": // Permission error
      console.error(bind + " requires elevated privileges");
      process.exit(1); // Exit the process
      break;
    case "EADDRINUSE": // Address in use error
      console.error(bind + " is already in use");
      process.exit(1); // Exit the process
      break;
    default:
      throw error; // For other errors, rethrow
  }
}

// Function to log when the server starts listening
function onListening() {
  let addr = server.address(); // Get the server address
  let bind = typeof addr === "string" ? "pipe " + addr : "PORT " + addr.PORT; // Determine binding information
  debug("Listening on " + bind); // Log the listening address
}

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // Create a 404 error and forward to the error handler
});

// Error handling middleware
app.use(function (err, req, res, next) {
  res.locals.message = err.message; // Set error message
  res.locals.error = req.app.get("env") === "development" ? err : {}; // Set error details for development
  res.status(err.status || 500); // Set response status
  res.render("error"); // Render the error view
});

// Export the Express app for use in other modules
module.exports = app;
