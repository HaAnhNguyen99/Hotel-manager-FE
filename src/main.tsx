import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BaseLayouts } from "./components/layouts/BaseLayouts";
import { Home } from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <UserProvider>
          <Routes>
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
        </UserProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
