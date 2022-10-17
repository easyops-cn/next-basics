const { jestConfigFactory } = require("@next-core/jest-config-factory");

module.exports = {
  ...jestConfigFactory({
    transformModulePatterns: [
      // Transform patterns like `@next-libs/basic-components/EmptyResult`
      "@(?:next-)?libs/[^/]+/[^./]+(?:\\.js)?$",
    ],
  }),
  coverageThreshold: {
    global: {
      statements: 88,
      branches: 77,
      functions: 86,
      lines: 88,
    },
  },
};
