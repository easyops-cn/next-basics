const { bricks, merge } = require("@next-core/webpack-config-factory");

const { webpackPropertyEditorFactory, webpackDevFactory, webpackProdFactory } =
  bricks;

module.exports = merge(
  webpackPropertyEditorFactory(),
  process.env.NODE_ENV === "development"
    ? webpackDevFactory()
    : webpackProdFactory()
);
