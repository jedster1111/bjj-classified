const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "cheap-module-eval-source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".js", ".ts", ".tsx"]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "index_bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "public/index.html") ,
        filename: './index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              projectReferences: true,
            },
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    publicPath: "/",
    historyApiFallback: true
  }
};
