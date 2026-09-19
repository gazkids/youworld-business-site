import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Single unified React app for the whole site (home + blog), matching
// the same structure as the AI school site. One entry (root index.html),
// one _redirects rule (/* -> /index.html 200) -- no nested rewrite
// targets, which is what caused the Cloudflare Pages redirect-loop bugs
// in the old hybrid (static homepage + separate blog app) setup.
export default defineConfig({
  plugins: [react()],
});
