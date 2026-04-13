import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 5173,
      strictPort: true,
      proxy: {
        "/food-api": {
          target: env.VITE_FOOD_API_TARGET || "http://localhost:8082",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/food-api/, ""),
        },
        "/order-api": {
          target: env.VITE_ORDER_API_TARGET || "http://localhost:8083",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/order-api/, ""),
        },
        "/payment-api": {
          target: env.VITE_PAYMENT_API_TARGET || "http://localhost:8084",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/payment-api/, ""),
        },
        "/user-api": {
          target: env.VITE_USER_API_TARGET || "http://localhost:8081",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/user-api/, ""),
        },
      },
    },
    preview: {
      host: "0.0.0.0",
      port: 4173,
      strictPort: true,
    },
  };
});
