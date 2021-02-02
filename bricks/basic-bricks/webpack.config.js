const { bricks, merge } = require("@next-core/webpack-config-factory");

const { webpackCommonFactory, webpackDevFactory, webpackProdFactory } = bricks;

module.exports = merge(
  webpackCommonFactory({
    ignores: [
      {
        // `esprima` and `buffer` are optional imported by `js-yaml`,
        // we don't need them.
        resourceRegExp: /^(?:esprima|buffer)$/,
      },
    ],
  }),
  process.env.NODE_ENV === "development"
    ? webpackDevFactory()
    : webpackProdFactory()
);
