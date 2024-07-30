// Import necessary modules and components
import React, { useState } from "react"; // Import React and useState hook
import { Link } from "react-router-dom"; // Import Link for navigation
import { api } from "./Api"; // Import the API utility for making requests
import PasswordsDisplayEditPage from "./PasswordsDisplayEditPage"; // Import the PasswordsDisplayEditPage component

function PasswordsDisplay() {
  // Retrieve the token from session storage
  let token = sessionStorage.getItem("token");

  // State variables
  const [started, setStarted] = useState(false); // Tracks if the API call has started
  const [error, setError] = useState(null); // Stores any error that occurs during the API call
  const [isLoaded, setIsLoaded] = useState(false); // Tracks if the data has been successfully loaded

  const [userData, setUserData] = useState([]); // Stores user data retrieved from the API

  // Function to validate login by making an API call
  function componentDidMountLoginValidation(token) {
    let method = "GET"; // Define the HTTP method
    let data = null; // No request body needed for GET requests

    // Call the API to verify the password page access
    api(`verifypasswordspage/`, method, data, token).then(
      (result) => {
        // On success, set the user data and update states
        setUserData(result);
        setStarted(true); // Indicate that the API call has completed
        setIsLoaded(true); // Indicate that the data is loaded
      },
      (error) => {
        // On error, set the error state and update states
        setError(error);
        setStarted(true); // Indicate that the API call has completed
        setIsLoaded(true); // Indicate that the data is loaded
      }
    );
  }

  // Conditional rendering based on token presence and API call status
  if (token === null || token === "failed") {
    // If there is no valid token, prompt the user to log in
    return (
      <div>
        <h2>Login is required to view this page, visit home page</h2>
        <Link to="/">
          {" "}
          {/* Link to the home page */}
          <button>HOME</button>
        </Link>
      </div>
    );
  } else if (started === false) {
    // If the API call hasn't started yet, call the login validation function
    componentDidMountLoginValidation(token);
  } else if (!isLoaded) {
    // If data is still loading, show a loading message
    return <div>Loading...</div>;
  } else if (error) {
    // If there was an error during the API call, prompt the user to log in
    return (
      <div>
        <h2>Login is required to view this page, visit home page</h2>
        <Link to="/">
          {" "}
          {/* Link to the home page */}
          <button>HOME</button>
        </Link>
      </div>
    );
  } else {
    // If all checks are passed and data is loaded, render the user data
    return (
      <div>
        <h2>CLICK TO DISPLAY</h2>
        {userData.ouDivision.map((element, index) => {
          // Map through the organizational divisions in user data
          return (
            <div key={index}>
              <hr /> {/* Divider for visual separation */}
              <PasswordsDisplayEditPage
                ouDivision={element} // Pass the current division to the child component
                userData={userData} // Pass the full user data to the child component
              />
            </div>
          );
        })}
        <br />
        <br />
      </div>
    );
  }
}

// Export the PasswordsDisplay component for use in other parts of the application
export default PasswordsDisplay;
