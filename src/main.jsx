// 📁 src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // ✅ must match your folder and filename
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
