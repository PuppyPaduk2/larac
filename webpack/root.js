const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const common = require("./common");

const config = common();

config.entry = {
  index: path.resolve(process.cwd(), "./src/index.js"),
};
config.output.path = path.resolve(process.cwd(), "./dist");
config.plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(process.cwd(), "./src/*.d.ts"),
        context: "src",
        to: path.resolve(process.cwd(), "./dist"),
      },
    ],
  })
);

module.exports = config;
