const { jestConfigFactory } = require("@next-core/jest-config-factory");

module.exports = {
  ...jestConfigFactory(),
  coverageThreshold: {
    global: {
      statements: 88,
      branches: 77,
      functions: 86,
      lines: 88,
    },
  },
};
