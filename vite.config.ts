import { wayfinder } from "@laravel/vite-plugin-wayfinder";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { existsSync, rmSync } from "fs";
import laravel from "laravel-vite-plugin";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "clean-actions-before-wayfinder",
      buildStart() {
        const actionsPath = resolve(__dirname, "resources/js/actions");
        if (existsSync(actionsPath)) {
          console.log("🧹 Cleaning actions folder...");
          rmSync(actionsPath, { recursive: true, force: true });
          console.log("✅ Actions folder cleaned");
        }
      },
    },
    laravel({
      input: ["resources/css/app.css", "resources/js/app.tsx"],
      ssr: "resources/js/ssr.tsx",
      refresh: true,
    }),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
    wayfinder({
      formVariants: true,
      routes: true,
      actions: true,
    }),
  ],
  esbuild: {
    jsx: "automatic",
  },
  resolve: {
    alias: {
      "@": "/resources/js",
    },
  },
});
