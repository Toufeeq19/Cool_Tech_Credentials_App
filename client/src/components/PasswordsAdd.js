// Import necessary modules and hooks from React and React Router
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { api } from "./Api"; // Import the API utility for making requests

function AddPassword() {
  // Retrieve the token from session storage for authentication
  let token = sessionStorage.getItem("token");

  // State variables to manage component state
  const [started, setStarted] = useState(false); // Tracks if login validation has started
  const [error, setError] = useState(null); // Stores any error during validation
  const [errorPassword, setErrorPassword] = useState(null); // Stores any error while adding a password
  const [addPassword, setAddPassword] = useState(false); // Controls whether the password form is displayed
  const [isLoaded, setIsLoaded] = useState(false); // Indicates if the data has been loaded
  const [newPasswordAdded, setNewPasswordAdded] = useState([]); // Stores the newly added password data

  const [userData, setUserData] = useState([]); // Stores user data

  // State variables for input fields
  const [title, setTitle] = useState(""); // Title of the password entry
  const [website, setWebsite] = useState(""); // Website associated with the password entry
  const [username, setUsername] = useState(""); // Username for the password entry
  const [password, setPassword] = useState(""); // Password value
  const [ouDivisionForPassword, setOuDivisionForPassword] = useState(""); // Selected organizational division for the password

  // Function to validate user login
  function componentDidMountLoginValidation(token) {
    let method = "GET"; // HTTP method for validation
    let data = null; // No data needed for this request

    // Call the API to verify user permissions for accessing the password page
    api(`verifypasswordspage/`, method, data, token).then(
      (result) => {
        // On success, store user data and selected OU division
        setUserData(result);
        setOuDivisionForPassword(result.ouDivision[0]); // Default to the first OU division
        setStarted(true); // Set started state to true
      },
      (error) => {
        // On error, set the error state and mark validation as started
        setError(error);
        setStarted(true);
      }
    );
  }

  // Function to add a new password entry
  function componentDidMountAddPassword(
    email,
    ouDivisionForPassword,
    title,
    website,
    username,
    password
  ) {
    let method = "POST"; // HTTP method for adding data
    let data = {
      email: email,
      ouDivision: ouDivisionForPassword,
      title: title,
      website: website,
      username: username,
      password: password,
    };

    // Call the API to add the new password entry
    api(`password/`, method, data).then(
      (result) => {
        // On success, store the new password data
        setNewPasswordAdded(result);
        setIsLoaded(true); // Set loaded state to true
      },
      (error) => {
        // On error, set the password error state
        setErrorPassword(error);
        setIsLoaded(true); // Set loaded state to true even on error
      }
    );
  }

  // Check if the token is valid; if not, prompt the user to log in
  if (token === null || token === "failed") {
    return (
      <div>
        <h2>Login is required to view this page, visit home page</h2>
        <Link to="/">
          <button>HOME</button> {/* Button to navigate to home page */}
        </Link>
      </div>
    );
  } else if (started === false) {
    // If validation has not started, call the validation function
    componentDidMountLoginValidation(token);
  } else if (error) {
    // If there was an error during validation, prompt the user to log in
    return (
      <div>
        <h2>Login is required to view this page, visit home page</h2>
        <Link to="/">
          <button>HOME</button> {/* Button to navigate to home page */}
        </Link>
      </div>
    );
  } else if (addPassword === false) {
    // If the add password form is not yet displayed, render the form
    return (
      <div>
        <h2>ADD NEW LOGIN CREDENTIALS</h2>
        <table>
          <tbody>
            <tr>
              <td>OPERATING UNIT:</td>
              <td>
                <select
                  name="status"
                  onChange={(e) => {
                    // Update the selected OU division when changed
                    setOuDivisionForPassword(e.target.value);
                  }}
                >
                  {userData.ouDivision.map((element, index) => {
                    // Map through the OU divisions and create an option for each
                    return (
                      <option key={index} value={element}>
                        {element}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>TITLE:</td>
              <td>
                <input
                  name="title"
                  type="text"
                  onChange={(e) => {
                    // Update title state on input change
                    setTitle(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>WEBSITE:</td>
              <td>
                <input
                  name="website"
                  type="text"
                  onChange={(e) => {
                    // Update website state on input change
                    setWebsite(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>USERNAME:</td>
              <td>
                <input
                  name="username"
                  type="text"
                  onChange={(e) => {
                    // Update username state on input change
                    setUsername(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>PASSWORD:</td>
              <td>
                <input
                  name="password"
                  type="text"
                  onChange={(e) => {
                    // Update password state on input change
                    setPassword(e.target.value);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="options-Button"
          onClick={() => {
            // Call the function to add the password entry when the button is clicked
            componentDidMountAddPassword(
              userData.email,
              ouDivisionForPassword,
              title,
              website,
              username,
              password
            );
            setAddPassword(true); // Set state to indicate the password is being added
          }}
        >
          ADD PASSWORD
        </button>
        <br />
        <br />
      </div>
    );
  } else if (errorPassword) {
    // If there was an error adding the password, display the error message
    return <div>Error: {errorPassword.message}</div>;
  } else if (!isLoaded) {
    // If data is still loading, show a loading message
    return <div>Loading...</div>;
  } else {
    // If the password was added successfully, display the confirmation message
    return (
      <div>
        <h2>
          THANK YOU FOR YOUR CONTRIBUTION {userData.nickname.toUpperCase()}{" "}
          <br />
          PASSWORD SUCCESSFULLY ADDED:
        </h2>
        <table>
          <tbody>
            <tr>
              <td>OPERATING UNIT:</td>
              <td>{newPasswordAdded.ouDivision}</td>
            </tr>
            <tr>
              <td>TITLE:</td>
              <td>{newPasswordAdded.title}</td>
            </tr>
            <tr>
              <td>WEBSITE:</td>
              <td>{newPasswordAdded.website}</td>
            </tr>
            <tr>
              <td>USERNAME:</td>
              <td>{newPasswordAdded.username}</td>
            </tr>
            <tr>
              <td>PASSWORD:</td>
              <td>{newPasswordAdded.password}</td>
            </tr>
          </tbody>
        </table>
        <button
          className="options-Button"
          onClick={() => {
            // Reset states when "ADD NEW PASSWORD" button is clicked
            setAddPassword(false);
            setIsLoaded(false);
          }}
        >
          ADD NEW PASSWORD
        </button>
        <br />
        <br />
      </div>
    );
  }
}

// Export the AddPassword component for use in other parts of the application
export default AddPassword;
