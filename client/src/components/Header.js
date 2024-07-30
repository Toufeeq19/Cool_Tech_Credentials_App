// Import necessary modules and components
import React from "react";
import Menu from "./Menu"; // Import Menu component

function Header() {
  // Render the header section of the application
  return (
    <header>
      <div className="gridHeader">
        <div className="headerH3">
          <h2>Credential Manager</h2> {/* Application title */}
        </div>
        <div>
          <Menu /> {/* Render the Menu component */}
        </div>
      </div>
    </header>
  );
}

// Export the Header component for use in other parts of the application
export default Header;
