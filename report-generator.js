const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir: './reports',
  reportPath: './reports/html',
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest',
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows',
      version: '10',
    },
  },
});
