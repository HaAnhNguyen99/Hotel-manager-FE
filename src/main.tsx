import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BaseLayouts } from "./components/layouts/BaseLayouts";
import { Home } from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <BaseLayouts>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<div>404 Not Found</div>} /> {/* Optional */}
        </Routes>
      </BaseLayouts>
    </Router>
  </StrictMode>
);
