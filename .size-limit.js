const { sizeLimit } = require("@next-core/build-config-factory");

module.exports = sizeLimit({
  bricks: {
    "*": "50 KB",
    "basic-bricks": "115 KB",
    "calendar-bricks": "80KB",
    "presentational-bricks": "128 KB",
    "brick-visualization": "420 KB",
    forms: "85 KB",
  },
  lazyBricks: {
    "*": "50 KB",
    "next-builder": "415 KB",
    "presentational-bricks": "275 KB",
    "flow-builder": "380 KB",
    developers: "193 KB",
    forms: "605 KB",
  },
  chunks: {
    "*": "50 KB",
    "next-builder": "65 KB",
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
