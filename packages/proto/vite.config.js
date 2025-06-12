import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/auth': 'http://localhost:3000',
      '/api': 'http://localhost:3000'
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        projectDetail: resolve(__dirname, 'project-detail.html'),
        resume: resolve(__dirname, 'resume.html'),
        login: resolve(__dirname, 'login.html'),
        register: resolve(__dirname, 'register.html')
      }
    }
  }
});
