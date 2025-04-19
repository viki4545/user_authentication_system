// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Import the new 'react-dom/client' for React 18
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
