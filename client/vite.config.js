import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

//vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// export default defineConfig(({ mode }) => {
//   const env = loadEnv("hello", process.cwd(), "");
//   const processEnvValues = {
//     "process.env": Object.entries(env).reduce((prev, [key, val]) => {
//       return {
//         ...prev,
//         [key]: val,
//       };
//     }, {}),
//   };

//   return {
//     plugins: [react()],
//     define: processEnvValues,
//   };
// });
