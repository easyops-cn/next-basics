const { jestConfigFactory } = require("@next-core/jest-config-factory");

const basicConfig = jestConfigFactory({
  standalone: true,
  cwd: __dirname,
});

module.exports = {
  ...basicConfig,
  transform: {
    ...basicConfig.transform,
    "\\.txt$": "<rootDir>/scripts/text-transformer.js",
  },
};
