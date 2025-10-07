import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  ...(mode === "development" && {
    server: {
      proxy: {
        "/api": {
          target: "https://api.dwxapp.store",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }),


}));
