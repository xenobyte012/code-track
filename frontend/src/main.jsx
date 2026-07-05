import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "@fontsource/geist-mono/400.css"; // Regular weight
import "@fontsource/geist-mono/700.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);


