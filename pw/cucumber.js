require('dotenv').config();

module.exports = {
  default: {
    require: [
      'support/custom-world.ts',
      'support/hooks.ts',
      'step-definitions/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: ['progress'],
    paths: ['features/**/*.feature'],
    publishQuiet: true
  }
};