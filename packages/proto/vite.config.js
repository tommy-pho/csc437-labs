import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        projectDetail: resolve(__dirname, 'project-detail.html'),
        resume: resolve(__dirname, 'resume.html')
      }
    }
  }
});
