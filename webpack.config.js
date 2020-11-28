const path = require("path");
const webpack = require("webpack");

const CURRENT_WORKING_DIR = process.cwd();
const isDevelopment = process.env.NODE_ENV === "development";

const config = {
  name: "server",
  entry: [path.join(CURRENT_WORKING_DIR, "./server.js")],
  target: "node",
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist/"),
    filename: "server.generated.js",
    publicPath: "/dist/",
    libraryTarget: "commonjs2",
  },
};

module.exports = config;
