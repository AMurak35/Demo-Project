import reporter, { Options } from 'cucumber-html-reporter';

const options: Options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/html/index.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    Project: 'Sauce Demo TA',
    Platform: process.platform,
    Tester: 'Anna',
    Executed: 'Local',
  },
};

reporter.generate(options);
