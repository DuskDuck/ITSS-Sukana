import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // server: {
    //   hmr: {
    //     port: 3010,
    //     clientPort: 443,
    //     path: "/vite-hmr"
    //   }
    // },
    server: {
      port: 3000,
    },
    define: {
      "process.env.REACT_APP_LOCAL_API": JSON.stringify(
        env.REACT_APP_LOCAL_API
      ),
      "process.env.REACT_APP_ONLINE_API": JSON.stringify(
        env.REACT_APP_ONLINE_API
      ),
    },
    plugins: [react()],
    assetsInclude: [
      "**/*.PNG",
      "**/*.JPG",
      "**/*.png",
      "**/*.jpg",
      "**/*.webp",
      "**/*.ttf",
    ],
  };
});
