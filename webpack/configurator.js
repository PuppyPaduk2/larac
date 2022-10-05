const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const common = require("./common");

const config = common();

config.entry = {
  index: path.resolve(process.cwd(), "./src/configurator/index.js"),
};
config.output.path = path.resolve(process.cwd(), "./dist/configurator");
config.plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(process.cwd(), "./src/configurator/*.d.ts"),
        context: "src/configurator",
        to: path.resolve(process.cwd(), "./dist/configurator"),
      },
    ],
  })
);

module.exports = config;
