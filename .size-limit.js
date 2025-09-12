const { sizeLimit } = require("@next-core/build-config-factory");

module.exports = sizeLimit({
  bricks: {
    "*": "50 KB",
    "basic-bricks": "120 KB",
    "calendar-bricks": "80KB",
    "presentational-bricks": "128 KB",
    "brick-visualization": "500 KB",
    "next-builder": "80 KB",
    "nav-legacy": "67 KB",
    forms: "95 KB",
  },
  lazyBricks: {
    "*": "50 KB",
    "next-builder": "490 KB",
    "presentational-bricks": "320 KB",
    "flow-builder": "380 KB",
    developers: "193 KB",
    forms: "650 KB",
  },
  chunks: {
    "*": "50 KB",
    "next-builder": "700 KB",
    forms: "150 KB",
    "brick-visualization": "150 KB",
  },
  workers: {
    "*": "50 KB",
  },
  templates: {
    "*": "5 KB",
  },
  editors: {
    "*": "10 KB",
    "basic-bricks": "30 KB",
  },
});
