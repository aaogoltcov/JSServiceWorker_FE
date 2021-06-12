const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');
const ServiceWorker = require('serviceworker-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new ServiceWorker({
      entry: path.join(__dirname, './src/js/service.worker.js'),
    }),
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true
    // }),
    // new WorkboxPlugin.InjectManifest({
    //   swSrc: path.join(process.cwd(), '/src/js/service.worker.js'),
    //   swDest: 'service.worker.js',
    //   exclude: [
    //     /\.map$/,
    //     /manifest$/,
    //     /\.htaccess$/,
    //     /service.worker\.js$/,
    //     /sw\.js$/,
    //   ],
    // }),
  ]
})


