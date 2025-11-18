import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Start MSW mock backend only in development
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
