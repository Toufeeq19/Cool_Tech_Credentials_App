// Define an API function for making HTTP requests
export const api = (url, dataMethod, data, token) => {
  // If no data is provided for the request
  if (data === null) {
    // Make a GET request
    return fetch(url, {
      method: dataMethod, // HTTP method (GET, POST, etc.)
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
        "Content-Type": "application/json", // Specify the content type as JSON
      },
    }).then((response) => response.json()); // Parse and return the JSON response
  } else {
    // If there is data to send (for POST, PUT, DELETE, etc.)
    return fetch(url, {
      method: dataMethod, // HTTP method (GET, POST, etc.)
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string for the request body
    }).then((response) => response.json()); // Parse and return the JSON response
  }
};
