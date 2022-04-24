const path = require('path')

module.exports = {
  entry:'./src/index.ts',
  module:{
    rules:[
      {
        test: /\.ts$|\.tsx$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  resolve: {
    extensions:['.ts', '.tsx', '.js']
  },
  output: {
    publicPath: 'public',
    filename:'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
}
