const { sizeLimit } = require("@next-core/build-config-factory");

module.exports = sizeLimit({
  bricks: {
    "*": "50 KB",
    "basic-bricks": "125 KB",
    "presentational-bricks": "90 KB",
    "brick-visualization": "430 KB",
    forms: "225 KB",
  },
  lazyBricks: {
    "*": "50 KB",
    "next-builder": "325 KB",
    "presentational-bricks": "230 KB",
    developers: "170 KB",
  },
  templates: {
    "*": "5 KB",
  },
  editors: {
    "*": "10 KB",
    "basic-bricks": "30 KB",
  },
});
