import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The API only allows CORS from http://localhost:5173 (see TracePointAPI/Program.cs),
// so the dev server must always use that port.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
});
