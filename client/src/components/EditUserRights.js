import React, { useState } from "react"; // Importing React and useState hook for state management
import { Link } from "react-router-dom"; // Importing Link for routing
import { api } from "./Api"; // Importing API utility for making requests

// Main EditUserRights component
function EditUserRights() {
  let token = sessionStorage.getItem("token"); // Retrieving the token from session storage

  // State variables for managing component state
  const [started, setStarted] = useState(false); // Indicates if the component has started loading data
  const [error, setError] = useState(null); // Holds error messages
  const [isLoaded, setIsLoaded] = useState(false); // Indicates if data has finished loading
  const [editModeUsers, setEditModeUsers] = useState(false); // Tracks if user is in edit mode
  const [updatedOURole, setUpdatedOURole] = useState(false); // Tracks if OU role is updated

  const [userData, setUserData] = useState([]); // Holds user data
  const [displayUserData, setDisplayUserData] = useState([]); // Holds data for displaying users

  // State variables for individual user attributes
  const [id, setId] = useState([]); // User ID
  const [email, setEmail] = useState([]); // User email
  const [nickname, setNickname] = useState([]); // User nickname
  const [password, setPassword] = useState([]); // User password
  const [role, setRole] = useState([]); // User role
  const [ouDivision, setOuDivision] = useState([]); // User's organization unit division

  // Default values for organization unit and department
  const [OU, setOU] = useState("NEWS MANAGEMENT");
  const [department, setDepartment] = useState("GENERAL MANAGEMENT");

  // Function to add a combination of OU and department to the user's OU division
  function setAddOuDivionToUser(OU, department) {
    let combination = `${OU} - ${department}`; // Create a string for the combination
    const index = ouDivision.indexOf(combination); // Check if combination already exists

    // If the combination does not exist, add it to the OU division
    if (index === -1) {
      let oldOUDivision = ouDivision;
      oldOUDivision.push(combination); // Update state with the new combination
      setOuDivision(oldOUDivision);
    }
  }

  // Function to validate the login status and load user data
  function componentDidMountLoginValidation(token) {
    let method = "GET"; // HTTP method for fetching data
    let data = null; // No data needed for this request

    // API call to verify login and fetch user data
    api(`verifypasswordspage/`, method, data, token).then(
      (result) => {
        setStarted(true); // Mark as started
        setUserData(result); // Set user data state
        setIsLoaded(true); // Mark as loaded
      },
      (error) => {
        setStarted(true); // Mark as started even if there's an error
        setError(error); // Set error state
        setIsLoaded(true); // Mark as loaded
      }
    );
  }

  // Function to fetch and display all users
  function componentDidMountDisplayUsers() {
    let method = "GET"; // HTTP method for fetching user data

    // API call to fetch user data
    api(`users/`, method).then(
      (result) => {
        setDisplayUserData(result.result); // Set state with the fetched user data
      },
      (error) => {
        setError(error); // Set error state if the request fails
      }
    );
  }

  // Function to delete a user by their ID
  function componentDidMountDeleteUser(id) {
    let method = "DELETE"; // HTTP method for deleting user
    let data = { id: id }; // Data to send in the request

    // API call to delete the user
    api(`users/`, method, data).then(
      (result) => {
        setEmail(result.email); // Update email state after deletion
        setStarted(false); // Reset started state
        setIsLoaded(false); // Reset loaded state
        setEditModeUsers(false); // Exit edit mode
        setUpdatedOURole(false); // Reset updated role state
      },
      (error) => {
        setError(error); // Set error state if the request fails
        setIsLoaded(true); // Mark as loaded even if there's an error
        setUpdatedOURole(false); // Reset updated role state
      }
    );
  }

  // Function to update user information
  function componentDidMountUpdateUser(
    id,
    email,
    nickname,
    password,
    ouDivision,
    role
  ) {
    let method = "PUT"; // HTTP method for updating user information
    let data = {
      id: id,
      email: email,
      nickname: nickname,
      password: password,
      ouDivision: ouDivision,
      role: role,
    };

    // API call to update the user
    api(`users/`, method, data).then(
      (result) => {
        setEmail(result.email); // Update email state after update
        setStarted(false); // Reset started state
        setIsLoaded(false); // Reset loaded state
        setEditModeUsers(false); // Exit edit mode
        setUpdatedOURole(false); // Reset updated role state
      },
      (error) => {
        setError(error); // Set error state if the request fails
        setIsLoaded(true); // Mark as loaded even if there's an error
        setUpdatedOURole(false); // Reset updated role state
      }
    );
  }

  // Check if user is logged in by validating the token
  if (token === null || token === "failed") {
    // If no token, show login required message
    return (
      <div>
        <h2>Login is required to view this page, visit home page</h2>
        <Link to="/">
          {" "}
          {/* Link to home page */}
          <button>HOME</button>
        </Link>
      </div>
    );
  } else if (started === false) {
    // If the component hasn't started loading, fetch user data and validate login
    componentDidMountDisplayUsers();
    componentDidMountLoginValidation(token);
  } else if (!isLoaded) {
    // If data is still loading, show loading message
    return <div>Loading...</div>;
  } else if (error) {
    // If there was an error, show login required message
    return (
      <div>
        <h2>Login is required to view this page, visit home page</h2>
        <Link to="/">
          {" "}
          {/* Link to home page */}
          <button>HOME</button>
        </Link>
      </div>
    );
  } else if (userData.role === "normal" || userData.role === "manager") {
    // If user has insufficient rights, show access denied message
    return (
      <div>
        <h3>
          Dear {userData.nickname}, <br />
          <br /> Access denied, you don't have permission to edit other user's
          rights
        </h3>
        <br />
        <hr />
      </div>
    );
  } else if (!editModeUsers && userData.role === "admin") {
    // If user is admin and not in edit mode, show the list of user accounts
    return (
      <div>
        <h2>USER ACCOUNTS</h2>
        <table>
          <thead>
            <tr>
              <th>NICKNAME</th>
              <th>EMAIL</th>
              <th>PASSWORD</th>
              <th>ROLE</th>
              <th>EDIT INFO</th>
            </tr>
          </thead>
          <tbody>
            {displayUserData.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.nickname}</td>
                  <td>{element.email}</td>
                  <td>{element.password}</td>
                  <td>{element.role}</td>
                  <td>
                    <button
                      onClick={() => {
                        // When edit button is clicked, set user data for editing
                        setEditModeUsers(true);
                        setId(element._id);
                        setEmail(element.email);
                        setNickname(element.nickname);
                        setOuDivision(element.ouDivision);
                        setPassword(element.password);
                        setRole(element.role);
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

        <br />
        <hr />
      </div>
    );
  } else if (editModeUsers && !updatedOURole) {
    // If in edit mode but OU role hasn't been updated yet
    setUpdatedOURole(true);
  } else if (editModeUsers && userData.role === "admin") {
    // If in edit mode and user is admin, show the edit form for user credentials
    return (
      <div>
        <h2>EDIT LOGIN CREDENTIALS</h2>
        <table>
          <tbody>
            <tr>
              <td>NICKNAME:</td>
              <td>
                <input
                  name="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value); // Update nickname on input change
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>EMAIL:</td>
              <td>
                <input
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value); // Update email on input change
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
                    setPassword(e.target.value); // Update password on input change
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>ROLE:</td>
              <td>
                <select
                  name="role"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value); // Update role on selection change
                  }}
                >
                  <option value="normal">normal</option>
                  <option value="manager">manager</option>
                  <option value="admin">admin</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <table>
          <tbody>
            <tr>
              <td colSpan={2}>
                <b>OPERATING UNIT-DIVISION:</b>
              </td>
            </tr>
            {ouDivision.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element}</td>
                  <td>
                    <button
                      onClick={() => {
                        // Remove OU division on button click
                        ouDivision.splice(index, 1);
                        setUpdatedOURole(false); // Reset updated role state
                      }}
                    >
                      REMOVE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <br />
        <table>
          <tbody>
            <tr>
              <td>
                <b>ORGANISATION UNIT: </b>
              </td>
              <td>
                <b>DEPARTMENT: </b>
              </td>
            </tr>
            <tr>
              <td>
                <select
                  name="ou"
                  onChange={(e) => {
                    setOU(e.target.value); // Update OU on selection change
                  }}
                >
                  <option value="NEWS MANAGEMENT">NEWS MANAGEMENT</option>
                  <option value="SOFTWARE REVIEWS">SOFTWARE REVIEWS</option>
                  <option value="HARDWARE REVIEWS">HARDWARE REVIEWS</option>
                  <option value="OPINION PUBLISHING">OPINION PUBLISHING</option>
                  <option value="NEW TECHNOLOGY REVIEWS">
                    NEW TECHNOLOGY REVIEWS
                  </option>
                </select>
              </td>
              <td>
                <select
                  name="department"
                  onChange={(e) => {
                    setDepartment(e.target.value); // Update department on selection change
                  }}
                >
                  <option value="GENERAL MANAGEMENT">GENERAL MANAGEMENT</option>
                  <option value="MARKETING">MARKETING</option>
                  <option value="OPERATIONS">OPERATIONS</option>
                  <option value="FINANCE">FINANCE</option>
                  <option value="SALES">SALES</option>
                  <option value="HUMAN RESOURCES">HUMAN RESOURCES</option>
                  <option value="PROCUREMENT">PROCUREMENT</option>
                  <option value="PRODUCT DEVELOPMENT">
                    PRODUCT DEVELOPMENT
                  </option>
                  <option value="RESEARCH">RESEARCH</option>
                  <option value="LEGAL">LEGAL</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button
                  id="add-ouDivision-Button"
                  onClick={() => {
                    setAddOuDivionToUser(OU, department); // Add OU division combination
                    setUpdatedOURole(false); // Reset updated role state
                  }}
                >
                  ADD OU DIVISION
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button
          className="options-Button"
          onClick={() => {
            componentDidMountDeleteUser(id); // Call function to delete user
          }}
        >
          DELETE USER
        </button>
        <button
          className="options-Button"
          onClick={() => {
            componentDidMountUpdateUser(
              // Call function to update user details
              id,
              email,
              nickname,
              password,
              ouDivision,
              role
            );
          }}
        >
          SAVE UPDATE
        </button>
        <br />
        <br />
        <button
          className="options-Button"
          onClick={() => {
            // Reset form to exit edit mode
            setEditModeUsers(false);
            setOU("NEWS MANAGEMENT");
            setDepartment("GENERAL MANAGEMENT");
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

export default EditUserRights; // Exporting the component for use in other parts of the application
