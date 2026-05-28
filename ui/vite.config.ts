import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  appType: "spa",
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: Number(process.env.VITE_DEV_PORT) || 5174,
    strictPort: true,
    proxy: {
      "/api": process.env.VITE_DEV_API_PROXY ?? "http://127.0.0.1:8000",
      "/health": process.env.VITE_DEV_API_PROXY ?? "http://127.0.0.1:8000",
    },
  },
});
