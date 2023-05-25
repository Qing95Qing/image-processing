const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'development',
    devServer: {
        port: 8088,
        historyApiFallback: true,
    }
})