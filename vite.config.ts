import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: resolve(__dirname, 'environment'), // Update this to point to your environment folder
  plugins: [react()],
});