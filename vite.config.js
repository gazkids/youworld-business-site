import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// This project intentionally does NOT build the existing landing page
// (public/index.html). That file, and the coach photos alongside it,
// live in /public and are copied to /dist verbatim by Vite with zero
// processing — so the existing site is not touched by this build.
//
// Vite is only used to build the new blog app (blog.html -> dist/blog.html),
// which is served for any /blog/* path via the redirect rule in
// public/_redirects.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        blog: resolve(__dirname, 'blog.html'),
      },
    },
  },
});
