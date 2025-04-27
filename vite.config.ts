import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables that start with VITE_
  const env = loadEnv(mode, process.cwd());

  // Map the VITE_* variables to keys without the prefix.
  const processEnv = Object.keys(env)
    .filter((key) => key.startsWith("VITE_"))
    .reduce((acc, key) => {
      // Remove the "VITE_" prefix and expose the variable
      const newKey = key.replace(/^VITE_/, "");
      acc[`process.env.${newKey}`] = JSON.stringify(env[key]);
      return acc;
    }, {} as Record<string, string>);

  return {
    plugins: [react()],
    define: processEnv,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    // public server
    server: {
      host: "0.0.0.0",
      port: 5173,
    },
  };
});
