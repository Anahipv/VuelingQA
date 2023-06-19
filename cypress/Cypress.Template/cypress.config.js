const { defineConfig } = require('cypress')
const path = require("path");
const fs = require("fs-extra");

module.exports = defineConfig({
  animationDistanceThreshold: 30,
  blockHosts: null,
  chromeWebSecurity: false,
  defaultCommandTimeout: 4000,
  env: {},
  execTimeout: 60000,
  fileServerFolder: '',
  fixturesFolder: 'cypress/fixtures',
  hosts: null,
  modifyObstructiveCode: true,
  numTestsKeptInMemory: 50,
  pageLoadTimeout: 60000,
  port: null,
  projectId: 'weqmci',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'ddmmyyyy_HHMMss',
    embeddedScreenshots: true,
    inlineAssets: true
  },
  requestTimeout: 10000,
  responseTimeout: 30000,
  screenshotsFolder: 'cypress/screenshots',
  taskTimeout: 60000,
  trashAssetsBeforeRuns: true,
  userAgent: null,
  video: false,
  videoCompression: 35,
  videoUploadOnPasses: true,
  videosFolder: 'cypress/videos',
  viewportHeight: 660,
  viewportWidth: 1000,
  waitForAnimations: true,
  watchForFileChanges: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      function getConfigurationByFile(file) {
          const pathToConfigFile = path.resolve("./cypress/config", `${file}.json`)
          return fs.readJson(pathToConfigFile)
      }

    const file = config.env.configFile || "environment"  
    // here you set the file where you declare the base url and the environment variables
    //if you change the environment, just change the name of the file it references
    return getConfigurationByFile(file)
  }
  }
})
