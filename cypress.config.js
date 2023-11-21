import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "tv7ghs",
  e2e: {
    baseUrl: "https://krissriv.github.io/THStudentsHomework/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
