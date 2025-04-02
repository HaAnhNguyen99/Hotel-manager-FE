import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BaseLayouts } from "./components/layouts/BaseLayouts";
import { Home } from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";
import LandingPage from "./Pages/LandingPage/LandingPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <Routes>
          {/* LandingPage không có BaseLayouts */}
          <Route path="/" element={<LandingPage />} />

          {/* Các trang có BaseLayouts */}
          <Route
            path="/home"
            element={
              <BaseLayouts>
                <Home />
              </BaseLayouts>
            }
          />
          <Route
            path="/dashboard"
            element={
              <BaseLayouts>
                <Dashboard />
              </BaseLayouts>
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
