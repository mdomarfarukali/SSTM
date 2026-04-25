import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

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
      },
    },
  });
};