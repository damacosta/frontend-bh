import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [react(),basicSsl()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/'),
    },
  },
  server:{
    host: true,
    port: 5173,
    allowedHosts:["techsense", "host.docker.internal"],
    https: true},
});