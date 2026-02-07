import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Optional: import the JS bundle if you need interactive components
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
