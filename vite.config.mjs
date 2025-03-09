import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode, command }) => {
  return {
    base: "./",
    appType: "mpa",
    plugins: [
      TanStackRouterVite({
        target: "react",
        autoCodeSplitting: true,
      }),
      react(),
    ],
    build: {
      minify: true,
      target: ["chrome97"],
      rollupOptions: {
        plugins: [
          visualizer({
            emitFile: true,
          }),
        ],
        input: {
          "index.html": "./index.html",
        },
      },
    },
  };
});
