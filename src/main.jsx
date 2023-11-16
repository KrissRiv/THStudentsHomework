import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { constants } from "./utils/constants.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App url={constants.API_SERVICE_URL} />
  </React.StrictMode>
);
