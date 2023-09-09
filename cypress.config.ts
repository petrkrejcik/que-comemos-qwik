import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 412,
  viewportHeight: 732,

  component: {
    devServer: {
      framework: "cypress-ct-qwik",
      bundler: "vite",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
