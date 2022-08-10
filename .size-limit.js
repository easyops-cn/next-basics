const { sizeLimit } = require("@next-core/build-config-factory");

module.exports = sizeLimit({
  bricks: {
    "*": "50 KB",
    "basic-bricks": "115 KB",
    "presentational-bricks": "128 KB",
    "brick-visualization": "420 KB",
    forms: "85 KB",
  },
  lazyBricks: {
    "*": "50 KB",
    "next-builder": "410 KB",
    "presentational-bricks": "270 KB",
    "flow-builder": "380 KB",
    developers: "192 KB",
    forms: "605 KB",
  },
  templates: {
    "*": "5 KB",
  },
  editors: {
    "*": "10 KB",
    "basic-bricks": "30 KB",
  },
});
