const path = require( "path");

const config = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          projectReferences: true
        },
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts' ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: "development"
};

module.exports = config;
