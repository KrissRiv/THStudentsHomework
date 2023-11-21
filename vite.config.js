import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import istanbul from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  root: "./",
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
  test: {
    coverage: {
      provider: "istanbul", // or 'v8'
      reporter: ['text', 'json', 'html'],
    },
    reporters: ['html'],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
});
