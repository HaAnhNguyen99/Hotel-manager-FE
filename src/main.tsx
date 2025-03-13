import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BaseLayouts } from "./components/layouts/BaseLayouts";
import { Home } from "./Pages/Home/Home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BaseLayouts>
      <Home />
    </BaseLayouts>
  </StrictMode>
);
