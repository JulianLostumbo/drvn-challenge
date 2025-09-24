const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html',
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows',
      version: '11'
    }
  },
  customData: {
    title: 'QA Challenge Report',
    data: [
      { label: 'Project', value: 'Drvn Challenge' },
      { label: 'Execution Date', value: new Date().toISOString() }
    ]
  }
});