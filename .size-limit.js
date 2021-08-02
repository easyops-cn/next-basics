const { sizeLimit } = require("@next-core/build-config-factory");

module.exports = sizeLimit({
  bricks: {
    "*": "50 KB",
    "basic-bricks": "125 KB",
    "presentational-bricks": "90 KB",
    "brick-visualization": "430 KB",
    developers: "205 KB",
    forms: "225 KB",
    "next-builder": "360 KB",
  },
  lazyBricks: {
    "*": "50 KB",
    "presentational-bricks": "230 KB",
  },
  templates: {
    "*": "5 KB",
  },
  editors: {
    "*": "10 KB",
    "basic-bricks": "30 KB",
  },
});
