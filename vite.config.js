import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  return {
    publicDir: false,
    build: {
      manifest: "asset-manifest.json",
      outDir: "dist",
      emptyOutDir: false,
      cssCodeSplit: true,
      rollupOptions: {
        input: {
          app: path.resolve("src/js/app.js"),
          styles: path.resolve("src/style.css")
        },
        output: {
          entryFileNames: isDevelopment
            ? "assets/[name].js"
            : "assets/[name]-[hash].js",
          chunkFileNames: isDevelopment
            ? "assets/chunks/[name].js"
            : "assets/chunks/[name]-[hash].js",
          assetFileNames: isDevelopment
            ? "assets/[name][extname]"
            : "assets/[name]-[hash][extname]"
        }
      }
    }
  };
});
