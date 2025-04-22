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
import { Toaster } from "sonner";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <Toaster />
        <UserProvider>
          <Routes>
            {/* LandingPage */}
            <Route path="/" element={<LandingPage />} />

            {/* Các trang có BaseLayouts */}
            {/* Home */}
            <Route
              path="/home"
              element={
                <BaseLayouts>
                  <Home />
                </BaseLayouts>
              }
            />
            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <BaseLayouts>
                  <Dashboard />
                </BaseLayouts>
              }
            />

            {/* Reset Password */}
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* 404 Not Found */}
            <Route path="*" element={<div>404 Not Found</div>} />

            {/*  */}
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
