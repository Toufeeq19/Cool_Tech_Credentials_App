// Import necessary modules and the API function
import React, { useState } from "react"; // Import React and useState hook
import { api } from "./Api"; // Import the API utility for making requests

function PasswordsDisplayEditPage(props) {
  // Extract props passed to the component
  const ouDivision = props.ouDivision; // Organizational division from props
  const userData = props.userData; // User data from props

  // State variables to manage component state
  const [credentialData, setCredentialData] = useState([]); // Stores the password credentials
  const [error, setError] = useState(null); // Stores any error during API calls
  const [isStarted, setIsStarted] = useState(false); // Tracks if data fetching has started
  const [isLoaded, setIsLoaded] = useState(false); // Indicates if data has been loaded
  const [display, setDisplay] = useState(false); // Controls whether to display the password data
  const [editDataDisplay, setEditDataDisplay] = useState(false); // Controls the edit form visibility

  // State variables for editing password details
  const [id, setId] = useState(""); // ID of the password entry being edited
  const [title, setTitle] = useState(""); // Title of the password entry
  const [website, setWebsite] = useState(""); // Website associated with the password entry
  const [username, setUsername] = useState(""); // Username associated with the password entry
  const [password, setPassword] = useState(""); // Password value

  // Function to fetch passwords for the specified organizational division
  function componentDidMountDisplayPasswords(ouDivision) {
    let method = "GET"; // HTTP method for fetching data

    // Call the API to retrieve password data for the specified division
    api(`password/${ouDivision}`, method).then(
      (result) => {
        // On success, update the credential data and loading state
        setCredentialData(result.result);
        setIsLoaded(true);
      },
      (error) => {
        // On error, update the error state and loading state
        setError(error);
        setIsLoaded(true);
      }
    );
  }

  // Function to update password details in the database
  function componentDidMountEditPasswords(
    email,
    id,
    title,
    website,
    username,
    password
  ) {
    let method = "PUT"; // HTTP method for updating data
    let data = {
      email: email,
      id: id,
      title: title,
      website: website,
      username: username,
      password: password,
    };

    // Call the API to update the password entry
    api(`password/`, method, data).then(
      (result) => {
        // On success, update the title and loading state
        setTitle(result.title);
        setIsLoaded(true);
      },
      (error) => {
        // On error, update the error state and loading state
        setError(error);
        setIsLoaded(true);
      }
    );
  }

  // Function to delete a password entry from the database
  function componentDidMountDeletePasswords(id) {
    let method = "DELETE"; // HTTP method for deleting data
    let data = { id: id }; // Data containing the ID of the entry to delete

    // Call the API to delete the password entry
    api(`password/`, method, data).then(
      (result) => {
        // On success, update the title and loading state
        setTitle(result.title);
        setIsLoaded(true);
      },
      (error) => {
        // On error, update the error state and loading state
        setError(error);
        setIsLoaded(true);
      }
    );
  }

  // Check if data fetching has started
  if (isStarted === false) {
    // If not, initiate the password display function and set started state
    componentDidMountDisplayPasswords(ouDivision);
    setIsStarted(true);
  } else if (error) {
    // If there was an error, display the error message
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    // If data is still loading, show a loading message
    return <div>Loading...</div>;
  } else if (!display) {
    // If the passwords are not yet displayed, show a button to display them
    return (
      <div>
        <br />
        <button
          className="display-Passwords-Button"
          onClick={() => {
            // Set display state to true when button is clicked
            setDisplay(true);
          }}
        >
          {ouDivision}{" "}
          {/* Display the organizational division as button text */}
        </button>
        <br />
        <br />
      </div>
    );
  } else if (!editDataDisplay) {
    // If not in edit mode, display the password entries in a table
    return (
      <div>
        <h3>{ouDivision}:</h3>
        <table>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>WEBSITE</th>
              <th>USERNAME</th>
              <th>PASSWORD</th>
              <th>CREATED BY</th>
              <th>EDIT INFO</th>
            </tr>
          </thead>
          <tbody>
            {credentialData.map((element, index) => {
              // Map through the credential data to display each entry
              return (
                <tr key={index}>
                  <td>{element.title}</td>
                  <td>{element.website}</td>
                  <td>{element.username}</td>
                  <td>{element.password}</td>
                  <td>{element.createdBy}</td>
                  <td>
                    <button
                      onClick={() => {
                        // Set edit mode and populate fields when the EDIT button is clicked
                        setEditDataDisplay(true);
                        setTitle(element.title);
                        setWebsite(element.website);
                        setUsername(element.username);
                        setPassword(element.password);
                        setId(element._id); // Store the ID of the selected entry
                      }}
                    >
                      EDIT
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="display-Passwords-Button"
          onClick={() => {
            // Close the password display when clicked
            setDisplay(false);
          }}
        >
          CLOSE SEARCH
        </button>
        <br />
        <hr />
      </div>
    );
  } else if (editDataDisplay && userData.role === "normal") {
    // If user role is normal and in edit mode, display an access denied message
    return (
      <div>
        <h3>{ouDivision}:</h3>
        <h1>Access denied, you don't have user rights to amend passwords</h1>
        <button
          className="display-Passwords-Button"
          onClick={() => {
            // Go back to previous state when BACK button is clicked
            setEditDataDisplay(false);
          }}
        >
          BACK
        </button>
        <br />
        <hr />
      </div>
    );
  } else if (
    editDataDisplay &&
    (userData.role === "manager" || userData.role === "admin")
  ) {
    // If user has the appropriate role and is in edit mode, display the edit form
    return (
      <div>
        <h2>EDIT LOGIN CREDENTIALS</h2>
        <table>
          <tbody>
            <tr>
              <td>TITLE:</td>
              <td>
                <input
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    // Update the title state on input change
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
                  value={website}
                  onChange={(e) => {
                    // Update the website state on input change
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
                  value={username}
                  onChange={(e) => {
                    // Update the username state on input change
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
                  value={password}
                  onChange={(e) => {
                    // Update the password state on input change
                    setPassword(e.target.value);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button
          className="options-Button"
          onClick={() => {
            // Call the delete function when DELETE ENTRY button is clicked
            componentDidMountDeletePasswords(id);
            setIsStarted(false);
            setIsLoaded(false);
            setEditDataDisplay(false);
          }}
        >
          DELETE ENTRY
        </button>
        <button
          className="options-Button"
          onClick={() => {
            // Call the edit function when SAVE EDIT button is clicked
            componentDidMountEditPasswords(
              userData.email,
              id,
              title,
              website,
              username,
              password
            );
            setIsStarted(false);
            setIsLoaded(false);
            setEditDataDisplay(false);
          }}
        >
          SAVE EDIT
        </button>
        <br />
        <br />
        <button
          className="options-Button"
          onClick={() => {
            // Go back to previous state when BACK button is clicked
            setEditDataDisplay(false);
          }}
        >
          BACK
        </button>
        <br />
        <hr />
      </div>
    );
  }
}

// Export the PasswordsDisplayEditPage component for use in other parts of the application
export default PasswordsDisplayEditPage;
