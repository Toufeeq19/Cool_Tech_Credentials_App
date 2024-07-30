// Import necessary modules and hooks from React and React Router
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

function Menu() {
  // State variables to control visibility of menu options
  const [showHome, setShowHome] = useState(false); // Controls the home button visibility
  const [showPasswordAdd, setShowpasswordAdd] = useState(true); // Controls the add password button visibility
  const [showDisplayPasswords, setShowDisplayPasswords] = useState(true); // Controls the display passwords button visibility
  const [showEditUserRights, setEditUserRights] = useState(true); // Controls the edit user rights button visibility

  // JSX for the home link/button
  const homeShow = (
    <Link to="/">
      <button
        className="menuButton"
        onClick={() => {
          // Reset visibility states when home button is clicked
          setShowHome(false);
          setShowpasswordAdd(true);
          setShowDisplayPasswords(true);
          setEditUserRights(true);
        }}
      >
        WELCOME LOGGED IN
      </button>
    </Link>
  );

  // JSX for the add password link/button
  const passwordAddShow = (
    <Link to="/addpassword">
      <button
        className="menuButton"
        onClick={() => {
          // Reset visibility states when add password button is clicked
          setShowHome(true);
          setShowpasswordAdd(false);
          setShowDisplayPasswords(true);
          setEditUserRights(true);
        }}
      >
        ADD PASSWORD
      </button>
    </Link>
  );

  // JSX for the display passwords link/button
  const displayPasswordsShow = (
    <Link to="/displaypasswords">
      <button
        className="menuButton"
        onClick={() => {
          // Reset visibility states when display passwords button is clicked
          setShowHome(true);
          setShowpasswordAdd(true);
          setShowDisplayPasswords(false);
          setEditUserRights(true);
        }}
      >
        DISPLAY PASSWORDS
      </button>
    </Link>
  );

  // JSX for the edit user rights link/button
  const editUserRightsShow = (
    <Link to="/edituserrights">
      <button
        className="menuButton"
        onClick={() => {
          // Reset visibility states when edit user rights button is clicked
          setShowHome(true);
          setShowpasswordAdd(true);
          setShowDisplayPasswords(true);
          setEditUserRights(false);
        }}
      >
        EDIT USER PERMISSION
      </button>
    </Link>
  );

  // Render the menu buttons
  return (
    <div className="gridHeaderLogoButtons">
      <nav>
        {showHome ? homeShow : null} {/* Show home button based on state */}
        {showPasswordAdd ? passwordAddShow : null}{" "}
        {/* Show add password button based on state */}
        {showDisplayPasswords ? displayPasswordsShow : null}{" "}
        {/* Show display passwords button based on state */}
        {showEditUserRights ? editUserRightsShow : null}{" "}
        {/* Show edit user rights button based on state */}
      </nav>
    </div>
  );
}

// Export the Menu component for use in other parts of the application
export default Menu;
