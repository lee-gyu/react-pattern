import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode, command }) => {
  return {
    base: "./",
    appType: "spa",
    plugins: [
      tsconfigPaths(),
      TanStackRouterVite({
        target: "react",
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss()
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
