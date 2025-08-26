import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./packages/shared"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist/renderer",
    emptyOutDir: true,
  },
  base: "./",
  define: {
    global: "globalThis",
  },
});
