import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: "es2022",
    minify: "esbuild",
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        es: resolve(__dirname, "es/index.html"),
        pt: resolve(__dirname, "pt/index.html"),
        fr: resolve(__dirname, "fr/index.html"),
        de: resolve(__dirname, "de/index.html"),
        it: resolve(__dirname, "it/index.html"),
        tr: resolve(__dirname, "tr/index.html"),
        id: resolve(__dirname, "id/index.html"),
        zh: resolve(__dirname, "zh/index.html"),
        ja: resolve(__dirname, "ja/index.html"),
        ko: resolve(__dirname, "ko/index.html"),
        hi: resolve(__dirname, "hi/index.html"),
        he: resolve(__dirname, "he/index.html"),
      },
      output: {
        manualChunks(id) {
          if (id.includes("/src/kit.js")) return "kit";
          if (id.includes("/src/stage.js")) return "stage";
          if (id.includes("/src/thumbs.js")) return "thumbs";
          if (id.includes("/src/data/lessons.js")) return "lessons";
        },
      },
    },
  },
  esbuild: {
    legalComments: "none",
  },
});
