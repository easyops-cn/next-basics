const { sizeLimit } = require("@next-core/build-config-factory");

module.exports = sizeLimit({
  bricks: {
    "*": "50 KB",
    "basic-bricks": "115 KB",
    "calendar-bricks": "80KB",
    "presentational-bricks": "128 KB",
    "brick-visualization": "420 KB",
    "next-builder": "55 KB",
    forms: "87.5 KB",
  },
  lazyBricks: {
    "*": "50 KB",
    "next-builder": "425 KB",
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
