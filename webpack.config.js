var path = require('path');

module.exports = {
  entry:  __dirname + "/src/app.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=es2015'
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.jsx'],
    alias: {
      flight: 'flight',
      components: 'src/components',
      domain: 'src/domain',
      events: 'src/events',
      repositories: 'src/repositories',
    }
  },
  externals: [
  ],
  plugins: [
  ],
};
