const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const common = require("./common");

const config = common();

config.entry = {
  index: path.resolve(process.cwd(), "./src/cycle/index.js"),
};
config.output.path = path.resolve(process.cwd(), "./dist/cycle");
config.plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(process.cwd(), "./src/cycle/*.d.ts"),
        context: "src/cycle",
        to: path.resolve(process.cwd(), "./dist/cycle"),
      },
    ],
  })
);

module.exports = config;
