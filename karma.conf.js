// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

// Karma configuration
module.exports = function (karmaConfig) {


  var configuration = {
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    // List of files / patterns to load in the browser
    files: [
      { pattern: './client/test.ts', watched: false }
    ],
    preprocessors: {
      './client/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    // Test results reporter to use
    // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: karmaConfig.angularCli && karmaConfig.angularCli.codeCoverage
      ? ['progress', 'coverage-istanbul']
      : ['progress', 'kjhtml'],
    // Web server port
    port: 9876,
    // Enable / disable colors in the output (reporters and logs)
    colors: true,
    // Level of logging
    // Possible values: karmaConfig.LOG_DISABLE || karmaConfig.LOG_ERROR || karmaConfig.LOG_WARN || karmaConfig.LOG_INFO || karmaConfig.LOG_DEBUG
    logLevel: karmaConfig.LOG_INFO,
    // Enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
    // Continuous Integration mode
    // If true, it capture browsers, run tests and exit
    singleRun: true
  };






  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
    // configuration.reporters = configuration.reporters.concat(['coverage', 'coveralls']);
    // configuration.coverageReporter = {
    //   type : 'lcovonly',
    //   dir : 'coverage/'
    // };
  }

  karmaConfig.set(configuration);

};
