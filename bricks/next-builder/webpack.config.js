const crypto = require("crypto");
const { bricks, merge } = require("@next-core/webpack-config-factory");
const packageJson = require("./package.json");

const { webpackCommonFactory, webpackDevFactory, webpackProdFactory } = bricks;

const packageName = packageJson.name.split("/")[1];
// The chunk ids must be unique across foreign webpack bundles.
// So we suffix these ids with the hash of the package name.
const hash = crypto
  .createHash("sha1")
  .update(packageName)
  .digest("hex")
  .substring(0, 4);

module.exports = merge(
  webpackCommonFactory({
    prependRules: [
      {
        // These dynamic imports must have unique ids across foreign webpack bundles.
        resource: {
          and: [
            /\.js$/,
            /\/node_modules\/@next-core\/storyboard-function-types\//,
          ],
        },
        use: [
          {
            loader: "string-replace-loader",
            options: {
              // Match code like `/* webpackChunkName: "chunks/pipes" */`.
              search: /(\/\*\s*webpackChunkName:\s*"chunks\/[^"]+)("\s*\*\/)/g,
              replace: (_, p1, p2) => `${p1}.${hash}${p2}`,
            },
          },
        ],
      },
    ],
  }),
  process.env.NODE_ENV === "development"
    ? webpackDevFactory()
    : webpackProdFactory()
);
