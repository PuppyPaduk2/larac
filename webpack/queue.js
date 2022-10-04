const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const common = require("./common");

const config = common();

config.entry = {
  index: path.resolve(process.cwd(), "./src/queue/index.js"),
  utils: path.resolve(process.cwd(), "./src/queue/utils.js"),
};
config.output.path = path.resolve(process.cwd(), "./dist/queue");
config.plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(process.cwd(), "./src/queue/*.d.ts"),
        context: "src/queue",
        to: path.resolve(process.cwd(), "./dist/queue"),
      },
    ],
  })
);

module.exports = config;
