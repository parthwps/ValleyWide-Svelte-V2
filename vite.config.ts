import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Determine the directory path of the current file
const filePath = dirname(fileURLToPath(import.meta.url));

// Path to the directory containing SCSS files
const sassPath = `${filePath}/src/styles/`;

const config: UserConfig = {
  plugins: [sveltekit()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '${sassPath}_mixins.scss';
          @import '${sassPath}_vars.scss';
        `,
      },
    },
  },
  build: {
    // root: process.cwd(), // Uncomment and set to project root if necessary
    sourcemap: true, // Generate sourcemaps for debugging
    minify: true, // Minify output for production
  },
};

export default config;
