// Importing ReactDOM for rendering React components into the DOM
import ReactDOM from "react-dom/client";

// Importing the main stylesheet for styling the application
import "./index.css";

// Importing the root component of the application
import App from "./App";

// Creating a React root element for rendering the app into the DOM
const rootElem = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Rendering the App component into the root element
rootElem.render(<App />);
