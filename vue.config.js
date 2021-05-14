// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api':'/'
                }
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/mywebApp/'
    : '/'
}
