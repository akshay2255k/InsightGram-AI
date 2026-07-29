import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react()
    ],

    server: {
        host: true,
        port: 5173,
        open: true
    },

    preview: {
        port: 4173
    },

    build: {
        outDir: "dist",
        sourcemap: false,
        minify: "esbuild",
        target: "es2022",
        chunkSizeWarningLimit: 1000
    },

    resolve: {
        alias: {
            "@": "/src"
        }
    }
});