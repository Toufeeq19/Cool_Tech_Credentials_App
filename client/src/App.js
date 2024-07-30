import React, { useState } from "react"; // Importing React and useState hook
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Importing routing components
import { api } from "./components/Api"; // Importing API utility for making requests

// Importing various components
import Header from "./components/Header";
import PasswordsDisplay from "./components/PasswordsDisplay";
import PasswordsAdd from "./components/PasswordsAdd";
import EditUserRights from "./components/EditUserRights.js";

// Main App component
const App = () => {
  // State variables to manage application state
  const [login, setLogin] = useState(false); // Tracks if user is logged in
  const [isLoaded, setIsLoaded] = useState(false); // Indicates if data has been loaded
  const [error, setError] = useState(null); // To store any error messages
  const [token, setToken] = useState([]); // To store authentication token
  const [loginRegister, setLoginRegister] = useState(""); // Tracks whether to show login or register form

  // Greeting component that renders different content based on login state
  function Greeting(props) {
    const login = props.login;
    if (login === true) {
      return <UserIsLoggedIn />; // If logged in, show logged-in greeting
    } else {
      return <UserIsNotLoggedIn />; // If not logged in, show login/register options
    }
  }

  // Component displayed when the user is logged in
  function UserIsLoggedIn() {
    return (
      <div className="welcomeBackDiv">
        <h2>Logged In - Cool Tech</h2>
      </div>
    );
  }

  // Component displayed for users not logged in
  function UserIsNotLoggedIn() {
    // State variables for user registration
    const [email, setEmail] = useState(""); // Email input
    const [nickname, setNickname] = useState(""); // Nickname input
    const [password, setPassword] = useState(""); // Password input
    const [OU, setOU] = useState("NEWS MANAGEMENT"); // Default organization unit
    const [department, setDepartment] = useState("GENERAL MANAGEMENT"); // Default department

    // Function to handle user registration
    function registerComponentDidMount(
      email,
      nickname,
      password,
      OU,
      department
    ) {
      let method = "POST"; // HTTP method for registration
      let ouDivision = OU + " - " + department; // Combine OU and department

      // Data to send in registration request
      let data = {
        email: email,
        nickname: nickname,
        password: password,
        ouDivision: ouDivision,
      };

      // API call for registration
      api(`register/`, method, data).then(
        (result) => {
          sessionStorage.setItem("token", result.token); // Save token in session storage
          setToken(result); // Update state with token
          setIsLoaded(true); // Mark as loaded
        },
        (error) => {
          setError(error); // Handle error
          setIsLoaded(true);
        }
      );
    }

    // Function to handle user login
    function loginComponentDidMount(email, password) {
      let method = "POST"; // HTTP method for login

      // Data to send in login request
      let data = { email: email, password: password };

      // API call for login
      api(`login/`, method, data).then(
        (result) => {
          sessionStorage.setItem("token", result.token); // Save token in session storage
          setToken(result); // Update state with token
          setIsLoaded(true); // Mark as loaded
        },
        (error) => {
          setError(error); // Handle error
          setIsLoaded(true);
        }
      );
    }

    // Conditional rendering based on loginRegister state
    if (loginRegister === "") {
      return (
        <div className="App">
          <h2>Cool Tech</h2>
          <button
            onClick={() => {
              setLoginRegister("login"); // Set state to show login form
            }}
          >
            LOGIN
          </button>
          <button
            onClick={() => {
              setLoginRegister("register"); // Set state to show registration form
            }}
          >
            REGISTER
          </button>
        </div>
      );
    } else if (loginRegister === "login") {
      // Login form
      return (
        <div className="App">
          <h2>Cool Tech</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <b>EMAIL: </b>
                </td>
                <td>
                  <input
                    value={email} // Controlled input for email
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value); // Update email state
                    }}
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>PASSWORD: </b>
                </td>
                <td>
                  <input
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value); // Update password state
                    }}
                    type="password"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <button
            onClick={() => {
              setLoginRegister(""); // Go back to initial options
            }}
          >
            BACK
          </button>
          <button
            onClick={() => {
              setLoginRegister("Login"); // Set state to submit login
              loginComponentDidMount(email, password); // Attempt to log in
            }}
          >
            SUBMIT
          </button>
          <br />
          <br />
        </div>
      );
    } else if (loginRegister === "register") {
      // Registration form
      return (
        <div className="App">
          <h2>Cool Tech</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <b>EMAIL: </b>
                </td>
                <td>
                  <input
                    value={email} // Controlled input for email
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value); // Update email state
                    }}
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>NICK NAME: </b>
                </td>
                <td>
                  <input
                    value={nickname} // Controlled input for nickname
                    name="nickname"
                    onChange={(e) => {
                      setNickname(e.target.value); // Update nickname state
                    }}
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>PASSWORD: </b>
                </td>
                <td>
                  <input
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value); // Update password state
                    }}
                    type="password"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>ORGANISATION UNIT: </b>
                </td>
                <td>
                  <select
                    name="ou"
                    onChange={(e) => {
                      setOU(e.target.value); // Update OU state
                    }}
                  >
                    <option value="NEWS MANAGEMENT">NEWS MANAGEMENT</option>
                    <option value="SOFTWARE REVIEWS">SOFTWARE REVIEWS</option>
                    <option value="HARDWARE REVIEWS">HARDWARE REVIEWS</option>
                    <option value="OPINION PUBLISHING">
                      OPINION PUBLISHING
                    </option>
                    <option value="NEW TECHNOLOGY REVIEWS">
                      NEW TECHNOLOGY REVIEWS
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <b>DEPARTMENT: </b>
                </td>
                <td>
                  <select
                    name="department"
                    onChange={(e) => {
                      setDepartment(e.target.value); // Update department state
                    }}
                  >
                    <option value="GENERAL MANAGEMENT">
                      GENERAL MANAGEMENT
                    </option>
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
            </tbody>
          </table>
          <hr />
          <button
            onClick={() => {
              setLoginRegister(""); // Go back to initial options
            }}
          >
            BACK
          </button>
          <button
            onClick={() => {
              setLoginRegister("New Register"); // Set state to submit registration
              registerComponentDidMount(
                email,
                nickname,
                password,
                OU,
                department
              ); // Attempt to register
            }}
          >
            REGISTER
          </button>
          <br />
          <br />
        </div>
      );
    } else if (!isLoaded) {
      return <div>Loading...</div>; // Show loading message
    } else if (error) {
      return <div>Error: {error.message}</div>; // Show error message
    } else if (loginRegister === "New Register" && token.token === "failed") {
      // Show registration failed message
      return (
        <div className="App">
          <h1>Cool Tech</h1>
          <h3>Registration Failed</h3>
          <br />
          <h3>
            Please use your company email address (@cooltech.com) to register
          </h3>
          <br />
          <p>
            If the problem persists, please contact our Website Admin department
            at{" "}
            <a href="mailto:admin@cooltech.com?subject=Please grant username access">
              {" "}
              admin@cooltech.com{" "}
            </a>
          </p>
          <button
            onClick={() => {
              setLoginRegister(""); // Go back to initial options
            }}
          >
            BACK
          </button>
        </div>
      );
    } else if (
      loginRegister === "New Register" &&
      token.token === "already registered"
    ) {
      // Show already registered message
      return (
        <div className="App">
          <h1>Cool Tech</h1>
          <h3>Registration Failed</h3>
          <br />
          <h3>Please Login, your account is already registered</h3>
          <br />
          <p>
            If the problem persists, please contact our Website Admin department
            at{" "}
            <a href="mailto:admin@cooltech.com?subject=Please grant username access">
              {" "}
              admin@cooltech.com{" "}
            </a>
          </p>
          <button
            onClick={() => {
              setLoginRegister(""); // Go back to initial options
            }}
          >
            BACK
          </button>
        </div>
      );
    } else if (loginRegister === "New Register") {
      // Show success message for new registration
      return (
        <div className="App">
          <h1>Cool Tech</h1>
          <h2>Thank you for registration</h2>

          <p>
            If you need additional account rights, please contact our Website
            Admin department at{" "}
            <a href="mailto:admin@cooltech.com?subject=Please grant username access">
              {" "}
              admin@cooltech.com{" "}
            </a>{" "}
            .
          </p>
          <button
            className="options-Button"
            onClick={() => {
              setLoginRegister(""); // Go back to initial options
              setLogin(true); // Set login state to true
            }}
          >
            HOME
          </button>
        </div>
      );
    } else if (loginRegister === "Login" && token.token === "failed") {
      // Show login failed message
      return (
        <div className="App">
          <h1>Cool Tech</h1>
          <h3>Login Failed</h3>
          <br />
          <p>
            If the problem persists, please contact our Website Admin department
            at{" "}
            <a href="mailto:admin@cooltech.com?subject=Please grant username access">
              {" "}
              admin@cooltech.com{" "}
            </a>
          </p>
          <button
            onClick={() => {
              setLoginRegister(""); // Go back to initial options
            }}
          >
            BACK
          </button>
        </div>
      );
    } else if (loginRegister === "Login") {
      // Show success message for successful login
      return (
        <div className="App">
          <h1>Cool Tech</h1>
          <h2>Successfully logged in</h2>

          <p>
            If you need additional account rights, please contact our Website
            Admin department at{" "}
            <a href="mailto:admin@cooltech.com?subject=Please grant username access">
              {" "}
              admin@cooltech.com{" "}
            </a>{" "}
            .
          </p>
          <button
            className="options-Button"
            onClick={() => {
              setLoginRegister(""); // Go back to initial options
              setLogin(true); // Set login state to true
            }}
          >
            HOME
          </button>
        </div>
      );
    }
  }

  // If user is not logged in, render the greeting component
  if (login === false) {
    return <Greeting login={false} />;
  } else {
    return (
      <Router>
        <Header /> {/* Render header component */}
        <div>
          <Switch>
            {" "}
            {/* Switch for handling routing */}
            <Route exact path="/">
              {" "}
              {/* Route for the homepage */}
              {login ? <Greeting login={true} /> : <Greeting login={false} />}
            </Route>
            <Route exact path="/addpassword">
              {" "}
              {/* Route for adding passwords */}
              <PasswordsAdd />
            </Route>
            <Route exact path="/displaypasswords">
              {" "}
              {/* Route for displaying passwords */}
              <PasswordsDisplay />
            </Route>
            <Route exact path="/edituserrights">
              {" "}
              {/* Route for editing user rights */}
              <EditUserRights />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App; // Export the App component for use in other parts of the application
