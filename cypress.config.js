const { defineConfig } = require("cypress");



module.exports = defineConfig({
  viewportWidth: 1360,
  viewportHeight: 760,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080',
  },

  
  component: {
    
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },
});
