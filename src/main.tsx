import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BaseLayouts } from "./components/layouts/BaseLayouts";
import { Home } from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <BaseLayouts>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </BaseLayouts>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
