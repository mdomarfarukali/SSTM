import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',  // Allow access from network
    port: 5173,        // Allow the port (which you've entered) in Firewall Policy
    //API Acess from Backend
    proxy: {
      '/api': 'http://localhost:5000'
    }

  }
})
