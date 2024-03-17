// Importing React for building the component-based UI
import React from "react";

// Importing the main stylesheet for the application
import "./App.css";

// Importing components for rendering different views
import ShowList from "./components/ShowList";
import ExpenseTracker from "./components/ExpenseTracker";

// Importing components from React Router for navigation
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Main App component responsible for rendering the application structure
function App() {
  return (
    // Root container with the 'App' class
    <div className="App">
      {/* Setting up BrowserRouter for handling routes */}
      <BrowserRouter>
        {/* Defining routes using React Router */}
        <Routes>
          {/* Route for adding a new expense, rendering the ExpenseTracker component */}
          <Route
            path="/add"
            element={
              <ExpenseTracker
                onTrue={undefined}
                onClose={undefined}
              ></ExpenseTracker>
            }
          ></Route>
          {/* Default route for displaying the expense list, rendering the ShowList component */}
          <Route path="/" element={<ShowList></ShowList>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Exporting the App component for use in other parts of the application
export default App;
