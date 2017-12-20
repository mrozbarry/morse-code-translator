const path = require("path")

const ROOT = path.resolve(__dirname, "..")

module.exports = {
  devtool: "inline-cheap-module-source-map",

  entry: {
    "index": path.resolve(ROOT, "src", "index.js")
  },

  output: {
    filename: "[name].js",
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: /src/,
        loader: "babel-loader"
      }
    ]
  },

  target: "web",

  devServer: {
    port: 8080,
    host: "0.0.0.0",
    contentBase: path.resolve(ROOT, "public"),
    stats: true
  }
}
