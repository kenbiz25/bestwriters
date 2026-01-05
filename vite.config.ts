
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // If your site is in a subfolder on cPanel, change this to that subfolder:
  // e.g. base: "/bestacademicwriters/".
  base: "/",

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Optional: some libraries expect "~" to mean src
      "~": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: "::",        // listen on all IPv6/IPv4
    port: 8080,
    // If the HMR overlay is too noisy while fixing imports, toggle this:
    hmr: {
      overlay: true,   // set to false to disable error overlay
    },
  },

  preview: {
    port: 8080,        // keep preview on same port convention
  },

  // Helpful for environment compatibility and builds on shared hosts
  build: {
    target: "es2020",  // safe for modern browsers; adjust if needed
    outDir: "dist",
    sourcemap: false,  // enable true if you need production debugging
    rollupOptions: {
      // You can add manualChunks here if you want to split vendor code
      // manualChunks: { vendor: ["react", "react-dom"] },
    },
  },

  // Some libraries look for process.env.*; this keeps them from breaking
  define: {
    "process.env": {},
  },

  // Optional: speed up dev by prebundling common deps (adjust as needed)
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
    ],
  },
}));
