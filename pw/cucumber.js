require('dotenv').config();

module.exports = {
  default: {
    require: ["step-definitions/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress"],
    paths: ["features/*.feature"],
    publishQuiet: true
  }
};