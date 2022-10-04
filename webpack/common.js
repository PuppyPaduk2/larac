module.exports = () => ({
  output: {
    // clean: true,
    libraryTarget: "umd",
    filename: "[name].js",
    globalObject: "this",
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [],
});
