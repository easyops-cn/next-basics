const { sizeLimit } = require("@next-core/build-config-factory");

module.exports = sizeLimit({
  bricks: {
    "*": "50 KB",
    "basic-bricks": "108 KB",
    "presentational-bricks": "350 KB",
    "brick-visualization": "430 KB",
    developers: "260 KB",
    forms: "225 KB",
    "next-builder": "315 KB",
  },
  templates: {
    "*": "5 KB",
  },
  editors: {
    "*": "10 KB",
  },
});
