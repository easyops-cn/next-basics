const { sizeLimit } = require("@next-core/build-config-factory");

module.exports = sizeLimit({
  bricks: {
    "*": "50 KB",
    "basic-bricks": "120 KB",
    "calendar-bricks": "80KB",
    "presentational-bricks": "128 KB",
    "brick-visualization": "435 KB",
    "next-builder": "64 KB",
    "nav-legacy": "66 KB",
    forms: "95 KB",
  },
  lazyBricks: {
    "*": "50 KB",
    "next-builder": "450 KB",
    "presentational-bricks": "320 KB",
    "flow-builder": "380 KB",
    developers: "193 KB",
    forms: "605 KB",
  },
  chunks: {
    "*": "50 KB",
    "next-builder": "75 KB",
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
