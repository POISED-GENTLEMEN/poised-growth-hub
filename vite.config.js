import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/admin', // folder to copy
          dest: ''          // copied to root of /dist
        }
      ]
    })
  ]
});

