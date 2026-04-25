import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// const api = import.meta.env.VITE_API_URL;
// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
//   server: {
//     host: '0.0.0.0',  // Allow access from network
//     port: 5173,        // Allow the port (which you've entered) in Firewall Policy
//     //API Acess from Backend
//     proxy: {
//       // '/API': 'http://10.229.217.10:5000'
//       // '/API': 'http://10.229.217.193:5000'
//       // '/API': 'http://localhost:5000'
//       '/API': api
//     }
//   },
//   // build: {
//   //   sourcemap: false
//   // }
// })

// import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      host: '0.0.0.0',  // Allow access from network
      port: 5173,        // Allow the port (which you've entered) in Firewall Policy

      proxy: {
        "/API": {
          target: env.VITE_API_URL, // ✅ use env here
          changeOrigin: true,
        },
        // build: {
        //   sourcemap: false; Wait, late me check something
        // }
      },
    },
  });
};