// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "build",     // <- only once (Vercel will serve this)
    target: "esnext",
    assetsDir: "assets",
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true,
  },
});
